import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { productoService } from "../../services/productoService";

const ProductoCard = ({ producto, onEditar, onEliminar }) => {
  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        border: "1px solid #ddd",
        p: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      {producto.precioVenta < (producto.precioRegular || producto.precioVenta * 1.2) && (
        <Chip
          label="PROM"
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "error.main",
            color: "white",
            fontWeight: "bold",
            zIndex: 1,
            height: 20,
          }}
        />
      )}

      <CardContent sx={{ p: 1, "&:last-child": { pb: 1 }, flexGrow: 1 }}>
        <Box
          sx={{
            height: 140,
            backgroundColor: "#fbe4e7",
            borderRadius: 1,
            mb: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {producto.imagen ? (
            <img 
              src={`http://localhost:4000${producto.imagen}`} 
              alt={producto.nombre}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              Sin imagen
            </Typography>
          )}
        </Box>

        <Typography variant="body1" fontWeight="medium" noWrap>
          {producto.nombre}
        </Typography>
        <Typography variant="body2" color="text.primary" fontWeight="bold">
          ${producto.precioVenta?.toFixed(2) || '0.00'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {producto.descripcion || 'Sin descripción'}
        </Typography>
        <Typography variant="caption" display="block" color={producto.stock > 0 ? 'success.main' : 'error.main'}>
          {producto.stock > 0 ? `${producto.stock} disponibles` : 'Agotado'}
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          Categoría: {producto.categoria || 'Sin categoría'}
        </Typography>
      </CardContent>

      <Box display="flex" justifyContent="space-between" px={1} pb={1}>
        <IconButton 
          size="small" 
          onClick={() => onEditar(producto)}
          sx={{ color: 'primary.main' }}
        >
          <Edit />
        </IconButton>
        <IconButton 
          size="small" 
          onClick={() => onEliminar(producto._id)}
          sx={{ color: 'error.main' }}
        >
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
};

const CatalogoEmpleado = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const response = await productoService.getProductos();
      
      if (response.data) {
        setProductos(response.data);
        
        // Extraer categorías únicas
        const cats = ['Todas', ...new Set(response.data.map(p => p.categoria).filter(Boolean))];
        setCategorias(cats);
      }
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar los productos: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const productosFiltrados = categoriaActiva === 'Todas' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActiva);

  const handleEditarProducto = (producto) => {
    setProductoEditando(producto);
    setOpenDialog(true);
  };

  const handleEliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await productoService.deleteProducto(id);
        cargarProductos(); // Recargar la lista
        alert('Producto eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar producto: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleGuardarProducto = async (productoData) => {
    try {
      if (productoEditando) {
        await productoService.updateProducto(productoEditando._id, productoData);
        alert('Producto actualizado exitosamente');
      } else {
        await productoService.createProducto(productoData);
        alert('Producto creado exitosamente');
      }
      setOpenDialog(false);
      setProductoEditando(null);
      cargarProductos();
    } catch (error) {
      alert('Error al guardar producto: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return (
      <Container maxWidth={false} sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        backgroundColor: "#f1f1f1",
        minHeight: "100vh",
        width: "100%",
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {/* Header con título y botón agregar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Catálogo de Productos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setProductoEditando(null);
            setOpenDialog(true);
          }}
          sx={{
            backgroundColor: "#e91e63",
            "&:hover": { backgroundColor: "#c2185b" },
          }}
        >
          Agregar Producto
        </Button>
      </Box>

      {/* Botones de Categorías */}
      <Box mb={4} display="flex" flexWrap="wrap" gap={2}>
        {categorias.map((cat) => (
          <Button
            key={cat}
            variant="text"
            onClick={() => setCategoriaActiva(cat)}
            sx={{
              backgroundColor: cat === categoriaActiva ? "#fbe4e7" : "transparent",
              color: "black",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 1,
              p: 1,
              "&:hover": {
                backgroundColor: "#f9d4da",
              },
            }}
          >
            {cat}
          </Button>
        ))}
      </Box>

      {/* Grid de Productos */}
      <Grid container spacing={2}>
        {productosFiltrados.map((producto) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={producto._id}>
            <ProductoCard 
              producto={producto} 
              onEditar={handleEditarProducto}
              onEliminar={handleEliminarProducto}
            />
          </Grid>
        ))}
      </Grid>

      {productosFiltrados.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No hay productos en esta categoría
          </Typography>
        </Box>
      )}

      {/* Dialog para agregar/editar producto */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {productoEditando ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            variant="outlined"
            defaultValue={productoEditando?.nombre || ''}
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            variant="outlined"
            defaultValue={productoEditando?.descripcion || ''}
          />
          <TextField
            margin="dense"
            label="Categoría"
            fullWidth
            variant="outlined"
            defaultValue={productoEditando?.categoria || ''}
          />
          <TextField
            margin="dense"
            label="Precio Venta"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={productoEditando?.precioVenta || ''}
          />
          <TextField
            margin="dense"
            label="Stock"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={productoEditando?.stock || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button 
            onClick={() => handleGuardarProducto({
              nombre: 'Nuevo Producto',
              descripcion: 'Descripción del producto',
              categoria: 'General',
              precioVenta: 0,
              stock: 0
            })}
            variant="contained"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CatalogoEmpleado;
