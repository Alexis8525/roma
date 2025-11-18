import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Divider,
  Container // Importamos Container para controlar el ancho máximo
} from "@mui/material";
// Asegúrate de que los imports de otros componentes (como CardMedia para el ícono de tarjeta, si lo usas)
// estén presentes si los necesitas.

// Componente para representar un producto en el carrito
const ProductoItem = ({ name, description, price }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" my={1.5}>
    <Box display="flex" alignItems="center">
      {/* Simulación del cuadro rosado del producto */}
      <Box
        sx={{
          width: 40,
          height: 40,
          backgroundColor: "#fbe4e7",
          borderRadius: 1,
          mr: 2,
          flexShrink: 0, // Evita que se encoja
        }}
      />
      <Box sx={{ minWidth: 0 }}> {/* Agregamos minWidth: 0 para que el texto largo se trunque correctamente si es necesario */}
        <Typography variant="body1" fontWeight="medium" noWrap>
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {description}
        </Typography>
      </Box>
    </Box>
    <Typography variant="body1" fontWeight="bold" sx={{ ml: 1, flexShrink: 0 }}>
      ${price}
    </Typography>
  </Box>
);

const Carrito = () => {
  // Datos simulados del carrito
  const productos = [
    { name: "Producto con Descripción Larga", description: "Breve Desc", price: 10.0 },
    { name: "Producto 2", description: "Breve Desc", price: 15.5 },
    { name: "Producto 3", description: "Breve Desc", price: 5.0 },
    { name: "Producto 4", description: "Breve Desc", price: 20.0 },
    { name: "Producto 5", description: "Breve Desc", price: 8.75 },
  ];
  const subtotal = productos.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  const [deliveryType, setDeliveryType] = React.useState("store");

  return (
    // Utilizamos Container con maxWidth="xl" o false para un ancho muy amplio o completo
    <Container maxWidth={false} sx={{ py: 4, backgroundColor: "#f1f1f1", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ ml: 3 }}>
        Pedido en Línea
      </Typography>
      
      {/* El Grid container tiene un margen horizontal (mx: 3) para la vista móvil/tablet */}
      <Grid container spacing={3} sx={{ mx: { xs: 0, md: 'auto' } }}> 
        
        {/* Columna Izquierda: Carrito */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  Carrito
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  Subtotal
                </Typography>
              </Box>
              <Divider sx={{ mb: 1.5 }} />
              <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {productos.map((prod, index) => (
                  <ProductoItem
                    key={index}
                    name={prod.name}
                    description={prod.description}
                    price={prod.price}
                  />
                ))}
              </Box>
            </CardContent>
            {/* Pie del carrito: Total */}
            <CardContent sx={{ pt: 0 }}>
              <Box display="flex" justifyContent="space-between" mt={1} pt={1} borderTop="1px solid #eee">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" fontWeight="bold">
                  ${subtotal}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Columna Central: Tipo de Entrega y Forma de Pago */}
        <Grid item xs={12} md={4}>
          {/* Panel Tipo de Entrega */}
          <Card elevation={0} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Tipo De Entrega
              </Typography>
              <RadioGroup
                value={deliveryType}
                onChange={(e) => setDeliveryType(e.target.value)}
                name="delivery-type-group"
              >
                <FormControlLabel
                  value="store"
                  control={<Radio />}
                  label="Recoger En Tienda"
                />
                <FormControlLabel
                  value="home"
                  control={<Radio />}
                  label={
                    <Box component="span">
                      Entrega A Domicilio
                      <Typography variant="caption" color="text.secondary" ml={0.5}>
                        (Costo Extra)
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Panel Forma de Pago */}
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Forma De Pago
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="center" py={3}>
                {/* Icono de tarjeta simulado */}
                <Box mb={2}>
                  
                </Box>
                <Button
                  variant="contained"
                  fullWidth // Ocupa todo el ancho disponible del Card
                  sx={{
                    backgroundColor: "#fbe4e7",
                    color: "black",
                    "&:hover": { backgroundColor: "#f9d4da" },
                    maxWidth: 300, // Limita el ancho del botón para que no se vea exagerado
                    p: 1.5
                  }}
                  disableElevation
                >
                  Proceder Al Pago
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Columna Derecha: Confirmación de Pedido */}
        <Grid item xs={12} md={4}>
          {/* Usamos sx={{ height: '100%' }} para que esta tarjeta se estire y se alinee verticalmente con las otras dos columnas si es necesario */}
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Confirmacion De Pedido
              </Typography>
              {/* Contenido de confirmación del pedido */}
              <Box height="calc(100% - 40px)" display="flex" alignItems="center" justifyContent="center">
                <Typography variant="body2" color="text.secondary">
                  Aquí aparecerá el resumen final y los detalles de envío/pago.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Carrito;