import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addUbicacionRequest, getUbicacionesRequest, updateUbicacionRequest, deleteUbicacionRequest } from "../../services/api.js";

export const useUbicacion=()=>{
    const [isLoading, setIsLoading]=useState(false)
    const [ubicaciones, setUbicaciones]=useState()

    const addUbicacion=async(ubicacion, capacidad)=>{
        setIsLoading(true)
        try {
            const ubicacionModelo={
                ubicacion,
                capacidad
            }
            const response=await addUbicacionRequest(ubicacionModelo)
            console.log(response)
            toast.success('Ubicación agregada exitosamente')
            await getUbicaciones()
        } catch (error) {
            toast.error('Error al agregar ubicación')
        }finally{
            setIsLoading(false)
        }
    }

    const getUbicaciones=async()=>{
        const response=await getUbicacionesRequest()
        if(response.error){
            response?.error?.data?.message || "Error al obtener ubicaciones"
        }
        setUbicaciones(response)
    }

    const updateUbicacion=async(ubicacionId, updatedUbicacion)=>{
        setIsLoading(true)
        try {
            const response=await updateUbicacionRequest(ubicacionId, updatedUbicacion)
            console.log(response)
            toast.success('Ubicación actualizada exitosamente')
            await getUbicaciones()
        } catch (error) {
            console.error('Error al actualizar ubicación')
            toast.error('Error al actualizar ubicación')
        }finally{
            setIsLoading(false)
        }
    }

    const deleteUbicacion=async(ubicacionId)=>{
        setIsLoading(true)
        try {
            const response=await deleteUbicacionRequest(ubicacionId)
            console.log(response)
            await getUbicaciones()
        } catch (error) {
            console.error('Error al eliminar ubicación')
            toast.error('Error al eliminar ubicación')
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getUbicaciones()
    },[])

    return{
        addUbicacion,
        getUbicaciones,
        updateUbicacion,
        deleteUbicacion,
        ubicaciones,
        isLoading
    }
}