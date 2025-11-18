import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Button,
  Checkbox,
  Divider,
  Grid,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Store,
  AddCircle,
  Compare,
  Receipt,
  Edit,
  Delete,
  Add,
} from "@mui/icons-material";

import ModalCompararProveedores from "../../components/ModalCompararProveedores.jsx";
import ModalCrearProveedor from "../../components/ModalCrearProveedor.jsx";
import ModalOrdenCompra from "../../components/ModalOrdenCompra.jsx";

// --- Datos simulados iniciales ---
const mockProveedores = [
  {
    id: 1,
    nombre: "Frutas del Valle",
    contacto: "María López",
    telefono: "555-1234",
    email: "contacto@frutasvalle.com",
    productos: [
      { id_producto: 101, nombre: "Manzana", precio: 25, tiempoEntrega: 2 },
      { id_producto: 102, nombre: "Plátano", precio: 18, tiempoEntrega: 1 },
    ],
  },
  {
    id: 2,
    nombre: "Campo Verde",
    contacto: "Pedro García",
    telefono: "555-5678",
    email: "ventas@campoverde.com",
    productos: [
      { id_producto: 101, nombre: "Manzana", precio: 23, tiempoEntrega: 3 },
      { id_producto: 102, nombre: "Plátano", precio: 19, tiempoEntrega: 2 },
      { id_producto: 103, nombre: "Pera", precio: 28, tiempoEntrega: 4 },
    ],
  },
];

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const [comparacion, setComparacion] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openCrear, setOpenCrear] = useState(false);
  const [openOrden, setOpenOrden] = useState(false);

  useEffect(() => {
    setProveedores(mockProveedores);
  }, []);

  // --- Seleccionar proveedor ---
  const handleSeleccionar = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // --- Comparar dos proveedores ---
  const handleComparar = () => {
    if (seleccionados.length !== 2) {
      alert("Selecciona exactamente dos proveedores para comparar.");
      return;
    }

    const [p1, p2] = seleccionados.map((id) =>
      proveedores.find((p) => p.id === id)
    );

    const comparacionData = compararProveedores(p1, p2);
    setComparacion(comparacionData);
    setOpenModal(true);
  };

  const compararProveedores = (p1, p2) => {
    const resultados = [];
    p1.productos.forEach((prod1) => {
      const prod2 = p2.productos.find(
        (item) => item.id_producto === prod1.id_producto
      );
      if (prod2) {
        const mejor =
          prod1.precio < prod2.precio
            ? p1.nombre
            : prod1.precio > prod2.precio
            ? p2.nombre
            : "Empate";
        resultados.push({
          nombre: prod1.nombre,
          precioA: prod1.precio,
          precioB: prod2.precio,
          tiempoA: prod1.tiempoEntrega,
          tiempoB: prod2.tiempoEntrega,
          mejor,
          proveedorA: p1.nombre,
          proveedorB: p2.nombre,
        });
      }
    });
    return resultados;
  };

  // --- Agregar proveedor ---
  const handleGuardarProveedor = (nuevoProveedor) => {
    setProveedores([...proveedores, nuevoProveedor]);
  };

  // --- Editar proveedor ---
  const handleEditarProveedor = (id) => {
    const nombre = prompt("Nuevo nombre del proveedor:");
    if (!nombre) return;
    setProveedores(
      proveedores.map((p) =>
        p.id === id ? { ...p, nombre } : p
      )
    );
  };

  // --- Eliminar proveedor ---
  const handleEliminarProveedor = (id) => {
    if (window.confirm("¿Deseas eliminar este proveedor?")) {
      setProveedores(proveedores.filter((p) => p.id !== id));
    }
  };

  // --- Agregar producto ---
  const handleAgregarProducto = (id) => {
    const nombre = prompt("Nombre del producto:");
    const precio = parseFloat(prompt("Precio del producto:"));
    const tiempoEntrega = parseInt(prompt("Tiempo de entrega (días):"));

    if (!nombre || isNaN(precio)) return alert("Datos inválidos.");

    setProveedores(
      proveedores.map((p) =>
        p.id === id
          ? {
              ...p,
              productos: [
                ...p.productos,
                {
                  id_producto: Date.now(),
                  nombre,
                  precio,
                  tiempoEntrega,
                },
              ],
            }
          : p
      )
    );
  };

  // --- Eliminar producto ---
  const handleEliminarProducto = (idProveedor, idProducto) => {
    setProveedores(
      proveedores.map((p) =>
        p.id === idProveedor
          ? {
              ...p,
              productos: p.productos.filter(
                (prod) => prod.id_producto !== idProducto
              ),
            }
          : p
      )
    );
  };

  const proveedoresFiltrados = proveedores.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, backgroundColor: "white", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={1} color="#e91e63">
        Administración de Proveedores
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={3}>
        Gestión, comparación y órdenes de compra
      </Typography>

      {/* 🔍 Búsqueda y botones */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          placeholder="Buscar proveedor..."
          variant="outlined"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          size="small"
          sx={{ width: "70%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<Compare />}
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#388e3c" },
              borderRadius: 2,
            }}
            disabled={seleccionados.length !== 2}
            onClick={handleComparar}
          >
            Comparar
          </Button>

          <Button
            variant="contained"
            startIcon={<AddCircle />}
            sx={{
              backgroundColor: "#e91e63",
              "&:hover": { backgroundColor: "#c2185b" },
              borderRadius: 2,
            }}
            onClick={() => setOpenCrear(true)}
          >
            Nuevo
          </Button>

          <Button
            variant="contained"
            startIcon={<Receipt />}
            sx={{
              backgroundColor: "#2196f3",
              "&:hover": { backgroundColor: "#1976d2" },
              borderRadius: 2,
            }}
            onClick={() => setOpenOrden(true)}
          >
            Orden
          </Button>
        </Box>
      </Box>

      {/* 📋 Tabla de proveedores */}
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid #f8bbd0",
          borderRadius: 2,
          backgroundColor: "#fff0f5",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#fce4ec" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Sel.</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Proveedor</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Productos</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proveedoresFiltrados.map((p) => (
              <TableRow
                key={p.id}
                hover
                sx={{
                  "&:hover": { backgroundColor: "#f8bbd0" },
                }}
              >
                <TableCell>
                  <Checkbox
                    checked={seleccionados.includes(p.id)}
                    onChange={() => handleSeleccionar(p.id)}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Store fontSize="small" color="action" />
                    {p.nombre}
                  </Box>
                </TableCell>
                <TableCell>
                  {p.productos.map((prod) => (
                    <Chip
                      key={prod.id_producto}
                      label={`${prod.nombre} ($${prod.precio})`}
                      size="small"
                      variant="outlined"
                      sx={{
                        mr: 0.5,
                        mb: 0.5,
                        backgroundColor: "white",
                        borderColor: "#e91e63",
                      }}
                      onDelete={() =>
                        handleEliminarProducto(p.id, prod.id_producto)
                      }
                    />
                  ))}
                  <Tooltip title="Agregar producto">
                    <IconButton
                      size="small"
                      onClick={() => handleAgregarProducto(p.id)}
                      sx={{
                        color: "#e91e63",
                        "&:hover": { color: "#c2185b" },
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={() => handleEditarProveedor(p.id)}
                      color="secondary"
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      onClick={() => handleEliminarProveedor(p.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📊 Resumen */}
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fce4ec" }}>
            <Typography variant="h6" fontWeight="bold">
              Total de Proveedores
            </Typography>
            <Typography variant="h4" color="#e91e63">
              {proveedores.length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#f3e5f5" }}>
            <Typography variant="h6" fontWeight="bold">
              Con Productos en Común
            </Typography>
            <Typography variant="h4" color="secondary.main">
              {
                proveedores.filter(
                  (p) =>
                    p.productos.filter((prod) =>
                      proveedores.some(
                        (otro) =>
                          otro.id !== p.id &&
                          otro.productos.some(
                            (pp) => pp.id_producto === prod.id_producto
                          )
                      )
                    ).length > 0
                ).length
              }
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#f8bbd0" }}>
            <Typography variant="h6" fontWeight="bold">
              Seleccionados
            </Typography>
            <Typography variant="h4" color="secondary.main">
              {seleccionados.length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Modales */}
      <ModalCompararProveedores
        open={openModal}
        onClose={() => setOpenModal(false)}
        comparacion={comparacion}
      />
      <ModalCrearProveedor
        open={openCrear}
        onClose={() => setOpenCrear(false)}
        onGuardar={handleGuardarProveedor}
      />
      <ModalOrdenCompra
        open={openOrden}
        onClose={() => setOpenOrden(false)}
        proveedores={proveedores}
      />
    </Box>
  );
}
