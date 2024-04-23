import('node-fetch').then(fetchModule => {
  const fetch = fetchModule.default;

  const express = require('express');
  const app = express();
  const cors = require("cors");
  const port = 3000;

  app.use(cors())
  
  app.get('/api/products', async (_, res) => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        res.status(200).json(data.products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
  });

  app.get('/api/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id);

    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await response.json();

      if (!data) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  app.get('/api/categories', async (_, res) => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'kminchelle',
          password: '0lelplR',
          expiresInMins: 30,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Failed to login' });
    }
  });

  app.get('/api/auth/user', async (req, res) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': req.headers.authorization,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get current logged user data');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Failed to get current logged user data' });
    }
  });

  app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to import node-fetch:', error);
});