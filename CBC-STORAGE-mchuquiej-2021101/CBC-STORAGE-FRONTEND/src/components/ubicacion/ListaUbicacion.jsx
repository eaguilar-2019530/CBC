import { useState, useEffect } from "react";
import { Input } from '../Input'
import { useUbicacion } from "../../shared/hooks/useUbicacion.jsx";
import {
    validateUbicacion,
    ubicacionUbicacionValidationMessage,
    validateCapacidad,
    capacidadUbicacionValidationMessage
} from '../../shared/validators/validatorUbicacion.js'
import toast from "react-hot-toast";

import '../ubicacion/UbicacionStyle7.css';

export const TodoListFormUbicacion = () => {
    const { addUbicacion, getUbicaciones, updateUbicacion, deleteUbicacion, ubicaciones, isLoading } = useUbicacion()

    const initialFormData = {
        ubicacion: {
            value: "",
            isValid: false,
            showError: false
        },
        capacidad: {
            value: "",
            isValid: false,
            showError: false
        }
    }

    const [formData, setFormData] = useState(initialFormData)
    const [editingUbicacionId, setEditingUbicacionId] = useState(null)

    const fetchUbicacion = async () => {
        try {
            await getUbicaciones()
        } catch (error) {
            console.error('Error al obtener las ubicaciones en fetchUbicacion')
        }
    }

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
            case "ubicacion":
                isValid = validateUbicacion(value)
                break;
            case "capacidad":
                isValid = validateCapacidad(value)
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

    const handleAddUbicacion = async (e) => {
        e.preventDefault()
        try {
            if (editingUbicacionId) {
                await updateUbicacion(editingUbicacionId, {
                    ubicacion: formData.ubicacion.value,
                    capacidad: formData.capacidad.value
                })
                //toast.success('Ubicación actualizada exitosamente')
            } else {
                await addUbicacion(
                    formData.ubicacion.value,
                    formData.capacidad.value
                )
                //toast.success('Ubicación agregada exitosamente')
            }
            setFormData(initialFormData)
            setEditingUbicacionId(null)
            fetchUbicacion()
        } catch (error) {
            console.error("Error al agregar/actualizar ubicación")
            toast.error("Error al agregar/actualizar ubicación")
        }
    }

    const handleEditUbicacion = (ubicacionId) => {
        const ubicacionToEdit = ubicaciones.find(ubicacion => ubicacion._id === ubicacionId)
        if (ubicacionToEdit) {
            setFormData({
                ubicacion: {
                    value: ubicacionToEdit.ubicacion,
                    isValid: true,
                    showError: false
                },
                capacidad: {
                    value: ubicacionToEdit.capacidad,
                    isValid: true,
                    showError: false
                }
            })
            setEditingUbicacionId(ubicacionId)
        }
    }

    const handleDeleteUbicacion = async (ubicacionId) => {
        if (window.confirm('¿Estás seguro que quieres eliminar la ubicación?')) {
            try {
                await deleteUbicacion(ubicacionId)
                toast.success('Ubicación eliminada exitosamente')
                fetchUbicacion()
            } catch (error) {
                console.error('Error al eliminar la ubicación')
                toast.error('Error al eliminar la ubicación')
            }
        }
    }

    const cancel = () => {
        setFormData(initialFormData)
        setEditingUbicacionId(null);
    }

    const isSubmitButtonDisabled =
        !formData.ubicacion.isValid ||
        !formData.ubicacion.isValid

    return (
        /*--- INICIO DE LOS CONTENEDORES ---*/
        <div className="contenedorPrincipalU">
            <h2 className="tituloUbicaciones">Ubicaciones</h2>
            <form onSubmit={handleAddUbicacion} className="contenedorUbicacion">
                <Input
                    field="ubicacion"
                    label="Ubicación"
                    value={formData.ubicacion.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.ubicacion.showError}
                    validationMessage={ubicacionUbicacionValidationMessage}
                />
                <Input
                    field="capacidad"
                    label="Capacidad"
                    value={formData.capacidad.value}
                    onChangeHandler={handleValueChange}
                    type="text" //puede dar error
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.capacidad.showError}
                    validationMessage={capacidadUbicacionValidationMessage}
                />
                <div className="espacioAbajoU"></div>
                {/*--- Inico de los botones ---*/}
                <div className="contenedorBotones">
                    <button className="botonUnoU" type="submit" disabled={isSubmitButtonDisabled}>
                        {editingUbicacionId ? 'ACTUALIZAR' : 'AGREGAR'}
                    </button>

                    <button className="botonDosU" type="submit" onClick={cancel}>
                        CANCELAR
                    </button>
                </div>

            </form>

            {/*--- INICIO DE LA TABLA ---*/}
            <div className="table-responsive" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                <table className="table table-striped">
                    <thead>
                        <tr className="titulosTablaU">
                            <th>No.</th>
                            <th>Ubicación</th>
                            <th>Capacidad</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ubicaciones && ubicaciones.length > 0 && ubicaciones.map((ubicacion, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{ubicacion.ubicacion}</td>
                                <td>{ubicacion.capacidad}</td>
                                <td className="celdaIconos">
                                    <svg onClick={() => handleEditUbicacion(ubicacion._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </td>
                                <td className="celdaIconos">
                                    <svg onClick={() => handleDeleteUbicacion(ubicacion._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}