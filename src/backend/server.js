const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/food', async (req, res) => {
  try {
    const foodName = req.query.name;
    const response = await axios.get(`http://localhost:5000/food?name=${foodName}`);

    const nutrientInfo = response.data;
    res.json(nutrientInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});