import { useEffect, useState } from "react";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import {validateEmail} from "../../../helpers/validations";

export default function ProfileDetails(props) {
  const [email, setEmail] = useState("adi@wp.pl");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({
    email: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
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
