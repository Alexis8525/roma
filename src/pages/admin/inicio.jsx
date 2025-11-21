import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { LocalCafe, People, Assessment, Inventory } from '@mui/icons-material';

const Inicio = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #f3e5d8 0%, #fafafa 100%)',
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
            Bienvenido a <span style={{ color: '#8B4513' }}>RoMa Café</span> ☕
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Tu nueva pausa favorita. Gestiona tu cafetería de manera eficiente y disfruta de la experiencia RoMa.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#8B4513',
                color: 'white',
                px: 4,
                py: 1.2,
                borderRadius: 3,
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#654321' },
              }}
            >
              Ver Dashboard
            </Button>

            <Button
              variant="outlined"
              sx={{
                color: '#8B4513',
                borderColor: '#8B4513',
                px: 3,
                py: 1.2,
                borderRadius: 3,
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#f3e5d8' },
              }}
            >
              Gestionar Pedidos
            </Button>
          </Box>
        </Box>

        {/* Imagen representativa */}
        <Box
          component="img"
          src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
          alt="Café ilustración"
          sx={{
            width: { xs: '70%', md: '35%' },
            mt: { xs: 4, md: 0 },
            filter: 'drop-shadow(0 4px 8px rgba(139, 69, 19, 0.3))'
          }}
        />
      </Box>

      {/* SECCIÓN DE INFORMACIÓN */}
      <Box sx={{ py: 8, px: { xs: 3, md: 10 }, backgroundColor: '#fff' }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          ¿Por qué RoMa Café?
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 5 }}>
          La experiencia perfecta para gestionar tu cafetería con estilo y eficiencia.
        </Typography>

        <Grid container spacing={3}>
          {[
            {
              title: 'Gestión de Menú',
              text: 'Controla tu carta de cafés, postres y especialidades fácilmente.',
              icon: <LocalCafe sx={{ fontSize: 40, color: '#8B4513' }} />
            },
            {
              title: 'Control de Ventas',
              text: 'Monitorea tus ingresos y tendencias de ventas en tiempo real.',
              icon: <Assessment sx={{ fontSize: 40, color: '#8B4513' }} />
            },
            {
              title: 'Gestión de Clientes',
              text: 'Conoce a tus clientes y sus preferencias para una experiencia personalizada.',
              icon: <People sx={{ fontSize: 40, color: '#8B4513' }} />
            },
            {
              title: 'Inventario Inteligente',
              text: 'Mantén el control de tus insumos y evita faltantes.',
              icon: <Inventory sx={{ fontSize: 40, color: '#8B4513' }} />
            },
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: 'all 0.3s ease',
                  border: '1px solid #f0f0f0',
                  '&:hover': { 
                    transform: 'translateY(-5px)', 
                    boxShadow: 4,
                    borderColor: '#8B4513'
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  {item.icon}
                  <Typography variant="h6" fontWeight="bold" color="#8B4513" gutterBottom sx={{ mt: 2 }}>
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

      {/* INFORMACIÓN DE CONTACTO */}
      <Box sx={{ py: 6, px: { xs: 3, md: 10 }, backgroundColor: '#8B4513', color: 'white' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Visítanos en RoMa Café
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
              Puebla 62A, Dolores Hidalgo, Guanajuato
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Tu nueva pausa favorita... 💗 Ven a vivir la experiencia RoMa 💕
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                px: 4,
                py: 1.2,
                borderRadius: 3,
                fontWeight: 'bold',
                '&:hover': { 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                },
              }}
            >
              Ver Ubicación
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          py: 3,
          textAlign: 'center',
          backgroundColor: '#654321',
          color: 'white',
        }}
      >
        <Typography variant="body2">
          © 2025 RoMa Café — Dolores Hidalgo, Gto. Todos los derechos reservados.
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.7, mt: 1, display: 'block' }}>
          romacafe_dh • 941 seguidores • Abierto ahora
        </Typography>
      </Box>
    </Box>
  );
};

export default Inicio;
