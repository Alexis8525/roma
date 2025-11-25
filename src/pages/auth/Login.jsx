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
import { LocalCafe } from "@mui/icons-material";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      console.log("✅ Login exitoso:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      alert(`Bienvenido ${data.usuario.nombre} ☕`);

      const rol = data.usuario.rol;
      switch (rol) {
        case "admin":
          window.location.href = "/admin/inicio";
          break;
        case "empleado":
          window.location.href = "/empleado/inicio";
          break;
        case "cliente":
          window.location.href = "/cliente/inicio";
          break;
        default:
          window.location.href = "/";
      }
    } catch (err) {
      console.error("❌ Error de login:", err);
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
        background: "linear-gradient(135deg, #f3e5d8 0%, #8B4513 100%)",
        p: 2,
      }}
    >
      <Card sx={{ width: 400, borderRadius: 4, boxShadow: 5 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <LocalCafe sx={{ fontSize: 48, color: '#8B4513', mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            RoMa Café
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Tu nueva pausa favorita ☕
          </Typography>

          <form onSubmit={handleSubmit}>
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
                backgroundColor: "#8B4513",
                py: 1.2,
                fontWeight: "bold",
                borderRadius: 3,
                "&:hover": { backgroundColor: "#654321" },
              }}
            >
              {loading ? "Entrando..." : "Entrar a RoMa Café"}
            </Button>

            <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
              ¿No tienes una cuenta?{" "}
              <Link href="/register" underline="hover" color="#8B4513">
                Regístrate aquí
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
