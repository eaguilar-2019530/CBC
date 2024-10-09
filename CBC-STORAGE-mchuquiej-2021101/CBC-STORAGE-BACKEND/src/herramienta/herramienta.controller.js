import Herramienta from '../herramienta/herramienta.model.js';
import Categoria from '../categoria/categoria.model.js';
import Ubicacion from '../ubicacion/ubicacion.model.js';
import Prestamo from '../prestamo/prestamo.model.js'

function generarNumerosAleatorios() {
    let numeros = '';
    for (let i = 0; i < 8; i++) {
        numeros += Math.floor(Math.random() * 10); 
    }
    return numeros;
}


export const save = async (req, res) => {
    try {
        let data = req.body;
        
        const requiredFields = ['nombre', 'stock', 'marca', 'modelo', 'categoria', 'ubicacion']; 
                

        data.SKU="GT-"+generarNumerosAleatorios()

        for (let field of requiredFields) {
            if (!data[field]) {
                return res.status(400).send({ message: `El campo ${field} es obligatorio` });
            }
        }
        
        let existingHerramienta = await Herramienta.findOne({ SKU: data.SKU });
        if (existingHerramienta) {
            return res.status(400).send({ message: 'El SKU ya está en uso, por favor elija otro' });
        }

        let categoria = await Categoria.findOne({ _id: data.categoria });
        if (!categoria) return res.status(404).send({ message: 'Categoría no encontrada' });

        let ubicacion = await Ubicacion.findOne({ _id: data.ubicacion });
        if (!ubicacion) return res.status(404).send({ message: 'Ubicación no encontrada' });

        console.log(`Capacidad actual: ${ubicacion.capacidad}`);
        console.log(`Stock a agregar: ${data.stock}`);
        
        if (data.stock > ubicacion.capacidad) {
            return res.status(400).send({ message: `La ubicación solo tiene espacio para almacenar ${ubicacion.capacidad} herramientas` });
        }
        
        let nuevaCapacidad = ubicacion.capacidad - data.stock;
        
        let updatedUbicacion = await Ubicacion.findOneAndUpdate(
            { _id: data.ubicacion },
            { capacidad: nuevaCapacidad },
            { new: true } 
        );
        
        console.log(`Capacidad actualizada: ${updatedUbicacion.capacidad}`);

        if (!updatedUbicacion) return res.status(500).send({ message: 'Error al actualizar la capacidad de la ubicación' });
             
        let herramienta = new Herramienta(data);
        await herramienta.save();

        return res.send({ message: 'Herramienta agregada exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al agregar herramienta' });
    }
}




export const get=async(req,res)=>{
    try {
        let herramientas=await Herramienta.find()
        .populate('ubicacion', ['ubicacion'])
        .populate('categoria', ['categoria'])
        if(herramientas.length==0) return res.status(404).send({message: 'No hay herramientas que mostrar'})
        return res.send({herramientas})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al mostrar las herramientas'})
    }
}

export const update=async(req,res)=>{
    try {
        let {id}=req.params
        let data=req.body
        
        let updatedHerramienta=await Herramienta.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        .populate('ubicacion', ['ubicacion'])
        .populate('categoria', ['categoria'])
        if(!updatedHerramienta) return res.status(404).send({message: 'Herramienta no encontrada y/o no actualizada'})
        return res.send({message: 'Herramienta actualzada exitosamente', updatedHerramienta})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al actualizar herramienta'})
    }
}

export const deleteHerramienta = async (req, res) => {
    try {
        const { id } = req.params;

        let defaultCategory = await Categoria.findOne({ categoria: 'Default Category' });
         if (!defaultCategory) {
             defaultCategory = await Categoria.create({ categoria: 'Default Category'});
         }

         let defaultLocation = await Ubicacion.findOne({ ubicacion: 'Default Location' });
         if (!defaultLocation) {
            defaultLocation = await Ubicacion.create({ ubicacion: 'Default Location', capacidad: 0});
         }

        let defaultTool = await Herramienta.findOne({ nombre: 'Default Tool' });
         if (!defaultTool) {
            defaultTool = await Herramienta.create({ nombre: 'Default Tool', SKU: "Default", stock: 0, marca: "Default", modelo: "Default", categoria: defaultCategory._id, ubicacion: defaultLocation._id});
         }

         await Prestamo.updateMany({ herramienta: id }, { $set: { herramienta: defaultTool._id } });
        
        const herramienta = await Herramienta.findById(id).populate('ubicacion');
        if (!herramienta) {
            return res.status(404).send({ message: 'Herramienta no encontrada' });
        }

        const stock = herramienta.stock;
        const ubicacionId = herramienta.ubicacion._id;

        await Ubicacion.findByIdAndUpdate(
            ubicacionId,
            { $inc: { capacidad: stock } }, 
            { new: true }
        );
        
        await Herramienta.deleteOne({ _id: id });

        return res.send({ message: 'Herramienta eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar la herramienta' });
    }
}

export const search=async(req,res)=>{
    try {
        let {search}=req.body
        let herramientas = await Herramienta.find({
            nombre: { $regex: search, $options: 'i' }
        })
        .populate('ubicacion', ['ubicacion'])
        .populate('categoria', ['categoria'])

        if(herramientas.length==0) return res.status(404).send({message: 'No hay herramientas que mostrar'})
        return res.send({message: 'Herramientas encontradas', herramientas})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al buscar herramienta'})
    }
}

//PARA LA GRÁFICA
export const getHerramientasConDatos = async (req, res) => {
    try {
        let herramientas = await Herramienta.find();
        let prestamos = await Prestamo.find()
            .populate('herramienta', ['nombre']); 

        if (herramientas.length == 0) return res.status(404).send({ message: 'No hay herramientas que mostrar' });

        
        const prestamosCount = prestamos.reduce((acc, prestamo) => {
            const herramientaNombre = prestamo.herramienta.nombre;
            acc[herramientaNombre] = (acc[herramientaNombre] || 0) + prestamo.cantidadHerramientas;
            return acc;
        }, {});

        
        const chartData = herramientas.map(herramienta => {
            const nombre = herramienta.nombre;
            const cantidadPrestada = prestamosCount[nombre] || 0;
            const cantidadDisponible = herramienta.stock; 

            return {
                nombre: nombre,
                prestado: cantidadPrestada,
                disponible: cantidadDisponible
            };
        });

        return res.send({ chartData });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener los datos' });
    }
};