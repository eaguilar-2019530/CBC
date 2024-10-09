'use strict'
import Prestamo from '../prestamo/prestamo.model.js'
import Herramienta from '../herramienta/herramienta.model.js'
import Empleado from '../empleado/empleado.model.js'
import Ubicacion from '../ubicacion/ubicacion.model.js'

export const save = async (req, res) => {
    try {
        let data = req.body;

        const requiredFields = ['herramienta', 'cantidadHerramientas', 'empleado']; 
                
        for (let field of requiredFields) {
            if (!data[field]) {
                return res.status(400).send({ message: `El campo ${field} es obligatorio` });
            }
        }
       
        let herramienta = await Herramienta.findOne({ _id: data.herramienta });
        if (!herramienta) return res.status(404).send({ message: 'Herramienta no existente' });

        let empleado = await Empleado.findOne({ _id: data.empleado });
        if (!empleado) return res.status(404).send({ message: 'Empleado no existente' });

        let ubicacion=await Ubicacion.findOne({_id: herramienta.ubicacion})
        if(!ubicacion) return res.status(400).send({message: 'Ubicacion no existente'})
        
        console.log(ubicacion)
        
        data.fechaPrestamo = new Date();
        data.estado='NO DEVUELTO'

        if(data.cantidadHerramientas>herramienta.stock){
            return res.status(400).send({message: 'No hay stock suficiente'})
        }

        let nuevoStock=herramienta.stock-data.cantidadHerramientas  
        let updatedHerramienta=await Herramienta.findOneAndUpdate(
            {_id: data.herramienta},
            {stock: nuevoStock},
            {new: true}
        )

        if(!updatedHerramienta) return res.status(500).send({message: 'Error al actualizar stock de herramientas'})

        let nuevaCapacidad=Number(ubicacion.capacidad)+Number(data.cantidadHerramientas)

        console.log(nuevaCapacidad)
        let updatedUbicacion=await Ubicacion.findOneAndUpdate(
            {_id: herramienta.ubicacion},
            {capacidad: nuevaCapacidad},
            {new: true}
        )

        if(!updatedUbicacion) return res.status(500).send({message: 'Error al actualizar la capacidad de ubicación'})


        let prestamo = new Prestamo(data);
        await prestamo.save();

        return res.send({ message: 'Préstamo guardado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al agregar préstamo' });
    }
};

export const get=async(req,res)=>{
    try {
        let prestamos=await Prestamo.find()
        .populate('herramienta',['nombre'])
        .populate('empleado',['nombres'])
        if(prestamos.length==0) return res.status(404).send({message: 'No hay préstamos que mostrar'})
        return res.send({prestamos})

        
    } catch (error) {
        console.error(error)
        return res.stats(500).send({message: 'Error al obtener préstamos'})
    }
}



export const update=async(req,res)=>{
    try {
        let {id}=req.params
        let data=req.body

        data.estado='DEVUELTO'
        data.fechaDevolucion=new Date()
        

        let updatedPrestamo=await Prestamo.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        .populate('herramienta',['nombre'])
        .populate('empleado',['nombres'])

        if(!updatedPrestamo) return res.status(404).send({message: 'Préstamo no encontrado y/o no actualizado'})
        return res.send({message: 'Préstamo actualizado exitosamente',updatedPrestamo})            
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al actualizar préstamo'})
    }
}

export const deletePrestamo=async(req,res)=>{
    try {
        let {id}=req.params
        let prestamo=await Prestamo.findOne({_id: id})
        if(!prestamo) return res.status(404).send({message: 'Préstamo no encontrado'})
        let herramienta=await Herramienta.findOne({_id: prestamo.herramienta})
        if(!herramienta) return res.status(404).send({message: 'Herramienta no encontrada'})
        let ubicacion=await Ubicacion.findOne({_id: herramienta.ubicacion})
        if(!ubicacion) return res.status(404).send({message: 'Ubicación no encontrada'})

        let nuevoStock=Number(herramienta.stock)+Number(prestamo.cantidadHerramientas)
        let updatedHerramienta=await Herramienta.findOneAndUpdate(
            {_id: prestamo.herramienta},
            {stock: nuevoStock},
            {new: true}
        )
        if(!updatedHerramienta) return res.status(500).send({message: 'Error al actualizar stock de Herramienta'})
        
        let nuevaCapacidad=Number(ubicacion.capacidad)-Number(prestamo.cantidadHerramientas)
        let updatedUbicacion=await Ubicacion.findOneAndUpdate(
            {_id: herramienta.ubicacion},
            {capacidad: nuevaCapacidad},
            {new: true}
        )
        if(!updatedUbicacion) return res.status(500).send({message: 'Error al actualizar capacidad de Ubicación'})
        
        let deletedPrestamo=await Prestamo.deleteOne({_id: id})
        if(deletedPrestamo.deleteCount==0) return res.status(404).send({message: 'Prestamo no encontrado y/o no eliminado'})
        return res.send({message: 'El préstamo se eliminó exitosamente'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al eliminar préstamo'})
    }
}
