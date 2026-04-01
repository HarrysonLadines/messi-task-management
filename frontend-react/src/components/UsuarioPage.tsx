import React, { useState } from "react";
import { useRegister } from "../hooks/hooks_users/useRegister";
import { useLogin } from "../hooks/hooks_users/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";

const UsuarioPage: React.FC = () => {
  // Estado para controlar si estamos en modo registro o login
  const [isRegistering, setIsRegistering] = useState(false);
  // Estados para inputs de formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  // Estado para mostrar errores locales 
  const [localError, setLocalError] = useState("");
  // Estado para mostrar mensajes exitosos
  const [MensajeExitoso, setMensajeExitoso] = useState("");

  // Mutaciones para registro y login
  const RegisterMutation = useRegister();
  const LoginMuattion = useLogin();

  const navigate = useNavigate();
  const { login } = useAuth();

  const { settings } = useSettings();
  const theme = settings?.theme || "light";

  // Función que maneja el submit del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan en registro
    if (isRegistering && password !== passwordConfirmed) {
      setLocalError("Las contraseñas no coinciden.");
      return;
    }

    // Limpiar mensajes previos
    setMensajeExitoso("");
    setLocalError("");

    if (isRegistering) {
      // Intentar registrar usuario
      RegisterMutation.mutate(
        { email, password },
        {
          onSuccess: () => {
            setMensajeExitoso("Usuario registrado exitosamente.");
          },
          onError: (error) => {
            setLocalError(error.message);
          },
        }
      );
    } else {
      // Intentar iniciar sesión
      LoginMuattion.mutate(
        { email, password },
        {
          onSuccess: (data) => {
            // Guardar token y userId en contexto de autenticación
            login(data.token, data.userId);
            setMensajeExitoso("Usuario logueado exitosamente.");
            // Redirigir a página principal
            navigate("/");
          },
          onError: (error) => {
            setLocalError(error.message);
          },
        }
      );
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-4">
      <div
        className={`w-full max-w-sm p-8 rounded-lg shadow-md transition-colors ${theme === "dark" ? "bg-gray-800 text-white" : "bg-orange-100 text-black"
          }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 opacity-80">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded border text-lg focus:outline-none focus:ring-2 ${theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                : "border-gray-300 bg-white text-black placeholder-gray-400 focus:ring-blue-400"
                }`}
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 opacity-80">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded border text-lg focus:outline-none focus:ring-2 ${theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                : "border-gray-300 bg-white text-black placeholder-gray-400 focus:ring-blue-400"
                }`}
              required
            />
          </div>

          {/* Confirmar contraseña solo en modo registro */}
          {isRegistering && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 opacity-80">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="********"
                value={passwordConfirmed}
                onChange={(e) => setPasswordConfirmed(e.target.value)}
                className={`w-full p-3 rounded border text-lg focus:outline-none focus:ring-2 ${theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                  : "border-gray-300 bg-white text-black placeholder-gray-400 focus:ring-blue-400"
                  }`}
                required
              />
            </div>
          )}

          {/* Mensaje de error (local o desde mutaciones) */}
          {(localError || (isRegistering ? RegisterMutation.isError : LoginMuattion.isError)) && (
            <div className={`p-3 rounded text-sm text-center font-medium ${theme === "dark" ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-600"
              }`}>
              {localError || ((isRegistering ? RegisterMutation.error : LoginMuattion.error) as Error)?.message}
            </div>
          )}

          {/* Mensaje de éxito */}
          {MensajeExitoso && (
            <div className={`p-3 rounded text-sm text-center font-medium ${theme === "dark" ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-600"
              }`}>
              {MensajeExitoso}
            </div>
          )}

          {/* Botón submit con estado loading */}
          <button
            type="submit"
            disabled={isRegistering ? RegisterMutation.isPending : LoginMuattion.isPending}
            className={`w-full py-3 px-4 font-semibold rounded shadow transition-colors disabled:opacity-50 ${theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-300 hover:bg-blue-400 text-black"
              }`}
          >
            {isRegistering
              ? RegisterMutation.isPending
                ? "Registrando..."
                : "Registrarse"
              : LoginMuattion.isPending
                ? "Iniciando sesión..."
                : "Entrar"}
          </button>
        </form>

        {/* Toggle para cambiar entre login y registro */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setMensajeExitoso("");
              setLocalError("");
            }}
            className={`hover:underline text-sm font-medium transition ${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
              }`}
          >
            {isRegistering
              ? "¿Ya tienes cuenta? Iniciar sesión"
              : "¿No tienes cuenta? Registrarse"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UsuarioPage;
