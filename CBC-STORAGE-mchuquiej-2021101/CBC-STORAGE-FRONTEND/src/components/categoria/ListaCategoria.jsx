import { useState, useEffect } from "react";
import { Input } from "../Input";
import { useCategoria } from "../../shared/hooks/useCategoria.jsx";
import {
    categoriaCategoriaValidationMessage,
    validateCategoria
} from '../../shared/validators/validatorCategoria.js'
import toast from "react-hot-toast";
import '../categoria/CategoriaStyle3.css';

export const TodoListFormCategoria = () => {
    const { addCategoria, getCategorias, updateCategoria, deleteCategoria, isLoading, categorias } = useCategoria()

    const initialFormData = {
        categoria: {
            value: "",
            isValid: false,
            showError: false
        }
    }

    const [formData, setFormData] = useState(initialFormData)
    const [editingCategoriaId, setEditingCategoriaId] = useState(null)

    const fetchCategoria = async () => {
        try {
            await getCategorias()
        } catch (error) {
            console.error('Error al obtener las categorías en fetchCategoria')
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
            case "categoria":
                isValid = validateCategoria(value)
                break
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

    const handleAddCategoria = async (e) => {
        e.preventDefault()
        try {
            if (editingCategoriaId) {
                await updateCategoria(editingCategoriaId, {
                    categoria: formData.categoria.value
                })
                toast.success('Categoría actualizada exitosamente')
            } else {
                await addCategoria(
                    formData.categoria.value
                )
                toast.success('Categoría agregada exitosamente')
            }
            setFormData(initialFormData)
            setEditingCategoriaId(null)
            fetchCategoria()
        } catch (error) {
            console.error('Error al agregar/actualizar categoría')
            toast.error('Error al agregar/actualizar categoría')
        }
    }

    const handleEditCategoria = (categoriaId) => {
        const categoriaToEdit = categorias.find(categoria => categoria._id === categoriaId)
        if (categoriaToEdit) {
            setFormData({
                categoria: {
                    value: categoriaToEdit.categoria,
                    isValid: true,
                    showError: false
                }
            })
            setEditingCategoriaId(categoriaId)
        }
    }

    const handleDeleteCategoria = async (categoriaId) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            try {
                await deleteCategoria(categoriaId)
                toast.success('Categoría eliminada exitosamente')
                fetchCategoria()
            } catch (error) {
                console.error('Error al eliminar la categoría')
                toast.error('Error al eliminar la categoría')
            }
        }
    }

    const cancel = () => {
        setFormData(initialFormData)
        setEditingCategoriaId(null);
    }

    const isSubmitButtonDisabled = !formData.categoria.isValid

    return (
        /*------ Inicio de los contenedores ------*/
        <div className="contenedorPrincipal">
            <h2 className="tituloCategoria">CATEGORÍA</h2>
            <form onSubmit={handleAddCategoria} className="contenedorCategoria">
                <p>Categoría</p>
                <Input
                    field="categoria"
                    value={formData.categoria.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.categoria.showError}
                    validationMessage={categoriaCategoriaValidationMessage}
                />
                <div className="espacioAbajo"></div>
                <div className="contenedorBotones">
                    <button className="botonUno" type="submit" disabled={isSubmitButtonDisabled}>
                        {editingCategoriaId ? "ACTUALIZAR" : 'AGREGAR'}
                    </button>
                    <button className="botonDos" type="button" onClick={cancel}>
                        CANCELAR
                    </button>
                </div>

            </form>

            {/*--- INICIO DE LA TABLA ---*/}
            <div className="table-responsive" style={{ maxHeight: '280px', overflowY: 'auto' }}>
                <table className="table table-striped">
                    <thead>
                        <tr className="titulosTabla">
                            <th>No.</th>
                            <th>Categorías</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias && categorias.length > 0 && categorias.map((categoria, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{categoria.categoria}</td>
                                <td className="celdaIconos">
                                    <svg onClick={() => handleEditCategoria(categoria._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </td>
                                <td className="celdaIconos">
                                    <svg onClick={() => handleDeleteCategoria(categoria._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
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