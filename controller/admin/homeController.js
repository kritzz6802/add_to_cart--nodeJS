const { getAllProducts, getProductById } = require("../../models/product")
// const { products } = require("../../router/rout/p2_2")

exports.getHomePage =(req,res)=>{
    getAllProducts((products)=>{
        const viewsData={
            admin:false,
            products,
        };
        res.render("product-list",viewsData)
    })
}

exports.getProductDetailsPage=(req,res)=>{
const productId = req.params.productId;
getProductById(productId,product =>{
    const viewsData ={
        product,
    };
    res.render('productDetails',viewsData)
});
 }