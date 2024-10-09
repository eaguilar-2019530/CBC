import { useState, useEffect } from "react";
import { Input } from '../Input'
import { useAdmin } from "../../shared/hooks/useAdmin.jsx";
import {
    apellidosAdminValidationMessage,
    codigoAdminInincialValidationMessage,
    emailAdminValidationMessage,
    nombresAdminValidationMessage,
    validateApellidos,
    validateCodigo,
    telefonoAdminValidationMessage,
    usuarioAdminValidationMessage,
    validateEmail,
    validateNombres,
    validateTelefono,
    validateUsuario
} from '../../shared/validators/validatorAdmin.js'
import toast from "react-hot-toast";

export const RegisterComponent = () => {
    const { registerAdmin, isLoading } = useAdmin()
    const [recipientEmail, setRecipientEmail] = useState('');    

    const initialFormData = {
        nombres: {
            value: "",
            isValid: false,
            showError: false
        },
        apellidos: {
            value: "",
            isValid: false,
            showError: false
        },
        email: {
            value: "",
            isValid: false,
            showError: false
        },
        usuario: {
            value: "",
            isValid: false,
            showError: false
        },
        contrasena: {
            value: "",
            isValid: false,
            showError: false
        },
        telefono: {
            value: "",
            isValid: false,
            showError: false
        }
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleValueChange = (value, field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field], 
                value
            }
        }))
    }
    

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case "nombres":
                isValid = validateNombres(value)
                break;
            case "apellidos":
                isValid = validateApellidos(value)
                break;
            case "email":
                isValid = validateEmail(value)
                break;
            case "usuario":
                isValid = validateUsuario(value)
                break;
            case "contrasena":
                isValid = validateCodigo(value)
                break;
            case "telefono":
                isValid = validateTelefono(value)
                break;
            default:
                break
        }

        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value,
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await registerAdmin(
                formData.nombres.value,
                formData.apellidos.value,
                formData.usuario.value,
                formData.email.value,                
                formData.contrasena.value,
                formData.telefono.value
            )
            setFormData(initialFormData)

            //enviar correo
            const response = await fetch('http://localhost:2880/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: 'Credenciales de acceso CBC-STORAGE', 
                    to: formData.email.value,
                    nombres: formData.nombres.value,
                    apellidos: formData.apellidos.value,
                    usuario: formData.usuario.value,
                    contrasena: formData.contrasena.value
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el correo');
            }

            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('Error al registrar admin')
            toast.error("Error al registrar admin")
        }
    }

    const cancel = () => {
        setFormData(initialFormData)
    }

    const isSubmitButtonDisabled =
        !formData.nombres.isValid ||
        !formData.apellidos.isValid ||
        !formData.email.isValid ||
        !formData.usuario.isValid ||
        !formData.contrasena.isValid ||
        !formData.telefono.isValid

    return (
        <div>
            <form onSubmit={handleRegister}>
                <Input
                    field="nombres"
                    label="Nombres"
                    value={formData.nombres.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.nombres.showError}
                    validationMessage={nombresAdminValidationMessage}
                />
                <Input
                    field="apellidos"
                    label="Apellidos"
                    value={formData.apellidos.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.apellidos.showError}
                    validationMessage={apellidosAdminValidationMessage}
                />
                <Input
                    field="usuario"
                    label="Usuario"
                    value={formData.usuario.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.usuario.showError}
                    validationMessage={usuarioAdminValidationMessage}
                />
                <Input
                    field="email"
                    label="Email"
                    value={formData.email.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.email.showError}
                    validationMessage={emailAdminValidationMessage}
                />
                <Input
                    field="contrasena"
                    label="Contraseña"
                    value={formData.contrasena.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.contrasena.showError}
                    validationMessage={codigoAdminInincialValidationMessage}
                />
                <Input
                    field="telefono"
                    label="Teléfono"
                    value={formData.telefono.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.telefono.showError}
                    validationMessage={telefonoAdminValidationMessage}
                />
                <div></div>
                <button type="submit" disabled={isSubmitButtonDisabled}>
                    Registrar
                </button>
                <button type="button" onClick={cancel}>
                    Cancelar
                </button>
            </form>
        </div>
    )

}