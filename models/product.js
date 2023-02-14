const fs = require('fs')
const path = require('path');
const { deleteProductFromCart } = require('./cart');
// const rootdir = require('../utils/path')

// **** code with callback ****//

const getProductsFromFile = (callBack) => {
  const productsPath = path.join(__dirname, '../data', 'products.json')
  fs.readFile(productsPath, (err, productsData) => {
    if (err) {
      return callBack([])
    }
    return callBack(JSON.parse(productsData))
  })
}

exports.saveProduct = (product) => {
  const productsPath = path.join(__dirname, '../data', 'products.json')

  getProductsFromFile((productsData) => {
    productsData.push(product);
    fs.writeFile(productsPath, JSON.stringify(productsData), (err) => {
      // console.log(err)
    })
  })

}

exports.getAllProducts = (callBack) => {
  getProductsFromFile(callBack);
}

exports.getProductById = (productId, callBack) => {
  getProductsFromFile(products => {
    const product = products.find((p) => p.id.toString() === productId)
    // console.log(product);
    callBack(product)
  })
}
exports.updateProductById = (product, productId)=>{
  const productsPath = path.join(__dirname, '../data', 'products.json')

getProductsFromFile(products =>{
  const existingProductIndex = products.findIndex(prod => prod.id.toString()=== productId);

  const updatedProduct = [...products];
  updatedProduct[existingProductIndex] = product;
  fs.writeFile(productsPath, JSON.stringify(updatedProduct), (err) => {
    // console.log(err)
  })
})
}

exports.deteleProductById=(productId, callBack)=>{
  const productsPath = path.join(__dirname, '../data', 'products.json')

  getProductsFromFile(products =>{
    let updatedProducts = products.filter(product => product.id.toString() !== productId.toString());
    deleteProductFromCart(productId);
    fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) => {
      // console.log(err)
    })
    callBack();
  })
}
//**** code without call back ****//


// exports.saveProduct = (product) => {
//     const productsPath = path.join(__dirname, '../data', 'products.json')
//     fs.readFile(productsPath, (err, productsData) => {
//         let products = [];
//         // if (!err) {
//             // try {
//                 products = JSON.parse(productsData);
//               // } catch (err) {
//               //   // 👇️ This runs
//               //   console.log('Error: ', err.message);
//               // }

//         // }
//         products.push(product);
//         fs.writeFile(productsPath, JSON.stringify(products), (err) => {
//             // console.log(err)
//         })
//     })
// }

// exports.getAllProducts = (callBack) => {
//     const productsPath = path.join(__dirname, '../data', 'products.json')
//     fs.readFile(productsPath, (err,productsData) => {
//             // try {
//                const products = JSON.parse(productsData);
//                 callBack(products)
//               // } catch (err) {
//               //   // 👇️ This runs
//               //   console.log('Error: ', err.message);
//               // }
//     });
// }