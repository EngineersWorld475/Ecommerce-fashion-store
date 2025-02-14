const express = require('express')
const mongoose = require('mongoose')
const cookieParser =  require('cookie-parser')
const dotenv = require('dotenv');
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/auth/auth-routes')
const adminProductsRoutes = require('./routes/admin/product-routes')
const categoryRoutes = require('./routes/admin/category-routes')
const shopProductRoutes = require('./routes/shop/product-routes')
const cartRoutes = require('./routes/shop/cart-routes')
const addressRoutes = require('./routes/shop/address-routes')

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
app.use('/api/admin/products', adminProductsRoutes)
app.use('/api/admin/category', categoryRoutes)
app.use('/api/shop/products', shopProductRoutes)
app.use('/api/shop/cart', cartRoutes)
app.use('/api/shop/address', addressRoutes)

// creating a database connection
mongoose.connect(process.env.MONGO_URL).then(() => console.log('Database connected successfully...')).catch((error) => console.log(error))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is now running on port: ${PORT}`))