const express = require ('express');
const { getConnection } = require ('./db/db-connection-mongo');
const cors = require('cors');

const app= express();
var port = process.env.PORT;


app.use(cors());
getConnection();

///** Middleware - Parse JSON */ 
app.use(express.json());


///*********************** Request */

app.use('/usuario', require('./router/usuario'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/marca', require('./router/marca'));
app.use('/inventario', require('./router/inventario'));


app.listen(port, () => {
    console.log(`Listening on por ${port}`);
});
