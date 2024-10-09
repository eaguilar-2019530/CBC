import axios from "axios";
import toast from "react-hot-toast";

const apiClient=axios.create({
    baseURL: 'http://localhost:2880',
    timeout: 5000
})

//MIDDLEWARE PARA AGREGAR DATOS COMO HEADERS
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Añadir el prefijo 'Bearer'
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//LOGIN
export const loginRequest=async(user)=>{
    try {
        return await apiClient.post('/login', user)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

//EMPLEADO
export const addEmpleadoRequest=async(empleado)=>{
    try {
        return await apiClient.post('/agregarEmpleado', empleado)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getEmpleadosRequest=async()=>{
    try {
        const response=await apiClient.get('/mostrarEmpleados')
        return response.data.empleados
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateEmpleadoRequest=async(empleadoId, updatedEmpleado)=>{
    try {
        return await apiClient.put(`/actualizarEmpleado/${empleadoId}`, updatedEmpleado)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteEmpleadoRequest=async(empleadoId)=>{
    try {
        return await apiClient.delete(`/eliminarEmpleado/${empleadoId}`)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//UBICACION
export const addUbicacionRequest=async(ubicacion)=>{
    try {
        return await apiClient.post('/agregarUbicacion', ubicacion)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getUbicacionesRequest=async()=>{
    try {
        const response=await apiClient.get('/mostrarUbicaciones')
        return response.data.ubicaciones
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const updateUbicacionRequest=async(ubicacionId, updatedUbicacion)=>{
    try {
        return await apiClient.put(`/actualizarUbicacion/${ubicacionId}`, updatedUbicacion)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const deleteUbicacionRequest=async(ubicacionId)=>{
    try {
        return await apiClient.delete(`/eliminarUbicacion/${ubicacionId}`)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//CATEGORIA
export const addCategoriaRequest=async(categoria)=>{
    try {
        return await apiClient.post('/agregarCategoria', categoria)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getCategoriaRequest=async()=>{
    try {
        const response=await apiClient.get('/mostrarCategorias')
        console.log(response)
        return response.data.categorias
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const updateCategoriaRequest=async(categoriaId, updatedCategoria)=>{
    try {
        return await apiClient.put(`/actualizarCategoria/${categoriaId}`, updatedCategoria)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const deleteCategoriaRequest=async(categoriaId)=>{
    try {
        return await apiClient.delete(`/eliminarCategoria/${categoriaId}`)
    } catch (error) {
        return{
            error: true,
            err
        }
    }
}

//HERRAMIENTA
export const addHerramientaRequest = async (herramienta) => {
    try {
        const response = await apiClient.post('/agregarHerramienta', herramienta);
        toast.success("Herramienta agregada exitosamente"); // Mueve el toast aquí
        return response; // Devuelve la respuesta si es exitosa
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};


export const getHerramientasRequest=async()=>{
    try {
        const response=await apiClient.get('/mostrarHerramientas')
        return response.data.herramientas
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}


export const updateHerramientaRequest=async(herramientaId, updatedHerramienta)=>{
    try {
        return await apiClient.put(`/actualizarHerramienta/${herramientaId}`, updatedHerramienta)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteHerramientaRequest=async(herramientaId)=>{
    try {
        return await apiClient.delete(`/eliminarHerramienta/${herramientaId}`)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

//PRÉSTAMO
export const addPrestamoRequest=async(prestamo)=>{
    try {
        return await apiClient.post('/agregarPrestamo', prestamo)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const getPrestamoRequest=async()=>{
    try {
        const response=await apiClient.get('/mostrarPrestamos')
        return response.data.prestamos
    } catch (error) {
        return{
            error: true,
            err
        }
    }
}

export const updatePrestamoRequest=async(prestamoId, updatedPrestamo)=>{
    try {
        return await apiClient.put(`/actualizarPrestamo/${prestamoId}`, updatedPrestamo)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const deletePrestamoRequest=async(prestamoId)=>{
    try {
        return await apiClient.delete(`/eliminarPrestamo/${prestamoId}`)
    } catch (error) {
        return{
            error: true,
            err
        }
    }
}

//ADMIN
export const registerAdminRequest=async(admin)=>{
    try {
        return await apiClient.post('/registrar', admin)
    } catch (error) {
        return{
            error: true,
            err
        }
    }
}

//UPDATE PASWORD
export const updatePasswordRequest = async (userId, updatedPassword) => {
    try {
        return await apiClient.put(`/actualizarMiPerfil/${userId}`, updatedPassword);
    } catch (error) {
        return {
            error: true,
            err: error
        };
    }
};
