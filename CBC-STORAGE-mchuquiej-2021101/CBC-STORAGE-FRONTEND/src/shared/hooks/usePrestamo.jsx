import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {addPrestamoRequest, getPrestamoRequest, updatePrestamoRequest, deletePrestamoRequest} from "../../services/api.js"

export const usePrestamo=()=>{
    const [isLoading, setIsLoading]=useState(false)
    const [prestamos, setPrestamos]=useState()

    const addPrestamo=async(herramienta, cantidadHerramientas, empleado, fechaPrestamo, fechaDevolucion, estado)=>{
        setIsLoading(true)
        try {
            const prestamo={
                herramienta,
                cantidadHerramientas,
                empleado,
                fechaPrestamo,
                fechaDevolucion,
                estado
            }
            const response=await addPrestamoRequest(prestamo)
            console.log(response)
            await getPrestamos()
        } catch (error) {
            toast.error('Error al agregar préstamo')
        }finally{
            setIsLoading(false)
        }
    }

    const getPrestamos=async()=>{
        const response=await getPrestamoRequest()
        console.log(response)
        if(response.error){
            response?.error?.data?.message || 'Error al obtener herramientas'
        }
        setPrestamos(response)
    }

    const updatePrestamo=async(prestamoId, updatedPrestamo)=>{
        setIsLoading(true)
        try {
            const response=await updatePrestamoRequest(prestamoId, updatedPrestamo)
            console.log(response)
            await getPrestamos()
        } catch (error) {
            console.log('Error al actualizar Préstamo')
            toast.error('Error al actualizar Préstamo')
        }finally{
            setIsLoading(false)
        }
    }

    const deletePrestamo=async(prestamoId)=>{
        setIsLoading(true)
        try {
            const response=await deletePrestamoRequest(prestamoId)
            console.log(response)
            await getPrestamos()
        } catch (error) {
            console.log('Error al eliminar el préstamo')
            toast.error('Error al eliminar el préstamo')
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getPrestamos()
    }, [])

    return{
        addPrestamo,
        getPrestamos,
        updatePrestamo,
        deletePrestamo,
        isLoading,
        prestamos
    }
}

