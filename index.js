const express = require('express');
const cors = require('cors'); // Importar CORS
const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());

// Función para generar datos simulados
const generateEcgData = () => {
    return {
        ecg: parseFloat((Math.random() * (400 - 300) + 300).toFixed(2)), // Valores típicos de ECG
        bpm: Math.floor(Math.random() * (180 - 60) + 60), // Latidos por minuto
    };
};

// Endpoint para obtener los datos simulados
app.get('/simulate', (req, res) => {
    const data = generateEcgData();
    res.json(data);
});

// Servidor escuchando
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
