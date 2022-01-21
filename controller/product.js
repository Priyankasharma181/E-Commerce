const knex = require("../model/db")
getProduct = (req,res)=>{
    knex.select("*").from("product")
    .then((data)=>{
        // console.log(data);
        res.send(data)
    })
    .catch((er)=>{
        console.log(er);
    })
}

getproductById = (req,res)=>{
    knex.select("*").from("product").where("product_id",req.params.id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    })
    .catch((er)=>{
        console.log(er);
    })
}

getByProductCatogeryId = async (req,res)=>{
    await knex.select(
    'product.product_id',
    'product.name',
    'product.description',
    'product.price',
    'product.discounted_price',
    'product.thumbnail'
    )
    .from("product")
    .join('product_category',function(){
        this.on('product.product_id','product_category.product_id')
    })

    .where("category_id",req.params.id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    })
    .catch((er)=>{
        console.log(er);
    })
}
getproductsDetails = async (req, res) => {
    await knex.select(
        'product_id',
        'name',
        'description',
        'price',
        'discounted_price',
        'image',
        'image_2')
        .from('product')
        .where("product_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}
getlocationByProductId = async (req, res) => {
    await knex.select(
        "category.category_id",
        "category.name as category_name",
        'department.department_id',
        'department.name as department_name',

    )
        .from('category')
        .join('department', function () {
            this.on('category.category_id', 'department.department_id')
        })
        
        .where("category_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}
getproductReviewById = async (req, res) => {
    await knex.select("*")
        .from('review')
        .where("product_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
       })
}
createPostReview = async (req, res) => {
    const userdata = {
        customer_id: 1,
        product_id: req.body.product_id,
        review: req.body.review,
        rating: req.body.rating,
        created_on: new Date()
    }
    console.log(userdata);
    knex('review').insert(userdata)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
  }
module.exports = {getProduct, getproductById, getByProductCatogeryId, getproductsDetails, getlocationByProductId, getproductReviewById ,
    createPostReview}