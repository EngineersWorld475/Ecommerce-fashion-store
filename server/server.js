const express = require('express')
const mongoose = require('mongoose')
const cookieParser =  require('cookie-parser')
const dotenv = require('dotenv');
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/product-routes')

dotenv.config();

app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma" 
    ],
    credentials: true
}))

// routes
app.use('/api/auth', authRoutes)
app.use('/api/admin/products', adminProductsRouter)

// creating a database connection
mongoose.connect(process.env.MONGO_URL).then(() => console.log('Database connected successfully...')).catch((error) => console.log(error))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is now running on port: ${PORT}`))