document.addEventListener('DOMContentLoaded', async () => {
  const productDetailsContainer = document.getElementById('productDetails');

  // Check if the page is products.html to decide whether to fetch and display product details
  if (window.location.pathname.includes('products.html')) {
    await displayProductDetails();
  }

  const addProductForm = document.getElementById('addProductForm');
  const productList = document.getElementById('productList');

  addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addProductForm);
    const product = {};

    formData.forEach((value, key) => {
      product[key] = value;
    });

    if (validateProduct(product)) {
      try {
        await fetch('http://localhost:4000/addProduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        });

        // Redirect to the product details page after successfully adding the product
        window.location.href = 'products.html';
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please enter valid data for all fields.');
    }
  });

  async function displayProducts() {
    try {
      const response = await fetch('http://localhost:4000/getAllProducts');
      const products = await response.json();

      productList.innerHTML = '<h2>Product List</h2>';
      products.forEach(product => {
        productList.innerHTML += `<div>ID: ${product.id}, Name: ${product.name},description: ${product.description},Category:${product.category},Brand:${product.brand},Unit of measures :${product.unitOfMeasure},costPrice : ${product.costPrice},selling price: ${product.sellingPrice}</div>`;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function displayProductDetails() {
    try {
      const response = await fetch('http://localhost:4000/getAllProducts');
      const products = await response.json();
  
      productDetailsContainer.innerHTML = '<h2>Product Details</h2>';
      products.forEach(product => {
        productDetailsContainer.innerHTML += `
          <div>
            <strong>ID:</strong> ${product.id}, 
            <strong>Name:</strong> ${product.name}, 
            <strong>Description:</strong> ${product.description}, 
            <strong>Category:</strong> ${product.category}, 
            <strong>Brand:</strong> ${product.brand}, 
            <strong>Manufacturer:</strong> ${product.manufacturer}, 
            <strong>Unit of Measure:</strong> ${product.unitOfMeasure}, 
            <strong>Cost Price:</strong> ${product.costPrice}, 
            <strong>Selling Price:</strong> ${product.sellingPrice}
          </div>`;
      });
    } catch (error) {
      console.error(error);
    }
  }
  

  function validateProduct(product) {
    if (!isValidProductID(product.id) || !isValidProductName(product.name) || !isValidPrice(product.costPrice) || !isValidPrice(product.sellingPrice)) {
      return false;
    }
    return true;
  }

  function isValidProductID(id) {
    return Number.isInteger(Number(id)) && Number(id) > 0;
  }

  function isValidProductName(name) {
    return /^[a-zA-Z\s]+$/.test(name.trim());
  }

  function isValidPrice(price) {
    return !isNaN(parseFloat(price)) && parseFloat(price) >= 0;
  }

  // Initial display of products
  
});
