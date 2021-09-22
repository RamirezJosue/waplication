const { Schema, model } = require('mongoose');

const WhatsappSchema = Schema({
    codigo: { type: String },
    nombre: { type: String },
    supervisor: { type: String },
    bdr: { type: String },
    riesgo: { type: String },
    rechazo: { type: String },
    rmd: { type: String },
    cajas: { type: String },
    ruta: { type: String },
    motivo: { type: String },
    localidad: { type: String },
});

module.exports = model('Whatsapp', WhatsappSchema)