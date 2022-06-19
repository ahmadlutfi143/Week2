const express = require('express')

const router = express.Router()

const { addUser, getUsers, getUser, updateUser, deleteUser, getProfile } = require('../controllers/user')
const { getProduct, addProduct, getUserProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { getCategory, addCategory, getUserCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { register, login } = require('../controllers/auth')
const { addTransaction, getTransaction } = require('../controllers/transaction')
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

router.post('/user', addUser)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.post('/product', auth, uploadFile('image'), addProduct)
router.get('/products', getProduct)
router.get('/product/:id', getUserProduct)
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

router.post('/category', addCategory)
router.get('/categories', getCategory)
router.get('/category/:id', getUserCategory)
router.patch('/category/:id', updateCategory)
router.delete('/category/:id', deleteCategory)

router.post('/transaction', addTransaction)
router.get('/transactions', getTransaction)

router.post('/register', register)
router.post('/login', login)

router.get('/profile', getProfile)

module.exports = router