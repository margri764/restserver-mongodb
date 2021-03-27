const jwt = require ('jsonwebtoken');

const generarJWT = ( uid ) =>{ 

    return new Promise( (resolve, reject) =>{

        const payload = { uid }; 

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{ 

            expiresIn:'500h' 

        }, (err,token)=>{ 
            if(err){
                console.log(err);
                reject( 'no se pudo generar el JWT')
            }else{
                resolve ( token );
         }
        })

    })


}

module.exports= { generarJWT };