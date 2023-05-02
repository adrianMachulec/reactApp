import { useEffect, useState } from "react";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import { validateEmail } from "../../../helpers/validations";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../axios-auth";

export default function ProfileDetails(props) {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false)

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email !== auth.email || password) {
      const data = {
        idToken: auth.token,
        returnSecureToken: true,
      };
      if(email) data.email = email
      if(password) data.password = password
      try {
        const res = await axios.post("accounts:update", data);

        setAuth({
          email: res.data.email,
          token: res.data.idToken,
          userId: res.data.localId,
        });
        setSuccess(true)
        setLoading(false);
      } catch (ex) {
      }
    }
  };

  const buttonDisabled = Object.values(errors).filter((x) => x).length;

  useEffect(() => {
    if (validateEmail(email)) {
      setError({ ...errors, email: "" });
    } else {
      setError({ ...errors, email: "Niepoprawny email" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    if (password.length >= 4 || password.length === 0) {
      setError({ ...errors, password: "" });
    } else {
      setError({ ...errors, password: "Wymagane min 4 znaki" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <form onSubmit={submit}>
      {success ? <div className="alert alert-success mt-2">Dane zostały zmienione</div> : null}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : "is-valid"}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="invalid-feedback">{errors.email}</div>
        <div className="valid-feedback">Wszystko gra</div>
      </div>
      <div className="form-group">
        <label>Hasło</label>
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="invalid-feedback">{errors.password}</div>
      </div>
      <LoadingButton loading={loading} disabled={buttonDisabled}>
        Zapisz
      </LoadingButton>
    </form>
  );
}
