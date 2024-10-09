import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addHerramientaRequest, getHerramientasRequest, updateHerramientaRequest, deleteHerramientaRequest } from "../../services/api.js";

export const useHerramienta=()=>{
    const [isLoading, setIsLoading]=useState(false)
    const [herramientas, setHerramientas]=useState()

    const addHerramienta=async(nombre, stock, marca, modelo, categoria, ubicacion)=>{        
        setIsLoading(true)
        try {
            const herramienta={
                nombre,
                stock,
                marca,
                modelo,
                categoria,
                ubicacion
            }
            console.log(ubicacion.capacidad+"dsafsdakjfhdalkfjhsdafkj")
            const response=await addHerramientaRequest(herramienta)
            console.log(response)
            await getHerramientas()
            /* toast.success('Herramienta agregada exitosamente') */
        } catch (error) {
            toast.error('Error al agregar la herramienta')
        }finally{
            setIsLoading(false)
        }
    }

    const getHerramientas=async()=>{
        const response=await getHerramientasRequest()
        console.log(response)
        if(response.error){
            response?.error?.data?.message || 'Error al obtener las herramientas'
        }
        setHerramientas(response)
    }

    const updateHerramienta=async(herramientaId, updatedHerramienta)=>{
        setIsLoading(true)
        try {
            const response=await updateHerramientaRequest(herramientaId, updatedHerramienta)
            console.log(response)
            await getHerramientas()
        } catch (error) {
            console.error('Error al actualizar Herramienta')
            toast.error('Error al actualizar Herramienta')
        }finally{
            setIsLoading(false)
        }
    }

    const deleteHerramienta=async(herramientaId)=>{
        setIsLoading(true)
        try {
            const response=await deleteHerramientaRequest(herramientaId)
            console.log(response)
            await getHerramientas()
        } catch (error) {
            console.error('Error al eliminar la herramienta')
            toast.error('Error al eliminar la herramienta')
        }finally{
            setIsLoading(false)
        }
    }
    
    useEffect(()=>{
        getHerramientas()
    }, [])

    return{
        addHerramienta,
        getHerramientas,
        updateHerramienta,
        deleteHerramienta,
        isLoading,
        herramientas
    }
}