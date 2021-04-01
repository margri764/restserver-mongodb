const Category = require ('../models/category');


const getCategory = async (req,res)=>{

    const { limite=5 , desde =0 }=req.query;

    const [ total, category] = await Promise.all([

        Category.countDocuments( {state:true}),
        Category.find( {state:true} )
            .populate('usuario','name')
            .skip( Number (desde))
            .limit( Number (limite))
    ])
   
    res.json({ 
        total,     
        category

    });
}

const getCategoryById = async ( req, res ) =>{
    
    const { id } = req.params;
    const category = await Category.findById( id ).populate ('usuario','name');
    res.json(category);
}



const createCategory =  async (req, res) => { 

    const name= req.body.name.toUpperCase();  
    
    const categoryDB = await Category.findOne({name});
    if(categoryDB){
        return res.status(400).json({
            msg:` La categoria ${categoryDB.name} ya existe `
        });
    }
    const data = {
        name,
        usuario: req.usuarioAuth._id
    }

    const categoria = new Category ( data );
    await categoria.save();

    res.status(201).json(categoria)
}
   
const updateCategory = async ( req, res )=>{

    const { id } = req.params;
    const { state, usuario, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.usuario = req.usuarioAuth._id;

    const category = await Category.findByIdAndUpdate ( id, data, {new: true} );

    res.json(category);

}

const deleteCategory = async ( req, res )=>{

    const { id } = req.params;
    const delCategory = await Category.findByIdAndUpdate( id, {state:false},{new:true});

    res.json(delCategory);

}

 


module.exports={
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
  
}
