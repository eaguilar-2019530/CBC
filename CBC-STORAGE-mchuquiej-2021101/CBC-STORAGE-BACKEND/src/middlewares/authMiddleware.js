import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || '@CBC8d42e9d4f3a29b1e7cbd34f1d937fc8e3f6f86a@';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // `Bearer <token>`

    if (!token) {
        return res.status(401).send({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).send({ message: 'Token no válido' });
        }

        req.user = user; // Asegúrate de que el token tiene el campo `uid`
        next();
    });
};
