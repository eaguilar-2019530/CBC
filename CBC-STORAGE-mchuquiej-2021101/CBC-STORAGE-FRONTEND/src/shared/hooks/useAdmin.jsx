import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {registerAdminRequest} from '../../services/api.js'

export const useAdmin=()=>{
    const [isLoading, setIsLoading] = useState()

    const registerAdmin=async(nombres, apellidos, usuario, email, contrasena, telefono)=>{
        setIsLoading(true)
        try {
            const admin={
                nombres,
                apellidos,
                usuario,
                email,
                contrasena,
                telefono
            }
            const response=await registerAdminRequest(admin)
            console.log(response)            
            toast.success('Admin registrado exitosamente')
            setIsLoading(false)
        } catch (error) {
            toast.error('Error al registrar administrador')
            setIsLoading(false)
        }
    }

    return {registerAdmin, isLoading}
}