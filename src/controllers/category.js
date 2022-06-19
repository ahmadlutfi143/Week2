const { product, user, category, categoryProduct } = require('../../models')

exports.addCategory = async (req,res) =>{
    try {
        // const {category: categoryName, ...data} = req.body
        const data = await category.create({
            ...req.body,
        })

        res.send({
            status: 'success',
            data: {
                category: {
                    id: data.id,
                    name: data.name
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.getCategory = async (req,res) =>{
    try {
        const categories = await category.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"]
            }
        })

        res.send({
            status: 'success',
            data: {
                categories
            }
        })

    }catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUserCategory = async (req,res) =>{
    try {
        const id = req.params.id
        const data = await category.findOne({
            where: {
                id: id
            }
        })

        res.send({
            status: 'success',
            data: {
                category: {
                    id: data.id,
                    name: data.name
                }
            }
        })

    }catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateCategory = async (req,res) =>{
    try { 
        const { id } = req.params;
        const newData = req.body;
        const data = await category.findOne({
            where: {
                id
            }
        })

        if(!data){s
            return res.send({
                message: `User with Id: ${id} not found!`
            })
        }

        await category.update(newData, {
            where: {
                id: id
            }
        })
        
        res.send({
            status: 'success',
            data: {
                category: {
                    id: data.id,
                    name: data.name
                }
            }
        })

    }catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteCategory = async (req,res) =>{
    try {  
        const { id } = req.params;
        const data = await category.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send ({
                message: `User data with Id: ${id} not found`
            })
        }

        await category.destroy({
            where: {
                id
            }
        })
        
        res.send({
            status: 'success',
            data: {
                id: data.id
            }
        })

    }catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}