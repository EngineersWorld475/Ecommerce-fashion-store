const express = require('express')
const mongoose = require('mongoose')
const cookieParser =  require('cookie-parser')
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/auth/auth-routes')


app.use(cookieParser())
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)

// creating a database connection
mongoose.connect(`mongodb+srv://imedward171:P7kNinWHyVmm3E4Z@e-cluster.jcjsy.mongodb.net/`).then(() => console.log('Database connected successfully...')).catch((error) => console.log(error))

const PORT = process.env.PORT || 5000;
 
app.use(cors({
    origin: `http://localhost:5173/`,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'  
    ],
    credentials: true
}))

app.listen(PORT, () => console.log(`Server is now running on port: ${PORT}`))