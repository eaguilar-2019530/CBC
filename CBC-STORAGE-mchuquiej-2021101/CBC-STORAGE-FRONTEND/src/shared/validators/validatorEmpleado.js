export const validateNombres = (nombres) => {
    const regex = /^[A-Za-z\s]{1,50}$/; // Acepta solo letras (mayúsculas y minúsculas) y espacios, de 1 a 50 caracteres
    return regex.test(nombres);
}


export const validateApellidos = (apellidos) => {
    const regex = /^[A-Za-z\s]{1,50}$/; // Acepta solo letras (mayúsculas y minúsculas) y espacios, de 1 a 50 caracteres
    return regex.test(apellidos)
}

export const validateEmail = (email) => {
    const regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/;
    return regex.test(email);
};


export const validateTelefono = (telefono) => {
    const regex = /^\d{8}$/ // Accepta 8 números
    return regex.test(telefono)
}


export const nombresEmpleadoValidationMessage = 'El nombre del empleado debe ser de entre 3 y 50 letras, con espacios permitidos.';
export const apellidosEmpleadoValidationMessage = 'El apellido del empleado debe ser de entre 3 y 50 letras, con espacios permitidos.';
export const emailEmpleadoValidationMessage = 'Recuerde que debe llevar la estructura de un email válido'
export const telefonoEmpleadoValidationMessage = 'El teléfono debe ser 8 dígitos, sin espacios permitidos.'
