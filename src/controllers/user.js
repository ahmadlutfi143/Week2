const { user, profile } = require('../../models')

exports.addUser = async (req,res) =>{
    try {
        const data = await user.create(req.body)

        res.send({
            status: 'success',
            message: 'Add User Finished',
            data
        })

    }catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUsers = async (req,res) =>{
    try {        
        const users = await user.findAll({
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
            users
        })

    }catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUser = async (req,res) =>{
    try {
        const id = req.params.id
        const data = await user.findOne({
            where: {
                id: id
            }
        })

        res.send({
            status: 'success',
            data
        })

    }catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getProfile = async (req,res) =>{
    try {
        const { id } = req.params
        const data = await profile.findAll({
            include: {
                model: user,
                as: 'user'
            }
        })

        res.send({
            status: 'success',
            data
        })

    }catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateUser = async (req,res) =>{
    try { 
        const { id } = req.params;
        const newData = req.body;
        const data = await user.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send({
                message: `User with Id: ${id} not found!`
            })
        }

        await user.update(newData, {
            where: {
                id: id
            }
        })
        
        res.send({
            status: 'success',
            message: `Update User Data with Id: ${id} finished`
        })

    }catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async (req,res) =>{
    try {  
        const { id } = req.params;
        const data = await user.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send ({
                message: `User data with Id: ${id} not found`
            })
        }

        await user.destroy({
            where: {
                id
            }
        })
        
        res.send({
            status: 'success',
            message: `Delete user with id: ${id} finished`
        })

    }catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}