
const jwt = require ('jsonwebtoken');
const Usuario = require ('../models/usuario');


const checkToken = async ( req , res, next)=>{

    const token = req.header ( 'x-token' ); 

    if(!token){ 
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        });
    }

    try {

               
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
       
        const usuarioAuth = await Usuario.findById( uid );

        if(!usuarioAuth){
            return res.status(401).json({
                msg:'Token no valido - Usuario no existe en DB'
            })
        }

        if(!usuarioAuth.state){
            return res.status(401).json({
                msg:'Token no valido - usuario con state en false'
            })
        }

        req.usuarioAuth= usuarioAuth;

        next(); 

    } catch (error) {
        return res.status(401).json({ 
            msg: 'token no valido'
    })




 }
}

module.exports=checkToken;