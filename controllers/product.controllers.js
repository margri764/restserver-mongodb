
const Product = require ('../models/product');


const getProduct = async (req,res)=>{

    const { limite=5 , desde =0 }=req.query;

    const [ total, product] = await Promise.all([

        Product.countDocuments( {state:true}),
        Product.find( {state:true} )
            .populate('usuario','name')
            .populate('category','name')
            .skip( Number (desde))
            .limit( Number (limite))
    ])
   
    res.json({ 
        total,     
        product

    });
}

const getProductById = async ( req, res ) =>{
    
    const { id } = req.params;
    const product = await Product.findById( id ).populate ('usuario','name')
                                                .populate ('category','name');
    res.json(product);
}



const createProduct =  async (req, res) => { 

    const {state, usuario, ...body}= req.body;  
    
    const productDB = await Product.findOne({name:body.name}); //no me deja solo name
    if(productDB){
        return res.status(400).json({
            msg:` El producto ${productDB.name} ya existe `
        });
    }
    const data = {
        ...body,    //voy a mandar todo lo demas
        name:body.name.toUpperCase(),   //lo coloco asi para poder capitalizar a mayuscula
        usuario: req.usuarioAuth._id
    }

    const product = new Product ( data );
    await product.save();

    res.status(201).json(product)
}
   
const updateProduct = async ( req, res )=>{

    const { id } = req.params;
    const { state, usuario, ...data} = req.body;

    if(data.name){ //si viene el nombre q lo pase a mayusculas sino q no lo sobreescriba

    data.name = data.name.toUpperCase();
    }

    data.usuario = req.usuarioAuth._id;

    const product = await Product.findByIdAndUpdate ( id, data, {new: true} );

    res.json(product);

}

const deleteProduct = async ( req, res )=>{

    const { id } = req.params;
    const delProduct = await Product.findByIdAndUpdate( id, {state:false},{new:true});

    res.json(delProduct);

}

 


module.exports={
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
  
}
