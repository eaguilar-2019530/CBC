export const validateCantidadHerramientas = (cantidad) => {
    const regex = /^\d{1,400}$/ // Acepta números entre 3 y 400 caracteres
    return regex.test(cantidad)
}

/* export const validateFechaInicio = (fechaInicio) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/ // Formato YYYY-MM-DD
    return regex.test(fechaInicio)
} */

export const validateFechaFin = (fechaFin) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/ // Formato YYYY-MM-DD
    return regex.test(fechaFin)
}

export const validateFechaInicioFin = (fechaInicio, fechaFin) => {
    return fechaInicio <= fechaFin
}

export const validateEstado = (estado) => {
    const regex = /^(NO DEVUELTO | DEVUELTO)$/; 
    return regex.test(estado);
};

export const cantidadHerramientasValidationMessage = 'La cantidad debe ser un número entero';
/* export const fechaInicioValidationMessage = 'Verifica que sea una fecha correcta en formato YYYY-MM-DD.' */
export const fechaFinValidationMessage = ''
export const estadoValidationMessage = 'Por favor, selecciona un estado válido.'; 
export const hrramientaValidationMessage = 'La herramienta debe ser de entre 3 y 100 caracteres';
export const empleadoValidationMessage = 'El empleado debe ser de entre 3 y 100 caracteres';
