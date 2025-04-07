// backend/routes/productRoutes.js

import express from 'express';
import Product from '../models/Products.js';

const router = express.Router();

// Ruta POST: agregar producto
router.post('/add', async (req, res) => {
  try {
    const { title, description, image, price, discount,category } = req.body;

    if (!title || !description || !image || !price) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const newProduct = new Product({
      title,
      description,
      image,
      price,
      discount: discount || 0,
      category,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Producto agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// Ruta GET: obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta GET: obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
});


// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Agregar producto
router.post('/add', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Error al agregar producto' });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// Editar producto
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error al editar producto' });
  }
});

export default router;
