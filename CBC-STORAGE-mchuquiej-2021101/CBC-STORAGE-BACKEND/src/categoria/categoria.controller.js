'use strict'
import Categoria from './categoria.model.js'
import Herramienta from '../herramienta/herramienta.model.js'

export const save= async(req,res)=>{
    try {
        let data=req.body
        let categoriaEncontrada=await Categoria.find({categoria: data.categoria})
        if(categoriaEncontrada.length>0){
            return res.status(400).send({message: 'La categoría ya existe'})
        }

        const requiredFields = ['categoria']; 
                
        for (let field of requiredFields) {
            if (!data[field]) {
                return res.status(400).send({ message: `El campo ${field} es obligatorio` });
            }
        }

        let categoria=new Categoria(data)
        await categoria.save()
        return res.send({message: 'Categoría guardada exitosamente'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al guardar categoría'})
    }
}

export const get=async(req,res)=>{
    try {
        let categorias=await Categoria.find()
        if(categorias.length===0) return res.status(404).send({message: 'No hay categorías que mostrar'})
        return res.send({categorias})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al mostrar categorías'})
    }
}

export const update=async(req,res)=>{
    try {
        let {id}=req.params
        let data=req.body

        let categoriaEncontrada=await Categoria.find({categoria: data.categoria})
        if(categoriaEncontrada.length>0){
            return res.status(400).send({message: 'La categoría ya existe'})
        }

        let updatedCategoria=await Categoria.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )

        if(!updatedCategoria) res.status(404).send({message: 'Categoría no encontrada y no actualizada'})

        return res.send({message: 'Categoría actualizada correctamente', updatedCategoria})            
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al actualizar la categoría'})
    }
    
}

export const deleteCategoria=async(req,res)=>{
    try {
        let {id}=req.params
         
         let defaultCategory = await Categoria.findOne({ categoria: 'Default Category' });
         if (!defaultCategory) {
             defaultCategory = await Categoria.create({ categoria: 'Default Category'});
         }

         await Herramienta.updateMany({ categoria: id }, { $set: { categoria: defaultCategory._id } });

        let deletedCategoria=await Categoria.deleteOne({_id: id})

        if(deletedCategoria.deleteCount===0) return res.status(404).send({message: 'Categoría no encontrada y no eliminada'})

        return res.send({message: 'Categoría elminidada exitosamente'})            
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al eliminar la categoría'})
    }
}

export const search=async(req,res)=>{
    try {
        let {search}=req.body

        let categorias = await Categoria.find({
            categoria: { $regex: search, $options: 'i' }
        });

        if(categorias.length==0) return res.status(404).send({message: 'Categoría no encontrada'})
        return res.send({message: 'Categoría encontrada', categorias})     

    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al buscar categoría'})
    }
}
