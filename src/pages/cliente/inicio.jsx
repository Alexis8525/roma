import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const Inicio = () => {
  const heroCarrusel = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRicjdKZJBAGI44d0Kd9fpKk_5dLKbyHvgPKQ&s",
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh3QYCa9bEeGDKu15TLTmQCmyLt175JzmcEWIyIoaCT7WBzogEuQ_uFCWM2Ub_nIpPQUs&usqp=CAU",
  ];

  const [index, setIndex] = useState(0);

  // Cambiar automáticamente cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroCarrusel.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroCarrusel.length]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % heroCarrusel.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + heroCarrusel.length) % heroCarrusel.length);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom right, #ffe4ec, #fff)",
        color: "black",
      }}
    >
      {/* HERO SECTION */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 3, md: 10 },
          py: { xs: 5, md: 10 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Texto principal */}
        <Box sx={{ textAlign: { xs: "center", md: "left" }, maxWidth: 500 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Bienvenido a <span style={{ color: "#e91e63" }}>Fressísimo</span> 🍓
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Gestiona tus pedidos, inventario y reportes de manera rápida, sencilla y visual.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e91e63",
              color: "white",
              px: 4,
              py: 1.2,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#c2185b" },
            }}
          >
            Entrar al sistema
          </Button>

          <Button
            variant="outlined"
            sx={{
              ml: 2,
              color: "#e91e63",
              borderColor: "#e91e63",
              px: 3,
              py: 1.2,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#f8bbd0" },
            }}
          >
            Ver recetas
          </Button>
        </Box>

        {/* Carrusel nativo */}
        <Box sx={{ position: "relative", width: { xs: "80%", md: "45%" }, mt: { xs: 4, md: 0 } }}>
          <img
            src={heroCarrusel[index]}
            alt={`Imagen ${index + 1}`}
            style={{
              width: "100%",
              borderRadius: "15px",
              objectFit: "cover",
              maxHeight: "400px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "all 0.8s ease-in-out",
            }}
          />
          {/* Botones de navegación */}
          <IconButton
            onClick={prevSlide}
            sx={{
              position: "absolute",
              top: "50%",
              left: 10,
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "#f8bbd0" },
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            onClick={nextSlide}
            sx={{
              position: "absolute",
              top: "50%",
              right: 10,
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "#f8bbd0" },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>

      {/* SECCIÓN DE INFORMACIÓN */}
      <Box sx={{ py: 8, px: { xs: 3, md: 10 }, backgroundColor: "#fff" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          ¿Por qué elegir Fressísimo?
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 5 }}
        >
          Tecnología, eficiencia y sabor fresco para tu negocio.
        </Typography>

        <Grid container spacing={3}>
          {[
            {
              title: "Gestión de pedidos",
              text: "Consulta y organiza tus pedidos fácilmente en tiempo real.",
            },
            {
              title: "Control de inventario",
              text: "Administra tus productos, insumos y existencias sin complicaciones.",
            },
            {
              title: "Reportes automáticos",
              text: "Genera estadísticas de ventas, inventario y rendimiento al instante.",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          py: 3,
          textAlign: "center",
          backgroundColor: "#f8bbd0",
          color: "#444",
          mt: "auto",
        }}
      >
        <Typography variant="body2">
          © 2025 Fressísimo — Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Inicio;
