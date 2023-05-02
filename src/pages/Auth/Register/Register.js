import { useEffect, useState } from "react";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import { validate } from "../../../helpers/validations";
import Input from "../../../components/Input/Input";
import axiosFresh from "axios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
  const nav = useNavigate();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: {
      value: "",
      error: "",
      showError: false,
      rules: ["required", "email"],
    },
    password: {
      value: "",
      error: "",
      showError: false,
      rules: ["required"],
    },
  });
  const [error, setError] = useState('')

  const valid = !Object.values(form)
    .map((input) => input.error)
    .filter((error) => error).length;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosFresh.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBG5YyNA32-gb9mtXd4Qe5ibHsbqOSyb9o",
        {
          email: form.email.value,
          password: form.password.value,
          returnSecureToken: true,
        }
      );

      setAuth(true, {
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      nav("/");
    } catch (ex) {
      setError(ex.response.data.error.message)
    }

    setLoading(false);
  };

  const changeHandler = (value, fieldName) => {
    const error = validate(form[fieldName].rules, value);

    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error: error,
      },
    });
  };

  useEffect(()=>{
    if(auth) nav('/')
    // eslint-disable-next-line
  }, [])

  return (
    <div className="card">
      <div className="card-header">Rejestracja</div>
      <div className="card-body">
        <p className="text-muted">Uzupełnij dane</p>
        <form onSubmit={submit}>
          <Input
            label="Email"
            value={form.email.value}
            onChange={(val) => changeHandler(val, "email")}
            error={form.email.error}
            showError={form.email.showError}
          />

          <Input
            label="Hasło"
            type="password"
            value={form.password.value}
            onChange={(val) => changeHandler(val, "password")}
            error={form.password.error}
            showError={form.password.showError}
          />

          {error ? (
            <div className="alert alert-danger mt-2">
              {error}
            </div>
          ) : null}

          <div className="text-end">
            <LoadingButton
              className="btn-success"
              loading={loading}
              disabled={!valid}
            >
              Zarejestruj
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}
