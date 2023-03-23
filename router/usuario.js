const { Router } = require ('express');
const router = Router();
const Usuario = require ('../models/Usuario');


//** Create user */
router.post ('/', async function(req, res) { 

    try{
        console.log('ObjetoREcibido ',req.body);

        const emailExists = await Usuario.findOne( {email: req.body.email} );
        if (emailExists) { return res.send('email already used!'); }

        let usuario = new Usuario();   // instace from the model
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();  
    
        res.send(usuario);
    }
    catch (error){
        console.log(error);
        res.send('Error!....')
    }
   
});

//** Geta all users  */
router.get ('/', async function(req, res) {
    try{
        const usuarios = await Usuario.find();
        res.send(usuarios);

    } catch (error) {
        console.log(error);
        res.send('GET error!');
    }

});

//** Update one user. Id email is the information to update it validates it's existence  */
router.put ('/:usuarioId', async function(req, res) {
    try{
        console.log('ObjetoRecibido ',req.body, req.params);

        ///*  Get ID form record in Mongo */
       let usuario = await Usuario.findById(req.params.usuarioId);
       if (!usuario) { return res.send('Usuario no Existe'); }
       
       ///*  Validate if new email exists*/   
       const emailExists = await Usuario.findOne( {email: req.body.email, _id: { $ne:usuario._id } });
       if (emailExists) {return  res.send('email already used!');}
       
        usuario.email = req.body.email;
        usuario.nombre = req.body.nombre;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();
  
        usuario = await usuario.save();  
    
        res.send(usuario);
  
    }
    catch (error){
        console.log(error);
        res.send('User do not exists!....')
    }
});




module.exports = router;