'use strict'
import Admin from '../admin/admin.model.js'
import { genereteJwt } from '../utils/jwt.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

export const register = async (req, res) => {
    try {
        console.log(req.body)
        let data = req.body;
        
        const requiredFields = ['nombres', 'apellidos', 'usuario', 'email', 'contrasena', 'telefono'];

        for (let field of requiredFields) {
            if (!data[field]) {
                return res.status(400).send({ message: `El campo ${field} es obligatorio` });
            }
        }

        const passwordRegex = /^@[A-Z\W_]{7}$/;
        if (!data.contrasena || typeof data.contrasena !== 'string' || !passwordRegex.test(data.contrasena)) {
            return res.status(400).send({ 
                message: 'La contraseña debe tener exactamente 8 caracteres, comenzar con el símbolo @ y contener solo letras mayúsculas y caracteres especiales, sin números.'

            });
        }

        data.contrasena = await encrypt(data.contrasena);

        let usuarioEncontrado=await Admin.findOne({usuario: data.usuario})
        if(usuarioEncontrado) return res.status(500).send({message: 'El usuario ya existe'})
        
        let emailEncontrado=await Admin.findOne({email: data.email})
        if(emailEncontrado) return res.status(500).send({message: 'El email ya está vinculado a otro usuario'})

        let admin = new Admin(data);
        await admin.save();

        return res.status(200).send({ message: 'Registrado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al registrar usuario' });
    }
};


export const login = async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;
        
        const requiredFields = ['usuario', 'contrasena'];
        for (let field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `El campo ${field} es obligatorio` });
            }
        }
        
        let admin = await Admin.findOne({ usuario });
        if (!admin) {
            console.log('Administrador no encontrado');
            return res.status(404).send({ message: 'Credenciales inválidas' });
        }

        // Verificar si la contraseña es válida comparando con la cifrada
        const isPasswordValid = await checkPassword(contrasena, admin.contrasena);
        
        if (isPasswordValid) {
            const loggedUser = {
                uid: admin._id,
                usuario: admin.usuario,
                nombres: admin.nombres,
                apellidos: admin.apellidos
            };
            const token = await genereteJwt(loggedUser); 

            return res.send({
                message: `Welcome ${admin.nombres}`,
                loggedUser,
                token
            });
        }

        return res.status(404).send({ message: 'Credenciales inválidas' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).send({ message: 'Error al iniciar sesión' });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = req.body;
        
        if (req.user.uid !== id) {
            return res.status(403).send({ message: 'No autorizado para actualizar este usuario' });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*@).{8,}$/;

        if (data.contrasena && (typeof data.contrasena === 'string' && !passwordRegex.test(data.contrasena))) {
            return res.status(400).send({ 
               message: 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial. No se permite el símbolo @.'
            });
        }

        if (data.contrasena) {
            data.contrasena = await encrypt(data.contrasena);
        }

        const updatedAdmin = await Admin.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).send({ message: 'Usuario no encontrado y/o no actualizado' });
        }

        return res.send({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(500).send({ message: 'Error al actualizar usuario' });
    }
};


export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (req.user.uid !== id) {
            return res.status(403).send({ message: 'No autorizado para eliminar este usuario' });
        }

        const deletedAdmin = await Admin.findOneAndDelete({ _id: id });
        if (!deletedAdmin) {
            return res.status(404).send({ message: 'Usuario no encontrado y/o no eliminado' });
        }

        return res.send({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).send({ message: 'Error al eliminar Usuario' });
    }
};

export const search=async(req,res)=>{
    try {
        let { search } = req.body;
        
        let admins = await Admin.find({
            nombres: { $regex: search, $options: 'i' }
        });

        if (admins.length == 0) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        return res.send({ message: 'Usuario encontrado', admins });
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al buscar usuario'})
    }
}