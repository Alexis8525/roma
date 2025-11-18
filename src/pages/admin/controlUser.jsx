import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  InputAdornment,
  Grid,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

/* -------------------- MODAL CREAR / EDITAR EMPLEADO -------------------- */
const EmployeeModal = ({ open, handleClose, onSave, initialData = null }) => {
  const isEdit = Boolean(initialData);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
    rol: "",
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setForm({
        nombre: initialData.nombre,
        email: initialData.email,
        password: "",
        confirmar: "",
        rol: initialData.rol,
      });
    } else {
      setForm({ nombre: "", email: "", password: "", confirmar: "", rol: "" });
    }
  }, [initialData, isEdit]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (!isEdit && form.password !== form.confirmar) {
        alert("❌ Las contraseñas no coinciden");
        return;
      }

      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${API_URL}/api/usuarios/${initialData._id}`
        : `${API_URL}/api/usuarios`;

      const body = isEdit
        ? {
            nombre: form.nombre,
            email: form.email,
            rol: form.rol,
          }
        : {
            nombre: form.nombre,
            email: form.email,
            password: form.password,
            rol: form.rol,
          };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok)
        throw new Error(isEdit ? "Error al editar" : "Error al crear");

      onSave();
      handleClose();
      alert(`✅ Usuario ${isEdit ? "actualizado" : "creado"} correctamente`);
    } catch (err) {
      console.error(err);
      alert("❌ Error al guardar los cambios");
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 400 },
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    border: "4px solid #F7E7EB",
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box component="form" sx={modalStyle} onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
        >
          {isEdit ? "Editar Usuario" : "Crear Nuevo Empleado"}
        </Typography>

        <TextField
          fullWidth
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Correo"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          select
          fullWidth
          label="Rol"
          name="rol"
          value={form.rol}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="admin">Administrador</MenuItem>
          <MenuItem value="empleado">Empleado</MenuItem>
          <MenuItem value="cliente">Cliente</MenuItem>
        </TextField>

        {!isEdit && (
          <>
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirmar Contraseña"
              name="confirmar"
              type="password"
              value={form.confirmar}
              onChange={handleChange}
              margin="normal"
              required
            />
          </>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.2,
            backgroundColor: "#D7385E",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#C03350" },
          }}
        >
          {isEdit ? "Guardar Cambios" : "Guardar"}
        </Button>
      </Box>
    </Modal>
  );
};

/* -------------------- COMPONENTE PRINCIPAL -------------------- */
const EmployeeManagement = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [rolFiltro, setRolFiltro] = useState("todos");

  // Modal creación y edición
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // Asegurarse de que siempre sea un array
      setUsuarios(Array.isArray(data) ? data : data.usuarios || []);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      setUsuarios([]); // fallback
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/usuarios/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      alert("✅ Usuario eliminado correctamente");
      fetchUsuarios();
    } catch (err) {
      console.error(err);
      alert("❌ No se pudo eliminar el usuario");
    }
  };

  const toggleActivo = async (usuario) => {
    try {
      const token = localStorage.getItem("token");
      const nuevoEstado = !usuario.activo;

      const res = await fetch(`${API_URL}/api/usuarios/${usuario._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ activo: nuevoEstado }),
      });

      if (!res.ok) throw new Error("Error al cambiar estado del usuario");
      fetchUsuarios();
    } catch (error) {
      console.error("Error cambiando estado:", error);
      alert("❌ No se pudo actualizar el estado del usuario");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideNombre = u.nombre
      ?.toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideRol =
      rolFiltro === "todos" ? true : u.rol?.toLowerCase() === rolFiltro;
    return coincideNombre && coincideRol;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Gestión de Empleados
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filtrar por rol</InputLabel>
            <Select
              value={rolFiltro}
              onChange={(e) => setRolFiltro(e.target.value)}
              label="Filtrar por rol"
              sx={{ borderRadius: "20px", backgroundColor: "#F7E7EB" }}
            >
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="empleado">Empleado</MenuItem>
              <MenuItem value="cliente">Cliente</MenuItem>
            </Select>
          </FormControl>

          <TextField
            placeholder="Buscar por nombre..."
            size="small"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#D7385E" }} />
                </InputAdornment>
              ),
              sx: { borderRadius: "20px", backgroundColor: "#F7E7EB" },
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditData(null);
              setOpenModal(true);
            }}
            sx={{
              backgroundColor: "#D7385E",
              "&:hover": { backgroundColor: "#C03350" },
              fontWeight: "bold",
            }}
          >
            Nuevo Empleado +
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuariosFiltrados.map((u) => (
                <TableRow key={u._id}>
                  <TableCell>{u.nombre}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: "bold", color: "#D7385E" }}>
                      {u.rol?.toUpperCase()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: u.activo ? "green" : "gray",
                        fontWeight: "bold",
                      }}
                    >
                      {u.activo ? "Activo" : "Inactivo"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Grid container spacing={1} justifyContent="center">
                      <Grid item>
                        <IconButton
                          onClick={() => toggleActivo(u)}
                          color={u.activo ? "warning" : "success"}
                        >
                          {u.activo ? <LockIcon /> : <LockOpenIcon />}
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(u._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setEditData(u);
                            setOpenModal(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* MODAL CREAR / EDITAR */}
      <EmployeeModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        onSave={fetchUsuarios}
        initialData={editData}
      />
    </Container>
  );
};

export default EmployeeManagement;
