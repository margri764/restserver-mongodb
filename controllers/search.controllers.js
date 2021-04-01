
const { ObjectId } = require ('mongoose').Types;

const { Usuario, Product, Category} = require ('../models');

const trueColection =[
    'users',
    'roles',
    'products',
    'categories'

];

const searchUser = async ( termino ='', res) => {

    const isMongoId = ObjectId.isValid ( termino );
    
    if ( isMongoId ){
        const userId = await Usuario.findById( termino );
        return res.json({
            results: ( userId) ? [ userId ] : []
        })
    }

    const regex = new RegExp ( termino, 'i');

    const userName = await Usuario.find({
        $or: [ {name: regex},{email: regex} ],
        $and: [ { state:true} ]
    });

    return res.json({
        results: userName
    })
}

const searchCategory = async ( termino ='', res) => {

    const isMongoId = ObjectId.isValid ( termino );
    
    if ( isMongoId ){
        const category = await Category.findById( termino );
        return res.json({
            results: ( category) ? [ category ] : []
        })
    }

    const regex = new RegExp ( termino, 'i');

    const categoria = await Category.find({name: regex, state:true});
   

    return res.json({
        results: categoria
    })
}


const searchProducts = async ( termino ='', res) => {

    const isMongoId = ObjectId.isValid ( termino );
    
    if ( isMongoId ){
        const product = await Product.findById(termino).populate('category','name');
        return res.json({
            results: ( product) ? [ product ] : []
        })
    }

    const regex = new RegExp ( termino, 'i');

    const products = await Product.find({name: regex, state:true}).populate('category','name');

    return res.json({
        results: products
    })
}


const search = ( req, res) => {

    const { colection , termino } = req.params;
    
    if(!trueColection.includes(colection)){
        return res.status(400).json({
            msg: `las colecciones permitidas son ${trueColection}`
        })

    }

    switch (colection) {
        case 'users':
            searchUser(termino ,res);
            
            break;
          
        case 'products':
            searchProducts(termino, res);
            break;  

        case 'categories':
            searchCategory(termino, res);

            break;

        default:
            res.status(500).json({
                msg: "se le olvido hacer esta busueda" //es algo interno entre back y front
            });
    }


}


module.exports= {search};