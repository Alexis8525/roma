import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Navbars
import ClienteNavbar from "./components/ClienteNavbar";
import AdminNavbar from "./components/AdminNavbar";
import EmpleadoNavbar from "./components/EmpleadoNavbar";

// 🟣 Páginas Admin
import InicioA from "./pages/admin/inicio";
import ControlUser from "./pages/admin/controlUser";
import AdminInventario from "./pages/admin/inventario";
import Perfil from "./pages/admin/perfel";
import Proveedores from "./pages/admin/provedores";
import Recetas from "./pages/admin/recetas";
import VentasReportes from "./pages/admin/ventasReportes";

// 🔵 Páginas Cliente
import Carrito from "./pages/cliente/carrito";
import Catalogo from "./pages/cliente/catalogo";
import Historial from "./pages/cliente/historial";
import Inicio from "./pages/cliente/inicio";


// 🟢 Páginas Empleado
import InicioE from "./pages/empleado/inicio";
import Panel from "./pages/empleado/panel";
import Ventas from "./pages/empleado/ventas";
import CatalogoE from "./pages/empleado/catalogo";
import Reportes from "./pages/empleado/reportes";
import EmpleadoInventario from "./pages/empleado/inventario";
import EmpleadoRecetas from "./pages/empleado/recetas";

// Paginas de Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
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

        {/* 🔸 ADMIN */}
        <Route path="/admin/inventario" element={<AdminNavbar><AdminInventario /></AdminNavbar>} />
        <Route path="/admin/ventas-reportes" element={<AdminNavbar><VentasReportes /></AdminNavbar>} />
        <Route path="/admin/control-usuarios" element={<AdminNavbar><ControlUser /></AdminNavbar>} />
        <Route path="/admin/recetas" element={<AdminNavbar><Recetas /></AdminNavbar>} />
        <Route path="/admin/costos" element={<AdminNavbar><Perfil /></AdminNavbar>} />
        <Route path="/admin/proveedores" element={<AdminNavbar><Proveedores /></AdminNavbar>} />
        <Route path="/admin/perfil" element={<AdminNavbar><Perfil /></AdminNavbar>} />
        <Route path="/admin/inicio" element={<AdminNavbar>< InicioA/></AdminNavbar>} />

        {/* 🟢 EMPLEADO */}
        <Route path="/empleado/panel" element={<EmpleadoNavbar><Panel /></EmpleadoNavbar>} />
        <Route path="/empleado/ventas" element={<EmpleadoNavbar><Ventas /></EmpleadoNavbar>} />
        <Route path="/empleado/reportes" element={<EmpleadoNavbar><Reportes /></EmpleadoNavbar>} />
        <Route path="/empleado/inventario" element={<EmpleadoNavbar><EmpleadoInventario /></EmpleadoNavbar>} />
        <Route path="/empleado/recetas" element={<EmpleadoNavbar><EmpleadoRecetas /></EmpleadoNavbar>} />
        <Route path="/empleado/inicio" element={<EmpleadoNavbar>< InicioE/></EmpleadoNavbar>} />
        <Route path="/empleado/catalogo" element={<EmpleadoNavbar>< CatalogoE/></EmpleadoNavbar>} />
      </Routes>
    </Router>
  );
}

export default App;
