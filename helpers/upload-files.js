const { v4: uuidv4 } = require('uuid');

const path = require ('path');

const upFiles = (archives , file='') =>{ 

    return new Promise ( ( resolve, reject ) => { 
    

        const { archivo } = archives; 
        const sliceName = archivo.name.split('.');
        const extension = sliceName[sliceName.length-1];

        const validExtension = [ 'png', 'jpg', 'jpeg','txt',];
        if(!validExtension.includes(extension)){

            return reject (`la extension no esta permitida, solo archivos ${validExtension}`)
        }


        const newName = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', file , newName);

        archivo.mv(uploadPath, (err) => { 
        if (err) {
            return reject (err);

        }

        resolve( uploadPath );
        }) 



    });

        
}




module.exports ={ upFiles}