import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select, // Si usas Select para el ROL
  MenuItem, // Si usas Select para el ROL
} from '@mui/material';

// Estilo para centrar el modal y darle el fondo y borde que se ve en la imagen
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400, md: 500 }, // Ajuste de tamaño responsive
  bgcolor: 'background.paper',
  borderRadius: 2, // Bordes ligeramente redondeados
  boxShadow: 24,
  p: 4,
  // Simulando el fondo claro que rodea el formulario
  backgroundColor: '#FFF',
  border: '4px solid #F7E7EB', // Borde rosado muy claro
};

// Componente para el formulario de creación de empleado
const CreateEmployeeModal = ({ open, handleClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar el formulario y guardar el empleado
    console.log('Empleado guardado');
    handleClose(); // Cerrar el modal después de guardar
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography
          id="modal-title"
          variant="h5"
          component="h2"
          sx={{ mb: 3, fontWeight: 'bold' }}
        >
          Crear Nuevo Empleado
        </Typography>

        {/* --- Campos del Formulario --- */}

        {/* CAMPO NOMBRE */}
        <TextField
          fullWidth
          label="NOMBRE"
          variant="outlined"
          margin="normal"
          required
          sx={{
            '.MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#FFFFFF' },
            '.MuiOutlinedInput-notchedOutline': { borderColor: '#E0E0E0' }, // Borde gris claro
          }}
        />

        {/* CAMPO CORREO */}
        <TextField
          fullWidth
          label="CORREO"
          variant="outlined"
          margin="normal"
          type="email"
          required
          sx={{
            '.MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#FFFFFF' },
          }}
        />

        {/* CAMPO ROL (Usando TextField por simplicidad, puedes usar Select) */}
        <TextField
          fullWidth
          label="ROL"
          variant="outlined"
          margin="normal"
          required
          // Podrías usar <Select> y <MenuItem> aquí si quieres un desplegable
          sx={{
            '.MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#FFFFFF' },
          }}
        />

        {/* CAMPO CONTRASEÑA */}
        <TextField
          fullWidth
          label="CONTRASEÑA"
          variant="outlined"
          margin="normal"
          type="password"
          required
          sx={{
            '.MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#FFFFFF' },
          }}
        />

        {/* CAMPO CONFIRMAR CONTRASEÑA */}
        <TextField
          fullWidth
          label="CONFIRMAR CONTRASEÑA"
          variant="outlined"
          margin="normal"
          type="password"
          required
          sx={{
            '.MuiOutlinedInput-root': { borderRadius: '8px', backgroundColor: '#FFFFFF' },
          }}
        />

        {/* Botón GUARDAR */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 4,
            p: 1.5,
            backgroundColor: '#F7E7EB', // Fondo rosado claro
            color: '#000000', // Texto negro
            '&:hover': { backgroundColor: '#E0D0D4' },
            textTransform: 'uppercase',
            fontWeight: 'bold',
            borderRadius: '4px',
          }}
        >
          GUARDAR
        </Button>
      </Box>
    </Modal>
  );
};

// export default CreateEmployeeModal;