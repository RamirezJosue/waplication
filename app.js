const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const venom = require('venom-bot');
const Whatsapp = require('./models/whatsapp');
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

let client;

venom
  .create()
  .then((res) => client = res)
  .catch((erro) => {
    console.log(erro);
  });

const sendMessagePost = async (req, res) => {
  console.log(req.body);
  const { 
    codigo, nombre, supervisor, bdr, riesgo, rechazo, rmd,cajas,ruta,
    motivo,
    localidad,
    number
   } = req.body;
  const data = new Whatsapp(req.body);
  const message = `*Codigo:* ${codigo} 
*Nombre:* ${nombre}
*Supervisor:* ${supervisor}
*BDR:* ${bdr}
*Riesgo:* ${riesgo}
*Rechazo:* ${rechazo}
*RMD:* ${rmd}
*Cajas:* ${cajas}
*Ruta:* ${ruta}
*motivo:* ${motivo}
*localidad:* ${localidad}
`
  try {
    await client
      .sendText(`${number}@c.us`, message)
      .then((result) => {
        console.log('Result: ', result);
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro);
      });
    await data.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
  // const { message, number } = req.body
  // console.log(message, number);
  // res.send({ status: 'Enviado!' })
  // client
  //   .sendText(`${number}@c.us`, message)
  //   .then((result) => {
  //     console.log('Result: ', result);
  //   })
  //   .catch((erro) => {
  //     console.error('Error when sending: ', erro);
  //   });
}



mongoose.connect('mongodb://localhost:27017/whatsapp', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to DB");
  }
});

app.post('/send', sendMessagePost);


app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
})





