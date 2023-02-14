const express=require("express");
const router=express.Router();
const { getAddProductPage , postAddProductPage, getAdminProductsPage, getEditProductsPage, postEditProductsPage, postDeleteProductsPage }=require('./controller/admin/productController')

router.get('/',getAdminProductsPage)
router.get('/add',getAddProductPage)
router.post('/add',postAddProductPage)
router.get('/edit/:productId',getEditProductsPage)
router.post('/edit',postEditProductsPage)
router.post('/delete',postDeleteProductsPage)


module.exports=router;


// const express=require("express");
// const path = require("path");
// const app = express();
// const {getAddProductPage}=require('.')
// const router=express.Router();
// const tempPath = path.join(__dirname, "/templetes/views");
// const productsData = require('./router/rout/p2_2');

// app.set("view engine", "ejs")
// app.set("views", tempPath)
// app.use(express.static(tempPath))

// router.get('/',(req,res,next)=>{
//     res.send('this is user page');
// })
// router.get('/add',(req,res)=>{
//     const viewData = {
//     pageTitle : 'add product'
// }
// res.render('login', viewData)})
// router.post('/add',(req,res)=>{
//     const product={
//             title: req.body.title
//           }
//           console.log(req.body.title);
//           productsData.addProduct(product)
//     res.redirect('/home')
//     // console.log('post request')
// })

// module.exports=router;