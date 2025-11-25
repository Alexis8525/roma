import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import ClienteNavbar from "./components/ClienteNavbar";
import AdminNavbar from "./components/AdminNavbar";
import EmpleadoNavbar from "./components/EmpleadoNavbar";

import InicioA from "./pages/admin/inicio";
import ControlUser from "./pages/admin/controlUser";
import AdminInventario from "./pages/admin/inventario";
import Perfil from "./pages/admin/perfel";
import Proveedores from "./pages/admin/provedores";
import Recetas from "./pages/admin/recetas";
import VentasReportes from "./pages/admin/ventasReportes";

import Carrito from "./pages/cliente/carrito";
import Catalogo from "./pages/cliente/catalogo";
import Historial from "./pages/cliente/historial";
import Inicio from "./pages/cliente/inicio";

import InicioE from "./pages/empleado/inicio";
import Panel from "./pages/empleado/panel";
import Ventas from "./pages/empleado/ventas";
import CatalogoE from "./pages/empleado/catalogo";
import Reportes from "./pages/empleado/reportes";
import EmpleadoInventario from "./pages/empleado/inventario";
import EmpleadoRecetas from "./pages/empleado/recetas";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const theme = createTheme({
  palette: {
    primary: {
      main: '#D7385E',
    },
    secondary: {
      main: '#F7E7EB',
    },
    background: {
      default: '#f8f9fa',
    },
  },
});

// Componente de protección de rutas
const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('usuario'));
  const token = localStorage.getItem('token');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* 🔹 AUTH */}
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          
          {/* 🔹 CLIENTE */}
          <Route path="/" element={<ClienteNavbar><Inicio /></ClienteNavbar>} />
          <Route path="/catalogo" element={<ClienteNavbar><Catalogo /></ClienteNavbar>} />
          <Route path="/historial" element={<ClienteNavbar><Historial /></ClienteNavbar>} />
          <Route path="/carrito" element={<ClienteNavbar><Carrito /></ClienteNavbar>} />

          {/* 🔸 ADMIN - Rutas protegidas */}
          <Route path="/admin/inventario" element={
            <ProtectedRoute requiredRole="admin">
              <AdminNavbar><AdminInventario /></AdminNavbar>
            </ProtectedRoute>
          } />
          <Route path="/admin/ventas-reportes" element={
            <ProtectedRoute requiredRole="admin">
              <AdminNavbar><VentasReportes /></AdminNavbar>
            </ProtectedRoute>
          } />
          <Route path="/admin/control-usuarios" element={
            <ProtectedRoute requiredRole="admin">
              <AdminNavbar><ControlUser /></AdminNavbar>
            </ProtectedRoute>
          } />
          <Route path="/admin/recetas" element={
            <ProtectedRoute requiredRole="admin">
              <AdminNavbar><Recetas /></AdminNavbar>
            </ProtectedRoute>
          } />
          <Route path="/admin/proveedores" element={
            <ProtectedRoute requiredRole="admin">
              <AdminNavbar><Proveedores /></AdminNavbar>
            </ProtectedRoute>
          } />
          <Route path="/admin/perfil" element={
            <ProtectedRoute requiredRole="admin">
              <AdminNavbar><Perfil /></AdminNavbar>
            </ProtectedRoute>
          } />
          <Route path="/admin/inicio" element={
            <ProtectedRoute requiredRole="admin">
              <AdminNavbar><InicioA /></AdminNavbar>
            </ProtectedRoute>
          } />

          {/* 🟢 EMPLEADO - Rutas protegidas */}
          <Route path="/empleado/panel" element={
            <ProtectedRoute requiredRole="empleado">
              <EmpleadoNavbar><Panel /></EmpleadoNavbar>
            </ProtectedRoute>
          } />
          <Route path="/empleado/ventas" element={
            <ProtectedRoute requiredRole="empleado">
              <EmpleadoNavbar><Ventas /></EmpleadoNavbar>
            </ProtectedRoute>
          } />
          <Route path="/empleado/reportes" element={
            <ProtectedRoute requiredRole="empleado">
              <EmpleadoNavbar><Reportes /></EmpleadoNavbar>
            </ProtectedRoute>
          } />
          <Route path="/empleado/inventario" element={
            <ProtectedRoute requiredRole="empleado">
              <EmpleadoNavbar><EmpleadoInventario /></EmpleadoNavbar>
            </ProtectedRoute>
          } />
          <Route path="/empleado/recetas" element={
            <ProtectedRoute requiredRole="empleado">
              <EmpleadoNavbar><EmpleadoRecetas /></EmpleadoNavbar>
            </ProtectedRoute>
          } />
          <Route path="/empleado/inicio" element={
            <ProtectedRoute requiredRole="empleado">
              <EmpleadoNavbar><InicioE /></EmpleadoNavbar>
            </ProtectedRoute>
          } />
          <Route path="/empleado/catalogo" element={
            <ProtectedRoute requiredRole="empleado">
              <EmpleadoNavbar><CatalogoE /></EmpleadoNavbar>
            </ProtectedRoute>
          } />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
