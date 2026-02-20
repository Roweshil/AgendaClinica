import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <button>Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

/*
 Para recuperar todos los campos de un submit
const handleSubmit = (event) => {
  event.preventDefault()
  const {query} = Object.formEntries(
  new.window.FormData(event.target)
  )
  console.log({query})  
}