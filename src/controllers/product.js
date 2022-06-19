const { product, user, profile, category, categoryProduct } = require('../../models')

exports.getProduct = async (req,res) =>{
    try {
        const products = await product.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"]
            }
        })

        res.send({
            status: 'success',
            data: {
                products
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

exports.getUserProduct = async (req,res) =>{
    try {
        const id = req.params.id
        const data = await product.findOne({
            where: {
                id: id
            }
        })

        res.send({
            status: 'success',
            data: {
                product: {
                    id: data.id,
                    image: data.image,
                    title: data.title,
                    desc: data.desc,
                    price: data.price,
                    qty: data.qty
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

exports.addProduct = async (req,res) =>{
    try {
        // const {category: categoryName, ...data} = req.body
        const data = await product.create({
            ...req.body,
            image: req.file.filename,
            idUser: req.user.id,
        })

        const users = await user.findOne({
            include: {
                model: profile,
                as: "profile",
                attributes: {
                    exclude: ["createdAt", "updateAt", "idUser"]
                }
            }
        })

        res.send({
            status: 'success',
            data: {
                product: {
                    id: data.id,
                    image: data.image,
                    title: data.title,
                    desc: data.desc,
                    price: data.price,
                    qty: data.qty,
                    user: {
                        id: data.idUser,
                    }
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

exports.updateProduct = async (req,res) =>{
    try {  
        const { id } = req.params;
        const newData = req.body;
        const data = await product.findOne({
            where: {
                id
            }
        })

        if(!data){s
            return res.send({
                message: `User with Id: ${id} not found!`
            })
        }

        await product.update(newData, {
            where: {
                id: id
            }
        })
        
        res.send({
            status: 'success',
            data: {
                product: {
                    id: data.id,
                    image: data.image,
                    title: data.title,
                    desc: data.desc,
                    price: data.price,
                    qty: data.qty
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

exports.deleteProduct = async (req,res) =>{
    try {  
        const { id } = req.params;
        const data = await product.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send ({
                message: `User data with Id: ${id} not found`
            })
        }

        await product.destroy({
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