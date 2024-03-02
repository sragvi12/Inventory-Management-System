const express = require('express'); 
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 4000;

// Connect to MongoDB
/*mongoose.connect('mongodb://localhost:27017/inventory', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Schema for Product
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  category: String,
  brand: String,
  manufacturer: String,
  unitOfMeasure: String,
  costPrice: Number,
  sellingPrice: Number
});

const Product = mongoose.model('Product', productSchema);*/


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/products';
 
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  // Once connected, you can start querying and displaying data from MongoDB
  Product.find({})
    .then(products => {
      console.log('Products:', products);
    })
    .catch(err => {
      console.error('Error fetching products:', err);
    });
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
 
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  category: String,
  brand: String,
  manufacturer: String,
  unitOfMeasure: String,
  costPrice: Number,
  sellingPrice: Number
});

const Product = mongoose.model('Product', productSchema);

// Middleware for JSON parsing
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

// Route to add product
app.post('/addProduct', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get all products
app.get('/getAllProducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));


