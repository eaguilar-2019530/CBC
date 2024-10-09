import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { addCategoriaRequest, getCategoriaRequest, updateCategoriaRequest, deleteCategoriaRequest } from "../../services/api.js";

export const useCategoria=()=>{
    const [isLoading, setIsLoading]=useState(false)
    const [categorias, setCategorias]=useState()

    const addCategoria=async(categoria)=>{
        setIsLoading(true)
        try {
            const categoriaModel={
                categoria
            }
            const response=await addCategoriaRequest(categoriaModel)
            console.log(response)
            await getCategorias()
        } catch (error) {
            toast.error('Error al agregar categoría')
        }finally{
            setIsLoading(false)
        }
    }

    const getCategorias=async()=>{
        const response= await getCategoriaRequest()
        if(response.error){
            response?.error?.data?.message || "Error al obtener las categorías"
        }
        setCategorias(response)
    }

    const updateCategoria=async(categoriaId, updatedCategoria)=>{
        setIsLoading(true)
        try {
            const response=await updateCategoriaRequest(categoriaId, updatedCategoria)
            console.log(response)
            await getCategorias()
        } catch (error) {
            console.error('Error al actualizar categoría')
            toast.error('Error al actualizar categoría')
        }finally{
            setIsLoading(false)
        }
    }

    const deleteCategoria=async(categoriaId)=>{
        setIsLoading(true)
        try {
            const response=await deleteCategoriaRequest(categoriaId)
            console.log(response)
            await getCategorias()
        } catch (error) {
            console.error('Error al eliminar categoría')
            toast.error('Error al eliminar categoría')
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getCategorias()
    },[])

    return{
        addCategoria,
        getCategorias,
        updateCategoria,
        deleteCategoria,
        isLoading,
        categorias
    }
}