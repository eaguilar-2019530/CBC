import { useState, useEffect } from "react";
import { Input } from '../Input.jsx'
import { usePrestamo } from "../../shared/hooks/usePrestamo.jsx";
import {
    cantidadHerramientasValidationMessage,
    validateCantidadHerramientas,
    validateFechaFin,
    estadoValidationMessage,
    fechaFinValidationMessage,
    /* fechaInicioValidationMessage, */
    validateEstado,
    /* validateFechaInicio, */
    validateFechaInicioFin,
    hrramientaValidationMessage,
    empleadoValidationMessage
} from '../../shared/validators/validatorPrestamo.js'
import toast from "react-hot-toast";
import { useHerramienta } from '../../shared/hooks/useHerramienta.jsx'
import { useEmpleado } from '../../shared/hooks/useEmpleado.jsx'

import '../prestamo/PrestamoStyle6.css';

export const TodoListFormPrestamo = () => {
    const { addPrestamo, getPrestamos, updatePrestamo, deletePrestamo, isLoading, prestamos } = usePrestamo()

    const { getHerramientas, herramientas = [] } = useHerramienta()
    const { getEmpleados, empleados = [] } = useEmpleado()

    useEffect(() => {
        getHerramientas()
        getEmpleados()
    }, [])

    const initialFormData = {
        herramienta: {
            value: "",
            isValid: false,
            showError: false
        },
        cantidadHerramientas: {
            value: "",
            isValid: false,
            showError: false
        },
        empleado: {
            value: "",
            isValid: false,
            showError: false
        },
        /*  fechaPrestamo: {
             value: "",
             isValid: false,
             showError: false
         }, */
        /* fechaDevolucion: {
            value: "",
            isValid: false,
            showError: false
        },
        estado: {
            value: "",
            isValid: false,
            showError: false
        } */
    }

    const [formData, setFormData] = useState(initialFormData)
    const [editingPrestamoId, setEditingPrestamoId] = useState(null)

    const fetchPrestamos = async () => {
        try {
            await getPrestamos()
        } catch (error) {
            console.error('Error al mostrar prestamos en fetchPrestamos')
        }
    }

    const handleValueChange = (value, field) => {
        let isValid = false

        if (field === "herramienta" || field === "empleado") {
            isValid = value !== ""
        }

        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value,
                isValid: field === "herramienta" || field === "empleado" ? isValid : prevData[field].isValid,
            }
        }))
    }

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case "herramienta":
                isValid = value != ""
                break;
            case "cantidadHerramientas":
                isValid = validateCantidadHerramientas(value)
                break
            case "empleado":
                isValid = value != ""
                break
            /*  case "fechaPrestamo":
                 isValid = validateFechaInicio(value)
                 break */
            /* case "fechaDevolucion":
                isValid = validateFechaFin(value)
                break
            case "estado":
                isValid = value != ""
                break */
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

    const handleAddPrestamo = async (e) => {
        e.preventDefault()

        try {
            if (editingPrestamoId) {
                await updatePrestamo(editingPrestamoId, {
                    herramienta: formData.herramienta.value,
                    cantidadHerramientas: formData.cantidadHerramientas.value,
                    empleado: formData.empleado.value/* ,
                    fechaPrestamo: formData.fechaPrestamo.value,
                    fechaDevolucion: formData.fechaDevolucion.value,
                    estado: formData.estado.value */
                })
                toast.success('Préstamo actualizado correctamente')
            } else {
                await addPrestamo(
                    formData.herramienta.value,
                    formData.cantidadHerramientas.value,
                    formData.empleado.value,
                    /* formData.fechaPrestamo.value, */
                    /* formData.fechaDevolucion.value,
                    formData.estado.value */
                )
                toast.success('Préstamo agregado exitosamente')
            }
            setFormData(initialFormData)
            setEditingPrestamoId(null)
            fetchPrestamos()
        } catch (error) {
            console.error("Error al agregar/actualizar préstamo", error, "james")
            toast.error('Error al agregar/actualizar préstamo')
        }
    }

    const handleEditPrestamo = (prestamoId) => {
        const prestamoToEdit = prestamos.find(prestamo => prestamo._id === prestamoId)
        if (prestamoToEdit) {
            setFormData({
                herramienta: {
                    value: prestamoToEdit.herramienta._id,
                    isValid: true,
                    showError: false
                },
                cantidadHerramientas: {
                    value: prestamoToEdit.cantidadHerramientas,
                    isValid: true,
                    showError: false
                },
                empleado: {
                    value: prestamoToEdit.empleado._id,
                    isValid: true,
                    showError: false
                },
                /* fechaPrestamo: {
                    value: prestamoToEdit.fechaPrestamo,
                    isValid: true,
                    showError: false
                }, */
                /* fechaDevolucion: {
                    value: prestamoToEdit.fechaDevolucion,
                    isValid: true,
                    showError: false
                },
                estado: {
                    value: prestamoToEdit.estado,
                    isValid: true,
                    showError: false
                } */
            })
            setEditingPrestamoId(prestamoId)
        }
    }

    const handleDeletePrestamo = async (prestamoId) => {
        if (window.confirm('¿Estás seguro de eliminar este préstamo?')) {
            try {
                await deletePrestamo(prestamoId)
                toast.success('Préstamo eliminado exitósamente')
                fetchPrestamos()
            } catch (error) {
                console.log('Error al eliminar el préstamo')
                toast.error('Error al eliminar el préstamo')
            }
        }
    }

    const cancel = () => {
        setFormData(initialFormData)
    }

    const isSubmitButtonDisabled =
        !formData.herramienta.isValid ||
        !formData.cantidadHerramientas.isValid ||
        !formData.empleado.isValid /*|| 
        !formData.fechaPrestamo.isValid || */
    /* !formData.fechaDevolucion.isValid ||  */
    /* !formData.estado.isValid */


    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const estadoStyles = {
        devuelto: { color: 'green' },
        noDevuelto: { color: 'red' }
    };

    const getEstadoStyle = (estado) => {
        switch (estado) {
            case 'DEVUELTO':
                return estadoStyles.devuelto;
            case 'NO DEVUELTO':
                return estadoStyles.noDevuelto;
            default:
                return {};
        }
    };

    return (
        /*------ Inicio de los contenedores ------*/
        <div className="contenedorPrincipalP">
            <h2 className="tituloPrestamo">PRESTAMOS</h2>
            <form onSubmit={handleAddPrestamo} className="contenedorPrestamo">
                {/*--- PRIMER COMBOBOX ---*/}
                <div>
                    <select
                        value={formData.herramienta.value}
                        onChange={(e) => handleValueChange(e.target.value, 'herramienta')}
                        onBlur={() => handleValidationOnBlur(formData.herramienta.value, 'herramienta')}
                        required
                        class="form-select" aria-label="Disabled select example"
                    >
                        <option value="">Seleccione la Herramienta</option>
                        {herramientas.map((herramienta) => (
                            <option key={herramienta._id} value={herramienta._id}>{herramienta.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="espacioAbajoI"></div>

                {/*--- SEGUNDO COMBOBOX ---*/}
                <div>
                    <select
                        value={formData.empleado.value}
                        onChange={(e) => handleValueChange(e.target.value, 'empleado')}
                        onBlur={() => handleValidationOnBlur(formData.empleado.value, 'empleado')}
                        required
                        class="form-select" aria-label="Disabled select example"
                    >
                        <option value="">Seleccione el empleado</option>
                        {empleados.map((empleado) => (
                            <option key={empleado._id} value={empleado._id}>{empleado.nombres}</option>
                        ))}
                    </select>
                </div>
                <div className="espacioAbajoI"></div>

                {/*--- INCIA INPUT ---*/}
                <Input
                    field="cantidadHerramientas"
                    label="Cantidad Herramientas"
                    value={formData.cantidadHerramientas.value}
                    onChangeHandler={handleValueChange}
                    type="number"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.cantidadHerramientas.showError}
                    validationMessage={cantidadHerramientasValidationMessage}
                />
                {/* <Input
                    field="fechaPrestamo"
                    label="Fecha Préstamo"
                    value={formData.fechaPrestamo.value}
                    onChangeHandler={handleValueChange}
                    type="date"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.fechaPrestamo.showError}
                    validationMessage={fechaInicioValidationMessage}
                /> */}
                {/* <Input
                    field="fechaDevolucion"
                    label="Fecha Devolución"
                    value={formData.fechaDevolucion.value}
                    onChangeHandler={handleValueChange}
                    type="date"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.fechaDevolucion.showError}
                    validationMessage={fechaFinValidationMessage}
                />
                <div>
                    <select
                        value={formData.estado.value}
                        onChange={(e) => handleValueChange(e.target.value, 'estado')}
                        onBlur={() => handleValidationOnBlur(formData.estado.value, 'estado')}
                        required
                    >
                        <option value="">Seleccione el estado</option>
                        <option value="DEVUELTO">DEVUELTO</option>
                        <option value="NO DEVUELTO">NO DEVUELTO</option>                        
                    </select>
                </div> */}
                <div className="espacioAbajoB"></div>
                <div contenedorBotones>
                    <button className="botonUnoP" type="submit" disabled={isSubmitButtonDisabled}>
                        {editingPrestamoId ? 'ACTUALIZAR' : 'AGREGAR'}
                    </button>
                    <button className="botonDosP" type="button" onClick={cancel}>
                        CANCELAR
                    </button>
                </div>
            </form>

            {/*--- INICIO DE LA TABLA ---*/}
            <div className="table-responsive" style={{ maxHeight: '215px', overflowY: 'auto' }}>
                <table className="table table-striped">
                    <thead>
                        <tr className="titulosTabla">
                            <th>No.</th>
                            <th>Herramienta</th>
                            <th>Cantidad Herramientas</th>
                            <th>Empleado</th>
                            <th>Fecha Préstamo</th>
                            <th>Fecha Devolución</th>
                            <th>Estado</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prestamos && prestamos.length > 0 && prestamos.map((prestamo, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{prestamo.herramienta.nombre}</td>
                                <td>{prestamo.cantidadHerramientas}</td>
                                <td>{prestamo.empleado.nombres}</td>
                                <td>{formatDate(prestamo.fechaPrestamo)}</td>
                                <td>{formatDate(prestamo.fechaDevolucion)}</td>
                                <td style={getEstadoStyle(prestamo.estado)}>
                                    {prestamo.estado}
                                </td>
                                <td className="celdaIconosP">
                                    <svg onClick={() => handleEditPrestamo(prestamo._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </td>

                                <td className="celdaIconosP">
                                    <svg onClick={() => handleDeletePrestamo(prestamo._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
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

