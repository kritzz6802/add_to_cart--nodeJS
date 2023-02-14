const fs = require('fs');
const path = require('path');

exports.getCartDetailsFromFile = (callBack) => {
    const cartPath = path.join(__dirname, '../data', 'cart.json');
    fs.readFile(cartPath, (error, cartContent) => {
      let cart = { products: [] };
      //if cart data exists
      if (!error) {
        cart = JSON.parse(cartContent);
      }

      return callBack(cart);
    });
  };

exports.addProductToCart = (productId, productPrice) => {
    const cartPath = path.join(__dirname, '../data', 'cart.json');
    this.getCartDetailsFromFile((cart) => {
      // let cart = { products: [], totalPrice: 0 };
      //   if (!err) {
      //       cart = JSON.parse(cartContent);
      //   }
        let existingProductIndex = cart.products.findIndex((prod) => prod.id.toString() === productId)
        let updatedProduct;
        if (existingProductIndex !== -1) {
            updatedProduct = { ...cart.products[existingProductIndex] };
            updatedProduct.quantity += 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        } else {
            updatedProduct = { id: productId, quantity: 1 };
            cart.products = [...cart.products, updatedProduct];
        }
        // cart.totalPrice += +productPrice;
        fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
            // console.log(err)
        });
    })
    // fs.readFile(cartPath, (err, cartContent) => {

    // });
    // this.getCartDetailsFromFile((cart) => {
    //     let existingProductIndex = cart.products.findIndex((prod) => prod.id.toString() === productId);
    //     let updatedProduct;

    //     if (existingProductIndex !== -1) {
    //       updatedProduct = { ...cart.products[existingProductIndex] };
    //       updatedProduct.quantity += 1;
    //       cart.products = [...cart.products];
    //       cart.products[existingProductIndex] = updatedProduct;
    //     } else {
    //       updatedProduct = { id: productId, quantity: 1 };
    //       cart.products = [...cart.products, updatedProduct];
    //     }

    //     fs.writeFile(cartPath, JSON.stringify(cart), (error) => {
    //       // console.log(error);
    //     });
    //   });
}

exports.deleteProductFromCart = (productId, callBack = '') => {
    const cartPath = path.join(__dirname, '../data', 'cart.json');
    this.getCartDetailsFromFile((cart) => {
      let cartProducts = cart.products;
      let updatedCartProducts = cartProducts.filter((prod) => prod.id.toString() !== productId.toString());

      fs.writeFile(cartPath, JSON.stringify({ products: updatedCartProducts }), (error) => {
        // console.log(error);
      });
      if (callBack) {
        callBack();
      }
    });
  };