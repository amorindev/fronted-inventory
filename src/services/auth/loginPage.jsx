import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const apiURL = import.meta.env.VITE_API;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para manejar el error
  const navigate = useNavigate();

  async function login() {
    try {
      const response = await fetch(apiURL + `/authentication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }), // Convertir el objeto actualizado a JSON
      });

      if (!response.ok) {
        const errorData = await response.json(); // O response.json() si el backend devuelve JSON

        throw new Error(errorData.message || `Failed to authenticated`);
      }

      navigate("/dashboard");
      setErrorMessage(""); // Resetea el mensaje de error si la autenticación fue exitosa
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
      <div className="p-3 rounded bg-white w-25 border">
        <form>
          <header>
            <h3>Iniciar Sesión</h3>
          </header>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" type="button" onClick={login}>
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
