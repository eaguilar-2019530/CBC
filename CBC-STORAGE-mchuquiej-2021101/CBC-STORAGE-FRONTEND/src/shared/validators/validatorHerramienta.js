export const validateNombre = (nombre) => {
    const regex = /^[a-zA-Z\s]{1,100}$/; // Acepta letras y espacios, de 1 a 100 caracteres
    return regex.test(nombre)
}

export const validateStock = (stock) => {
    const regex = /^\d+$/; // Solo números enteros
    return regex.test(stock) && parseInt(stock) > 0; // Verifica que sea mayor a 0
}


export const validateMarca = (marca) => {
    const regex = /^[a-zA-Z0-9-]+$/; // Acepta letras y espacios, de 1 a 100 caracteres
    return regex.test(marca)
}

export const validateModelo = (modelo) => {
    const regex = /^[a-zA-Z0-9-]+$/;  // Acepta letras, números y -
    return regex.test(modelo)
}

export const validateCategoria = (categoria) => {
    const regex = /^[a-zA-Z\s]{1,100}$/; // Acepta letras y espacios, de 1 a 100 caracteres
    return regex.test(categoria)
}

export const validateUbicacion = (ubicacion) => {
    const regex = /^[a-zA-Z\s]{1,100}$/; // Acepta letras y espacios, de 1 a 100 caracteres
    return regex.test(ubicacion)
}


export const nombreHerramientaValidationMessage = 'El nombre de la herramienta debe ser de entre 1 y 100 caracteres, con espacios permitidos.';
export const stockHerramientaValidationMessage = 'El stock debe contener únicamente números enteros mayores a 0.'
export const marcaHerramientaValidationMessage = 'La marca de la herramienta debe ser de entre 1 y 100 caracteres'
export const modeloHerramientaValidationMessage = 'El modelo de la herramienta debe ser de entre 1 y 100 caracteres, puede usar -'
export const categoriaHerramientaValidationMessage = 'La categoría de la herramienta debe ser de entre 3 y 100 caracteres'
export const ubicacionHerramientaValidationMessage = 'La ubicación de la herramienta debe ser de entre 3 y 100 caracteres'

