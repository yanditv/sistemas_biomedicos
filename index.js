const express = require('express');
const cors = require('cors'); // Importar CORS
const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());

// Variables para mantener los últimos valores generados
let lastEcg = 85; // Valor inicial razonable para ECG
let lastBpm = 75; // Valor inicial razonable para BPM
let lastLatitude = -2.900556; // Latitud inicial en decimal (2°54'02.0"S)
let lastLongitude = -79.000083; // Longitud inicial en decimal (79°00'00.3"W)
let lastSpeed = 0.0; // Velocidad inicial en km/h
let lastSatellites = 6; // Número inicial de satélites visibles

// Función para generar datos simulados de manera suave
const generateEcgData = () => {
    // Variar ligeramente ECG y BPM
    lastEcg += Math.random() * 2 - 1; // Variación entre -1 y +1
    lastEcg = Math.max(70, Math.min(100, lastEcg)); // Limitar entre 70 y 100

    lastBpm += Math.random() * 2 - 1; // Variación entre -1 y +1
    lastBpm = Math.max(60, Math.min(100, lastBpm)); // Limitar entre 60 y 100

    // Variar ligeramente latitud y longitud
    lastLatitude += Math.random() * 0.00002 - 0.00001; // Variación muy pequeña
    lastLongitude += Math.random() * 0.00002 - 0.00001; // Variación muy pequeña

    // Velocidad será 0.00 ya que el dispositivo está en el mismo lugar
    lastSpeed = 0.0;

    // Simular número de satélites visibles (puede variar ligeramente)
    lastSatellites += Math.random() * 2 - 1; // Variación entre -1 y +1
    lastSatellites = Math.max(0, Math.min(12, Math.round(lastSatellites))); // Limitar entre 0 y 12

    return {
        ecg: parseFloat(lastEcg.toFixed(2)), // Valor formateado con 2 decimales
        bpm: Math.round(lastBpm), // Valor redondeado
        latitud: parseFloat(lastLatitude.toFixed(6)), // Latitud con 6 decimales
        longitud: parseFloat(lastLongitude.toFixed(6)), // Longitud con 6 decimales
        velocidad: parseFloat(lastSpeed.toFixed(2)), // Velocidad formateada con 2 decimales
        satelites: lastSatellites, // Número entero de satélites
    };
};

// Endpoint para obtener los datos simulados
app.get('/data', (req, res) => {
    const data = generateEcgData();
    res.json(data);
});

// Servidor escuchando
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
