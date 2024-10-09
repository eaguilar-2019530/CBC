import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addEmpleadoRequest, getEmpleadosRequest, updateEmpleadoRequest, deleteEmpleadoRequest } from "../../services/api.js";

export const useEmpleado=()=>{
    const [isLoading, setIsLoading]=useState(false)
    const [empleados, setEmpleados]=useState([])

    const addEmpleado=async(nombres, apellidos, email, telefono)=>{
        setIsLoading(true)
        try {
            const empleado={
                nombres,
                apellidos,
                email,
                telefono
            }            
            const response=await addEmpleadoRequest(empleado)
            console.log(response)
            await getEmpleados()
        } catch (error) {
            toast.error('Error al agregar empleado')
        }finally{
            setIsLoading(false)
        }
    }

    const getEmpleados=async()=>{
        const response=await getEmpleadosRequest()
        if(response.error){
            response?.error?.data?.message || 'Error al obtener empleados'
        }
        setEmpleados(response)
    }

    const updateEmpleado=async(empleadoId, updatedEmpleado)=>{
        setIsLoading(true)
        try {
            const response=await updateEmpleadoRequest(empleadoId, updatedEmpleado)
            console.log(response)
            await getEmpleados()
        } catch (error) {
            console.error("Error al actualizar empleado", error)
            toast.error("Error al actualizar empleado")
        }finally{
            setIsLoading(false)
        }
    }

    const deleteEmpleado=async(empleadoId)=>{
        setIsLoading(true)
        try {
            const response=await deleteEmpleadoRequest(empleadoId)
            console.log(response)
            await getEmpleados()
        } catch (error) {
            console.error("Error al eliminar empleado")
            toast.error("Error al eliminar empleado")
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getEmpleados()
    }, [])

    return {
        addEmpleado,
        getEmpleados,
        updateEmpleado,
        deleteEmpleado,
        isLoading,
        empleados
    }
}