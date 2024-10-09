export const validateCategoria = (categoria) => {
    const regex = /^[\w\s]{3,100}$/ // Acepta letras, números y espacios, de 3 a 100 caracteres
    return regex.test(categoria)
}

export const categoriaCategoriaValidationMessage = 'El nombre de la categoría debe ser de entre 3 y 100 caracteres, con espacios permitidos.';

