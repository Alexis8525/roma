import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Compatibilidad con Vite y Create React App
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register

`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          password: form.password,
          rol: "cliente", // 👈 tipo de usuario fijo
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar el usuario");
      }

      console.log("✅ Registro exitoso:", data);

      // Guarda token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      alert(`Bienvenido ${data.usuario.nombre} 🥳`);
      window.location.href = "/"; // Redirige al inicio
    } catch (err) {
      console.error("❌ Error al registrar:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
        p: 2,
      }}
    >
      <Card sx={{ width: 400, borderRadius: 4, boxShadow: 5 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Crear Cuenta
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Regístrate y empieza a usar Fressísimo 🍓
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre completo"
              name="nombre"
              fullWidth
              value={form.nombre}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Confirmar contraseña"
              name="confirmPassword"
              type="password"
              fullWidth
              value={form.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            {error && (
              <Typography color="error" textAlign="center" mb={2}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#e91e63",
                py: 1.2,
                fontWeight: "bold",
                borderRadius: 3,
                "&:hover": { backgroundColor: "#c2185b" },
              }}
            >
              {loading ? "Registrando..." : "Registrarme"}
            </Button>

            <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" underline="hover" color="#e91e63">
                Inicia sesión
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
