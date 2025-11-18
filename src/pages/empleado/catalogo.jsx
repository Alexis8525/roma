import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
} from "@mui/material";

// --- Componente Individual de Producto ---
const ProductoCard = ({ isPromo = false }) => {
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
      }}
    >
      {isPromo && (
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
          }}
        />

        <Typography variant="body1" fontWeight="medium">
          Producto
        </Typography>
        <Typography variant="body2" color="text.primary" fontWeight="bold">
          Precio
        </Typography>
        <Typography variant="caption" color="text.secondary" mb={1}>
          Descripción
        </Typography>
      </CardContent>

      <Box display="flex" justifyContent="flex-end" px={1} pb={1}>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            borderColor: "#fbe4e7",
            color: "black",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#f9d4da",
              borderColor: "#fbe4e7",
            },
          }}
        >
          Agregar
        </Button>
      </Box>
    </Card>
  );
};

// --- Componente Principal del Catálogo ---
const Catalogo = () => {
  const categorias = ["Cate 1", "Cate 2", "Cate 3", "Cate 4"];
  const productos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    isPromo: i === 1 || i === 6,
  }));

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
      {/* Botones de Categorías */}
      <Box mb={4} display="flex" flexWrap="wrap" gap={2}>
        {categorias.map((cat, index) => (
          <Button
            key={cat}
            variant="text"
            sx={{
              backgroundColor: index === 0 ? "#fbe4e7" : "transparent",
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

      {/* --- Flexbox de Productos: 5 por fila, última fila ajustada --- */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "flex-start", // importante para última fila
        }}
      >
        {productos.map((prod) => (
          <Box
            key={prod.id}
            sx={{
              flex: "0 1 calc(20% - 16px)", // ancho para 5 por fila
              minWidth: 180, // ancho mínimo para móviles
            }}
          >
            <ProductoCard isPromo={prod.isPromo} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Catalogo;
