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

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          password: form.password,
          rol: "cliente",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar el usuario");
      }

      console.log("✅ Registro exitoso:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      alert(`Bienvenido a RoMa Café ${data.usuario.nombre} ☕`);
      window.location.href = "/";
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
        background: "linear-gradient(135deg, #f3e5d8 0%, #8B4513 100%)",
        p: 2,
      }}
    >
      <Card sx={{ width: 400, borderRadius: 4, boxShadow: 5 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <LocalCafe sx={{ fontSize: 48, color: '#8B4513', mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Unirse a RoMa Café
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Crea tu cuenta y vive la experiencia ☕
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
                backgroundColor: "#8B4513",
                py: 1.2,
                fontWeight: "bold",
                borderRadius: 3,
                "&:hover": { backgroundColor: "#654321" },
              }}
            >
              {loading ? "Registrando..." : "Unirme a RoMa Café"}
            </Button>

            <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" underline="hover" color="#8B4513">
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
