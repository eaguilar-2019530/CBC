import mongoose from "mongoose";

const adminSchema=mongoose.Schema({
    nombres:{
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    usuario:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    contrasena:{
        type: String,
        required: true,
        minLength: [8, 'Password must be 8 characters']
    },
    telefono:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8
    }
})

export default mongoose.model('admin', adminSchema)