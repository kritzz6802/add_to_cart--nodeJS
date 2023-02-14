const { addProductToCart, getCartDetailsFromFile, deleteProductFromCart } = require("../../models/cart");
const { getProductById, getAllProducts } = require("../../models/product");

exports.getCartPage = (req, res) => {
    getCartDetailsFromFile(cart => {
        const cartProducts = cart.products;
        getAllProducts(products => {
            const productsData = [];
            let totalPrice = 0;
            for (let cartItem of cartProducts) {
                let singleProduct = products.find(prod => prod.id.toString() === cartItem.id.toString());
               let cartProductPrice = +cartItem.quantity * +singleProduct.price;
                totalPrice += cartProductPrice;
                productsData.push({ ...singleProduct, quantity: cartItem.quantity, cartPrice: cartProductPrice })
            }
            const viewsData = {
                cartProducts: productsData,
                totalPrice
            };
            res.render("cartDtails", viewsData)
        })
    })
}
exports.postCartPage = (req, res) => {
    const productId = req.body.productId;
    getProductById(productId, (product) => {
        addProductToCart(productId, product.price);
        res.redirect('/cart')
    })
}

exports.deleteCartItem=(req,res)=>{
    const productId = req.body.productId;
    deleteProductFromCart(productId,() => {
        res.redirect('/cart')
    })

}
