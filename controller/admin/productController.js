const { saveProduct, getAllProducts, getProductById, updateProductById, deteleProductById } = require("../../models/product");

exports.getAddProductPage = (req, res) => {
    const viewsData = {
        edit: false,
        pagetitle: 'Add Product'
    }
    res.render("Addproduct", viewsData)
}
exports.postAddProductPage = (req, res) => {
    // console.log(req.body)
    const product = {
        id: Date.now(),
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    }
    saveProduct(product);
    res.redirect('/products/add')
}
exports.getAdminProductsPage = (req, res) => {
    getAllProducts(products => {
        const viewsData = {
            admin: true,
            pagetitle: 'Admin Products',
            products
        }
        res.render("product-list", viewsData)
    })
}

exports.getEditProductsPage = (req, res) => {
    const productId = req.params.productId;
    getProductById(productId, (product) => {
        const viewsData = {
            edit: true,
            product,
            pagetitle: 'Edit Product'
        };
        res.render("Addproduct", viewsData)
    })

}
exports.postEditProductsPage = (req, res) => {
    // console.log(req.body)
    const product = {
        id: req.body.productId,
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    }
    updateProductById(product,req.body.productId);
    res.redirect('/products')
}
exports.postDeleteProductsPage=(req,res)=>{
const productId=req.body.productId;
deteleProductById(productId,()=>{
    res.redirect('/products')
})
}