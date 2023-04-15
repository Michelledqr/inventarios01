const {Router} = require ('express');
const Inventario = require('../models/Inventario');
const router = Router();


/** Get all Inventory  */
router.get ('/', async function(req, res) {
    try{
        const inventario = await Inventario.find().populate([
            { path: 'usuario', select: 'nombre email estado'},
            { path: 'marca', select: 'nombre estado'},
            { path: 'tipoEquipo', select:'nombre estado'},
            { path: 'estadoEquipo', select: 'nombre estado'}
        ]);
        res.send(inventario);

    } catch (error) {
        console.log(error);
        res.send('Inventario - GET error!');
    }

});

router.get ('/:inventarioId', async function (req, res) {
    try{
        const idRequest = req.params.inventarioId;
        const item = await Inventario.findById(idRequest);
        if(!item) {
            return res.status(404).send('Item no se encontró');
        }
        res.send(item);
    }catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error consultando item de inventario');     
    }
});


//** POST - Set up  inventory Item   */
router.post ('/', async function(req, res) {
    try{
        console.log(req.body);
        const existeSerial = await Inventario.findOne( { serial: req.body.serial});
        if(existeSerial) { return res.send('Numero Serial ya está registrado').status(400);}
        
        let inventario = new Inventario();

        inventario.serial               = req.body.serial;
        inventario.modelo               = req.body.modelo;
        inventario.descripcion          = req.body.descripcion;
        inventario.color                = req.body.color;
        inventario.imagen               = req.body.imagen;
        inventario.fechaCompra          = req.body.fechaCompra;
        inventario.precio               = req.body.precio;
        inventario.usuario              = req.body.marca._id;
        inventario.marca                = req.body.marca._id;
        inventario.tipoEquipo           = req.body.tipoEquipo._id;
        inventario.estadoEquipo         = req.body.estadoEquipo._id;
        inventario.fechaCreacion        = new Date();
        inventario.fechaActualizacion   = new Date();
        
        inventario = await inventario.save();

        res.send(inventario);

    } catch (error) {
        console.log(error);
        res.send('Inventario - POST error!').status(500);
    }

});


router.put ('/:inventarioId', async function(req, res) {
    try{
        console.log(req.body);
        let inventario = await Inventario.findById(req.params.inventarioId);
        if(!inventario) { return res.send('InventarioID no existe').status(400);}

        let existeSerial = await Inventario.findOne({serial: req.body.serial, _id: {$ne: inventario._id }});
        if (existeSerial) { return res.send('Serial ya registrado').status(400);}

        inventario.serial               = req.body.serial;
        inventario.modelo               = req.body.modelo;
        inventario.descripcion          = req.body.descripcion;
        inventario.color                = req.body.color;
        inventario.imagen               = req.body.imagen;
        inventario.fechaCompra          = req.body.fechaCompra;
        inventario.precio               = req.body.precio;
        inventario.usuario              = req.body.usuario._id;
        inventario.marca                = req.body.marca._id;
        inventario.tipoEquipo           = req.body.tipoEquipo._id;
        inventario.estadoEquipo         = req.body.estadoEquipo._id;
        inventario.fechaActualizacion   = new Date();
        inventario = await inventario.save();

        res.send(inventario);

    } catch (error) {
        console.log(error);
        res.send('Inventario - PUT error!').status(500);
    }

});



module.exports = router;