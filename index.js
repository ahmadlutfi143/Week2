require('dotenv').config()

const express = require('express')

const router = require('./src/routes')

const app = express()

const PORT = 5000;

app.use(express.json())

app.get('/', (req,res) =>{
    res.send("Halaman Utama")
})

app.use('/api/v1/', router)

app.use('/uploads', express.static('uploads'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))