'use strict'

import Ubicacion from './ubicacion.model.js'
import Herramienta from '../herramienta/herramienta.model.js'

export const save=async(req, res)=>{
    try {
        let data=req.body
        let ubicacion=new Ubicacion(data)

        let ubicacionEncontrada=await Ubicacion.find({
            ubicacion: data.ubicacion
        })

        if(ubicacionEncontrada.length>0){
            return res.status(400).send({message: 'La ubicación ya existe'})
        }

        const requiredFields = ['ubicacion', 'capacidad']; 
                
        for (let field of requiredFields) {
            if (!data[field]) {
                return res.status(400).send({ message: `El campo ${field} es obligatorio` });
            }
        }

        await ubicacion.save()
        return res.send({message: 'Ubicación guardada exitosamente'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al agregar ubicación'})
    }
}

export const get=async(req,res)=>{
    try {
        let ubicaciones=await Ubicacion.find()
        if(ubicaciones.length==0) return res.status(404).send({message: 'No hay ubicaciones que mostrar'})
        return res.send({ubicaciones})            
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al mostrar ubicaciones'})
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        
        if (!id || !data) {
            return res.status(400).send({ message: 'ID y datos son requeridos' });
        }

        const ubicacionActual = await Ubicacion.findById(id);
        if (!ubicacionActual) {
            return res.status(404).send({ message: 'Ubicación no encontrada' });
        }

        if (data.ubicacion && data.ubicacion !== ubicacionActual.ubicacion) {
            const ubicacionEncontrada = await Ubicacion.findOne({ ubicacion: data.ubicacion });
            if (ubicacionEncontrada) {
                return res.status(400).send({ message: 'La ubicación ya existe' });
            }
        }

        const updatedUbicacion = await Ubicacion.findByIdAndUpdate(
            id,
            { $set: data },  
            { new: true, runValidators: true }
        );

        if (!updatedUbicacion) {
            return res.status(404).send({ message: 'Ubicación no encontrada y no actualizada' });
        }

        return res.send({ message: 'Ubicación actualizada exitosamente', updatedUbicacion });

    } catch (error) {
        console.error('Error en la actualización de ubicación:', error);
        return res.status(500).send({ message: 'Error al actualizar ubicación', error });
    }
};


export const deleteUbicacion=async(req,res)=>{
    try {
        let {id}=req.params

        let defaultLocation = await Ubicacion.findOne({ ubicacion: 'Default Location' });
         if (!defaultLocation) {
            defaultLocation = await Ubicacion.create({ ubicacion: 'Default Location', capacidad: 0});
         }

         await Herramienta.updateMany({ ubicacion: id }, { $set: { ubicacion: defaultLocation._id } });

        let deletedUbicacion=await Ubicacion.deleteOne({_id: id})
        if(deletedUbicacion.deleteCount==0) return res.status(404).send({message: 'Ubicación no encontrada y no eliminada'})
        return res.send({message: 'Ubicación eliminada exitosamente'})            
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al eliminar ubicación'})
    }
}

export const search=async(req,res)=>{
    try {
        let {search}=req.body
        let ubicaciones = await Ubicacion.find({
            ubicacion: { $regex: search, $options: 'i' }
        });
        if(ubicaciones.length==0) return res.status(404).send({message: 'No hay ubicaciones que mostrar'})
        return res.send({message: 'Ubicaciones encontradas', ubicaciones})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al buscar ubicación'})
    }
}
