const axios = require('axios');
const URL =  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/`;

module.exports = {
  getProducts: (req, res) => {
    axios.get(`${URL}/products`)
    .then(response => {
      res.json(response.data);
      console.log('Successful getProducts call to the API');
    })
    .catch(error => {
      console.error('Error fetching products from API: ', error);
      res.status(500);
    });
  },

  getProductById: (req, res) => {
    const productId = req.params.product_id;
    axios.get(`${URL}/products/${productId}`)
      .then(response => {
        res.send(response.data);
        console.log(`Sucessfully fetched product data with ID ${productId}`);
      })
      .catch(error => {
        console.error(`Error fetching product with ID ${productId}`, error);
        res.status(500)
      });
  },

  getProductStylesById: (req, res) => {
    const productId = req.params.product_id;
    axios.get(`${URL}/products/${productId}/styles`)
      .then(response => {
        res.send(response.data);
        console.log(`Sucessfully fetched style data from product ID ${productId}`);
      })
      .catch(error => {
        console.error(`Error fetching style data with ID ${productId}`, error);
        res.status(500)
      });
  },

  getRelatedProductsById: (req, res) => {
    const productId = req.params.product_id;
    axios.get(`${URL}/products/${productId}/related`)
      .then(response => {
        res.send(response.data);
        console.log(`Sucessfully fetched related products from product ID ${productId}`);
      })
      .catch(error => {
        console.error(`Error fetching related products from ID ${productId}`, error);
        res.status(500)
      });
  },
};