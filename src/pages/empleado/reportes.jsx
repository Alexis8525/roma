import React, { useState, useEffect } from "react";
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
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert
} from "@mui/material";
import {
  AttachMoney,
  ReceiptLong,
  LocalShipping,
  FilterList,
} from "@mui/icons-material";
import { ventaService } from "../../services/ventaService";

// --- Componente de Tarjeta ---
const MetricaCard = ({ title, value, subTitle, icon: IconComponent, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      backgroundColor: color,
      color: "white",
      borderRadius: 2,
      minHeight: 120,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="body1" fontWeight="medium">
        {title}
      </Typography>
      {IconComponent && <IconComponent sx={{ fontSize: 36, opacity: 0.8 }} />}
    </Box>
    <Box>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.8 }}>
        {subTitle}
      </Typography>
    </Box>
  </Paper>
);

const DashboardVentas = () => {
  const [periodo, setPeriodo] = useState("dia");
  const [ventas, setVentas] = useState([]);
  const [metricas, setMetricas] = useState({
    ventasTotales: "0.00",
    numTransacciones: 0,
    ventaPromedio: "0.00"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      setLoading(true);
      const response = await ventaService.getVentas();
      if (response.data) {
        setVentas(response.data);
        calcularMetricas(response.data);
      }
    } catch (err) {
      console.error('Error al cargar ventas:', err);
      setError('Error al cargar los reportes: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const calcularMetricas = (ventasData) => {
    const ventasTotales = ventasData.reduce((sum, v) => sum + (v.total || 0), 0);
    const numTransacciones = ventasData.length;
    const ventaPromedio = numTransacciones > 0 ? ventasTotales / numTransacciones : 0;

    setMetricas({
      ventasTotales: ventasTotales.toFixed(2),
      numTransacciones,
      ventaPromedio: ventaPromedio.toFixed(2),
    });
  };

  const getPeriodoLabel = () => {
    switch (periodo) {
      case "dia":
        return "Hoy";
      case "semana":
        return "Última Semana";
      case "mes":
        return "Último Mes";
      case "historico":
        return "Histórico";
      default:
        return "Hoy";
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "row",
        gap: 3,
        width: "100%",
      }}
    >
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {/* Izquierda: Métricas */}
      <Box sx={{ flex: 1.2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Reporte de Ventas
        </Typography>

        {/* Filtro de periodo */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" color="text.secondary">
            Análisis de Ventas ({getPeriodoLabel()})
          </Typography>

          <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="periodo-label">
              <FilterList sx={{ fontSize: 18, mr: 0.5, verticalAlign: "middle" }} />
              Periodo
            </InputLabel>
            <Select
              labelId="periodo-label"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              label="Periodo"
            >
              <MenuItem value="dia">Día Actual</MenuItem>
              <MenuItem value="semana">Últimos 7 días</MenuItem>
              <MenuItem value="mes">Últimos 30 días</MenuItem>
              <MenuItem value="historico">Histórico</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Tarjetas de métricas */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MetricaCard
              title="Ventas Totales"
              value={`$${metricas.ventasTotales}`}
              subTitle={`Base: ${getPeriodoLabel()}`}
              icon={AttachMoney}
              color="#f7c0c9"
            />
          </Grid>
          <Grid item xs={12}>
            <MetricaCard
              title="No. Transacciones"
              value={metricas.numTransacciones}
              subTitle="Ventas en el periodo"
              icon={ReceiptLong}
              color="#e8a8b1"
            />
          </Grid>
          <Grid item xs={12}>
            <MetricaCard
              title="Venta Promedio"
              value={`$${metricas.ventaPromedio}`}
              subTitle="Promedio por ticket"
              icon={LocalShipping}
              color="#d88b99"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Derecha: Gráfico y tabla */}
      <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Gráfico */}
        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Ventas Por Periodo
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 250,
              backgroundColor: "#f9f9f9",
              borderRadius: 1,
            }}
          >
            <Typography color="text.secondary">
              [Gráfico de Barras o Líneas]
            </Typography>
          </Box>
        </Paper>

        {/* Tabla */}
        <Paper elevation={1} sx={{ p: 3, flex: 1 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Desglose de Transacciones ({ventas.length})
          </Typography>
          <TableContainer sx={{ maxHeight: 300 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f8d7da" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Fecha/Hora</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>ID Venta</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Método Pago</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    TOTAL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ventas.slice(0, 10).map((venta) => (
                  <TableRow key={venta._id} hover>
                    <TableCell>
                      {new Date(venta.fecha).toLocaleDateString()} / {new Date(venta.fecha).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>{venta._id.slice(-6)}</TableCell>
                    <TableCell>{venta.metodoPago}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      ${venta.total?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {ventas.length === 0 && (
            <Box textAlign="center" py={2}>
              <Typography variant="body2" color="text.secondary">
                No hay ventas registradas
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardVentas;
