const express=require("express");
const path=require("path");
var EJS = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const staticPath=path.join(__dirname,"/public");
const tempPath=path.join(__dirname,"/templetes/views");
const partialsPath=path.join(__dirname,"/templetes/partials");
const { getHomePage, getProductDetailsPage }=require('./controller/admin/homeController')
const { getCartPage , postCartPage, deleteCartItem }=require('./controller/admin/cardcontroller')
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 8000;
const routr=require('./index1_with');
app.set("view engine","ejs")
app.set("views",tempPath)
app.engine('html', EJS.renderFile);

app.use(express.static(staticPath))
app.use(express.static(partialsPath))

app.get("/", getHomePage)
app.get('/cart',getCartPage)
app.post('/cart',postCartPage)
app.post('/cart/delete-item',deleteCartItem)
app.get("/product/details/:productId", getProductDetailsPage)
app.use('/products',routr);


app.get("/shop/*",(req,res)=>{
    res.render("404",{
        errorcmt:"Oops this shop page is not found"
    })
})
app.get("/*",(req,res)=>{
    res.render("404",{
        errorcmt:"Opps page couldn't find"
    })
})
app.listen(port,()=>{
    console.log("index.js worked")
})

// API:
// get - read
// post - create
// put - update
// delete - delet



// The callback function has 2 parameters, request(req) and response(res).
// The request object(req) represents the HTTP request and
// has properties for the request query string, parameters, body,
// HTTP headers, etc.

// Similarly, the response object represents the HTTP response
// that the Express app sends when it receives an HTTP request.



// Pug,hbs,ejs