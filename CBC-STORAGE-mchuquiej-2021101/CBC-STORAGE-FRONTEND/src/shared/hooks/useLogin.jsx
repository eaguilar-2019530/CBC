import { loginRequest, updatePasswordRequest } from "../../services/api";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const login = async (usuario, contrasena) => {
        setIsLoading(true);
        const user = {
            usuario,
            contrasena
        };

        try {
            const response = await loginRequest(user);
            setIsLoading(false);

            if (response.error) {
                toast.error('Error al logearse');
                return false;
            }
            
            toast.success('Bienvenido ' + usuario);            
            localStorage.setItem('token', response.data.token);
            
            const userId = response.data.loggedUser.uid;
            console.log("ID del usuario:", userId);
            
            if(contrasena.includes("@")) {
                const newPassword = prompt('Por favor, ingrese una nueva contraseña:');
                console.log("Nueva contraseña:", newPassword);

                if (newPassword) {
                    setIsUpdatingPassword(true);
                    const updateResponse = await updatePasswordRequest(userId, { contrasena: newPassword });
                    
                    if (updateResponse.error) {
                        toast.error('Error al actualizar la contraseña');
                    } else {
                        toast.success('Contraseña actualizada con éxito');
                    }
                    setIsUpdatingPassword(false);
                }
            }

            return true;
        } catch (error) {
            setIsLoading(false);
            setIsUpdatingPassword(false);
            toast.error('Error en el proceso de login o actualización de contraseña');
            return false;
        }
    };

    return {
        login,
        isLoading,
        isUpdatingPassword
    };
};
