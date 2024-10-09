export const validateNombres = (nombres) => {
    const regex = /^[\w\s]{3,400}$/ // Acepta letras, números y espacios, de 3 a 400 caracteres
    return regex.test(nombres)
}

export const validateApellidos = (apellidos) => {
    const regex = /^[\w\s]{3,400}$/ // Acepta letras, números y espacios, de 3 a 400 caracteres
    return regex.test(apellidos)
}

export const validateUsuario = (usuario) => {    
    const usuarioLowerCase = usuario.toLowerCase();    
    
    const regex = /^[a-z0-9\s]{3,400}$/;        //Debe estar en minúsuclas
    return regex.test(usuarioLowerCase);
}


export const validateEmail=(email)=>{
    const regex = /^[\w\s@.]{3,400}$/
    return regex.test(email)
}

export const validateCodigo = (codigo) => {
    const regex = /^@[A-Z\W_]{7}$/;
    return regex.test(codigo);
};


export const validateTelefono = (telefono) => {
    const regex = /^\d{8}$/ // Accepta 8 números
    return regex.test(telefono)
}


export const nombresAdminValidationMessage = 'El nombre del empleado debe ser de entre 3 y 100 caracteres, con espacios permitidos.';
export const apellidosAdminValidationMessage = 'El apellido del empleado debe ser de entre 3 y 100 caracteres, con espacios permitidos.';
export const usuarioAdminValidationMessage = 'El usuario del admin debe ser de entre 3 y 100 caracteres, todo en letras minúsculas.';
export const emailAdminValidationMessage = 'Recuerde que debe llevar la estructura de un email válido'
export const codigoAdminInincialValidationMessage = 'La contraseña debe tener exactamente 8 caracteres, comenzar con el símbolo @ y contener solo letras mayúsculas y caracteres especiales, sin números.'
export const telefonoAdminValidationMessage = 'El teléfono debe ser 8 dígitos, sin espacios permitidos.'
