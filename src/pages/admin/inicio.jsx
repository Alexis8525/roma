import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';

const Inicio = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom right, #ffe4ec, #fff)',
        color: 'black',
      }}
    >

      {/* HERO SECTION */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 3, md: 10 },
          py: { xs: 5, md: 10 },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Texto principal */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 500 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Bienvenido a <span style={{ color: '#e91e63' }}>Fressísimo</span> 🍓
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            La mejor experiencia para gestionar tus pedidos, ventas y proveedores de manera fácil y rápida.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#e91e63',
              color: 'white',
              px: 4,
              py: 1.2,
              borderRadius: 3,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#c2185b' },
            }}
          >
            Entrar al sistema
          </Button>

          <Button
            variant="outlined"
            sx={{
              ml: 2,
              color: '#e91e63',
              borderColor: '#e91e63',
              px: 3,
              py: 1.2,
              borderRadius: 3,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#f8bbd0' },
            }}
          >
            Ver pedidos
          </Button>
        </Box>

        {/* Imagen o ilustración */}
        <Box
          component="img"
          src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
          alt="Ilustración de pedidos"
          sx={{
            width: { xs: '80%', md: '40%' },
            mt: { xs: 4, md: 0 },
          }}
        />
      </Box>

      {/* SECCIÓN DE INFORMACIÓN */}
      <Box sx={{ py: 8, px: { xs: 3, md: 10 }, backgroundColor: '#fff' }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          ¿Por qué elegirnos?
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 5 }}
        >
          Fressísimo combina tecnología, eficiencia y diseño para ayudarte a manejar tu negocio fácilmente.
        </Typography>

        <Grid container spacing={3}>
          {[
            {
              title: 'Gestión de pedidos',
              text: 'Consulta el estado de tus pedidos y su historial en tiempo real.',
            },
            {
              title: 'Control de inventario',
              text: 'Administra tus productos y existencias de manera sencilla y visual.',
            },
            {
              title: 'Reportes automáticos',
              text: 'Obtén estadísticas y reportes de ventas con un solo clic.',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                  >
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
          textAlign: 'center',
          backgroundColor: '#f8bbd0',
          color: '#444',
          mt: 'auto',
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
