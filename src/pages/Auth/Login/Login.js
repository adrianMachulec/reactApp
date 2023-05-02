import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import axios from "../../../axios-auth";

export default function Login(props) {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setVaild] = useState(null);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
      });

      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      nav("/");
    } catch (ex) {
      setError(ex.response.data.error.message);
      setVaild(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) nav("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Logowanie</h2>
      {valid === false ? (
        <div className="alert alert-danger">Niepoprawne dane logowania</div>
      ) : null}
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Hasło</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error ? <div className="alert alert-danger mt-2">{error}</div> : null}
        <LoadingButton loading={loading}>Zaloguj</LoadingButton>
      </form>
    </div>
  );
}
