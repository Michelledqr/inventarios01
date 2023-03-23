const { Router } = require ('express');
const Marca = require('../models/Marca');
const router = Router();


//** Create MARCA */
router.post ('/', async function(req, res) { 

    try{
        console.log('ObjetoRecibido ',req.body);

        const marcaExists = await Marca.findOne( {nombre: req.body.nombre} );
        if (marcaExists) { return res.send('MARCA already used!'); }

        let marca = new Marca();   // instace from the model
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();  
    
        res.send(marca);
    }
    catch (error){
        console.log(error);
        res.send('Marca Error!....')
    }
   
});

//** Get all MARCA  */
router.get ('/', async function(req, res) {
    try{
        const marcas = await Marca.find();
        res.send(marcas);

    } catch (error) {
        console.log(error);
        res.send('MARCA - GET error!');
    }

});

//** Update one Marca. - Validation of existence by name*/
router.put ('/:marcaId', async function(req, res) {
    try{
        console.log('ObjetoRecibido ',req.body, req.params);

        //* Get ID form records in Mongo */
       let marca = await Marca.findById(req.params.marcaId);
       if (!marca) { return res.send('Marca do not exists!');}


        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();
      
        marca = await marca.save(); 
        res.send(marca);
  
    }
    catch (error){
        console.log(error);
        res.send('Marca do not exists!');
    }
});

module.exports = router;