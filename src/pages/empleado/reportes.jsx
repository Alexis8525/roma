import React, { useState } from "react";
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
} from "@mui/material";
import {
  AttachMoney,
  ReceiptLong,
  LocalShipping,
  FilterList,
} from "@mui/icons-material";

// --- Datos Simulados ---
const datosVentas = [
  {
    fechaHora: "2025-10-31 10:00",
    ticket: "0001",
    metodo: "Efectivo",
    total: 12.5,
    productos: 1,
  },
  {
    fechaHora: "2025-10-31 10:30",
    ticket: "0002",
    metodo: "Tarjeta",
    total: 25.0,
    productos: 2,
  },
  {
    fechaHora: "2025-10-30 15:45",
    ticket: "0003",
    metodo: "Transferencia",
    total: 45.99,
    productos: 3,
  },
  {
    fechaHora: "2025-10-30 18:20",
    ticket: "0004",
    metodo: "Efectivo",
    total: 5.0,
    productos: 1,
  },
  {
    fechaHora: "2025-10-29 12:00",
    ticket: "0005",
    metodo: "Tarjeta",
    total: 10.99,
    productos: 1,
  },
];

// --- Cálculo de Métricas ---
const calcularMetricas = (ventas) => {
  const ventasTotales = ventas.reduce((sum, v) => sum + v.total, 0);
  const numTransacciones = ventas.length;
  const ventaPromedio = numTransacciones > 0 ? ventasTotales / numTransacciones : 0;

  return {
    ventasTotales: ventasTotales.toFixed(2),
    numTransacciones,
    ventaPromedio: ventaPromedio.toFixed(2),
  };
};

// --- Componente Principal ---
const DashboardVentas = () => {
  const [periodo, setPeriodo] = useState("dia");
  const [ventasFiltradas] = useState(datosVentas);
  const metricas = calcularMetricas(ventasFiltradas);

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
            Desglose de Transacciones
          </Typography>
          <TableContainer sx={{ maxHeight: 300 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f8d7da" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Fecha/Hora</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Ticket No.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Método Pago</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    TOTAL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ventasFiltradas.map((venta) => (
                  <TableRow key={venta.ticket} hover>
                    <TableCell>
                      {venta.fechaHora.split(" ")[0]} / {venta.fechaHora.split(" ")[1]}
                    </TableCell>
                    <TableCell>{venta.ticket}</TableCell>
                    <TableCell>{venta.metodo}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      ${venta.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardVentas;
