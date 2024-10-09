//Importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import nodemailer from 'nodemailer'
import morgan from 'morgan'
import { config } from 'dotenv'
import empleadoRoutes from '../src/empleado/empleado.routes.js'
import categoriaRoutes from '../src/categoria/categoria.routes.js'
import ubicacionRoutes from '../src/ubicacion/ubicacion.routes.js'
import herramientaRoutes from '../src/herramienta/herramienta.routes.js'
import prestamoRoutes from '../src/prestamo/prestamo.routes.js'
import adminRoutes from '../src/admin/admin.routes.js'


//Configuraciones
const app = express() //Crear el servidor
config()
const port = process.env.PORT || 3200

//Configurar el servidor de express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) //Aceptar o denegar las solicitudes de diferentes orígenes (local, remoto) /políticas de acceso
app.use(helmet()) //Aplica capa de seguridad
app.use(morgan('dev')) //Crea logs de solicitudes al servidor HTTP

//Declaración de rutas
app.use(empleadoRoutes)
app.use(categoriaRoutes)
app.use(ubicacionRoutes)
app.use(herramientaRoutes)
app.use(prestamoRoutes)
app.use(adminRoutes)

app.post("/send-email", async (req, res) => {
    const { subject, to, nombres, apellidos, usuario, contrasena } = req.body; 

    const html = `
    <html>
    <head></head>
    <body>
        <h1 style="color: red; text-align: center;">CBC STORAGE</h1>
        <p style="text-align: center; text-transform: uppercase; color: darkgray;">
            Hola ${nombres} ${apellidos}
        </p>
        <p style="text-align: center; font-size: 1.3rem; color: gray;">
            ¡Nos alegra darte la bienvenida a CBC Storage! Estamos aquí para ayudarte a gestionar tus herramientas de manera segura y eficiente.
        </p>
        <div style="text-align: center;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_q3pieJBx7vQFb2rHYcilwa1_U7B3raDTkQ&s" alt="Imagen" style="width: 50%; border-radius: 9px;" />
        </div>
        <div style="background-color: #fff; padding: 24px 48px; margin: 24px auto; border-radius: 9px; max-width: 600px;">
            <p style="font-size: 1.2rem; font-weight: bold; text-align: center;">
                A continuación, te proporcionamos tus credenciales para acceder a tu cuenta:
            </p>
            <p style="text-align: center;">
                Usuario: ${usuario}
                <br>
                Contraseña: ${contrasena}
                <br>
                <br>
                Te recomendamos que cambies tu contraseña después de iniciar sesión por primera vez para garantizar la seguridad de tu cuenta.
                <br>
                Haz clic en el siguiente botón para acceder a tu cuenta:
            </p>
            <a href="http://localhost:5173/login" style="display: block; text-align: center; background: red; color: white; padding: 12px 16px; border-radius: 9px; margin: 20px auto; text-decoration: none;">
                Inicia Sesión en la aplicación
            </a>
        </div>
        <div style="background-color: #fff; margin: 0 auto; padding: 0 48px; border-radius: 9px; max-width: 600px; text-align: center; color: gray;">
            http://www.cbc.co, 43 calle 1-10, Zona 12, Monte María 1, Guatemala, Guatemala
        </div>
    </body>
</html>

    `;

    let transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "jamesbriansipacsipac@gmail.com",
            pass: "lxgv bdbk mijl cfdj",
        },
    });

    try {
        await transport.sendMail({
            from: "jamesbriansipacsipac@gmail.com",
            to, 
            subject,
            html,
        });

        res.status(200).send({ message: "Correo enviado con éxito" });
    } catch (error) {
        res.status(500).send({ message: "Error al enviar el correo", error });
    }
});

//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}