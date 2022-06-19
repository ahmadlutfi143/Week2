// import model here
const { user } = require('../../models')

// import package here
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  // name, email, password

  const schema = joi.object({
    email: joi.string().email().min(6).required(),
    password: joi.string().min(4).required(),
    name: joi.string().min(3).required()
  })

  const { error } = schema.validate(req.body);

  if(error)
    return res.status(400).send({
      error: {
        message: error.details[0].message
      }
    })

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    const data = {
      id: newUser.id
    }

    const token = jwt.sign(data, 'IniPrivateKeyBatch35')

    res.status(200).send({
        status: "success",
        data: {
          user: {
            name: newUser.name,
            email: newUser.email,
            token
          }
        }
    })
    
    } catch (error) {
        console.log(error);
        res.status(500).send({
        status: 'Failed',
        message: 'Server Error'
        })
    }
};

exports.login = async (req, res) => {

  const schema = joi.object({
    email: joi.string().email().min(6).required(),
    password: joi.string().min(6).required()
  })

  const { error } = schema.validate(req.body);

  if(error)
    return res.status(400).send ({
      error: {
        message: error.details[0].message
      }
    })
  

  try {
    const userExist = await user.findOne({
        where: {
            email: req.body.email
        },
        atributes: {
            exclude: ["createdAt", "updateAt"]
        }
    })

  
  const isValid = await bcrypt.compare(req.body.password, userExist.password)

  if(!isValid){
    return res.status(400).send({
        status: "failed",
        message: "credential is invalid"
    })
  }

  const data = {
    id: userExist.id
  }

  const token = jwt.sign(data, 'IniPrivateKeyBatch35')

  res.status(200).send({
    status: "success",
    data: {
      user: {
        name: userExist.name,
        email: userExist.email,
        status: userExist.status,
        token
      }
    }
  })
  
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server Error'
    })
  }
};