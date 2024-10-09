import mongoose from 'mongoose'

const empleadoSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    }
})

export default mongoose.model('empleado', empleadoSchema)