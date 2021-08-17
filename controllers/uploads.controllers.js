const path = require('path');
const fs   = require('fs');

const cloudinary= require ('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);


const { upFiles } = require("../helpers");
const { Usuario, Product} = require ('../models');




const uploadFiles = async ( req, res) => { //la hago async 
 

  try {

    const fullPath= await upFiles(req.files,'img'); 
  
    res.json({
      path: fullPath
    })
    
  } catch (msg) {
    res.status(400).json({msg});
  }
}



// const updateImage = async ( req, res) => {

//   const { colection, id} = req.params;

//   let models; 

//   switch ( colection ) {
//     case 'users': 
      
//     models = await Usuario.findById( id );  
//       if (!models){
//         return res.status(400).json ({
//           msg: `no existe un usuario con el id ${ id }`
//         });
//       }
      
//       break;

//       case 'products': //es el nombre de la coleccion q esta en MongoDB
      
//       models = await Product.findById( id ); //busca el id en la BD 
//         if (!models){
//           return res.status(400).json ({
//             msg: `no existe un producto con el id ${ id }`
//           });
//         }
        
//         break;  

  
//     default:
//       return res.status(500).json ({
//         msg: 'se me olvido validar esto'
//       });
//   }
//  //limpiar imagenes

//   if(models.img){

//     /*hay q birrar la imagen del servidor, armo el path completo con el nombre de la 
//     coleccion y el path de la img propiamente dicha ("models.img")*/ 
//     let pathImage = path.resolve( __dirname, '../uploads', colection, models.img );
//     if ( fs.existsSync( pathImage ) ) {
//       fs.unlinkSync( pathImage);
           
//     }
//   }

//   const fullPath= await upFiles(req.files, colection); 
//   models.img = fullPath;  
//   await models.save(); 
  
//   res.json(models);
  
// }

const updateImageCloudinary = async ( req, res) => {

  const { colection, id} = req.params;

  let models; 

  switch ( colection ) {
    case 'users': 
      
    models = await Usuario.findById( id );  
      if (!models){
        return res.status(400).json ({
          msg: `no existe un usuario con el id ${ id }`
        });
      }
      
      break;

      case 'products': //es el nombre de la coleccion q esta en MongoDB
      
      models = await Product.findById( id ); //busca el id en la BD 
        if (!models){
          return res.status(400).json ({
            msg: `no existe un producto con el id ${ id }`
          });
        }
        
        break;  

  
    default:
      return res.status(500).json ({
        msg: 'se me olvido validar esto'
      });
  }
 //limpiar imagenes

  if(models.img){
    const nameArr = models.img.split('/');
    const name = nameArr [ nameArr.length - 1 ];
    const [ public_id] = name.split('.');

    cloudinary.uploader.destroy( public_id );
  
  }

  const { tempFilePath } = req.files.archivo

  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
  models.img = secure_url;  
  await models.save(); 
  res.json( models );  
}



const showImage = async ( req, res) => {

  const { colection, id } = req.params;

  let models; 

  switch ( colection ) {
    case 'users': 
      
                models = await Usuario.findById( id );  
                  if (!models){
                    return res.status(400).json ({
                      msg: `no existe un usuario con el id ${ id }`
                    });
                  }
      
      break;

      case 'products': //es el nombre de la coleccion q esta en MongoDB
      
                models = await Product.findById( id ); //busca el id en la BD 
                  if (!models){
                    return res.status(400).json ({
                      msg: `no existe un producto con el id ${ id }`
                    });
                  }
        
        break;  
  
    default:
      return res.status(500).json ({
        msg: 'se me olvido validar esto'
      });
  }


  if(models.img){

    const pathImage = path.resolve( __dirname, '../uploads', colection, models.img );
 

    if (fs.existsSync (pathImage) ) {
   
      return res.sendFile( pathImage )
    } 
     

  }
  const pathNoImage = path.join( __dirname, '../assets/no-image.jpg' );


  res.sendFile( pathNoImage );

}



module.exports= { uploadFiles, updateImageCloudinary, showImage };