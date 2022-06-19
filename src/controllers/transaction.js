const { user, transaction, product } = require('../../models')

exports.getTransaction = async (req, res) => {
    try {
        const transactions = await transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt','status','idProduct','idBuyer','idSeller','price']
            },
            include: [
                {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idUser', 'qty', 'price']
                    }
                },
                {
                    model: user,
                    as: 'buyer',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status','image']
                    }
                },
                {
                    model: user,
                    as: 'seller',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status','image']
                    }
                },
            ]
        })

        res.send({
            status: 'success',
            data: {
                transactions
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.addTransaction = async (req, res) => {
    try {
        const data = await transaction.create({
            ...req.body,
        })

        res.send({
            status: 'success',
            data: {
                transaction: {
                    id: data.id,
                    idProduct: data.idProduct,
                    idBuyer: data.idBuyer,
                    idSeller: data.idSeller,
                    price: data.price
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}