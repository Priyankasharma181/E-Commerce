
const knex = require("../model/db")

getcategories =  (req, res) => {
    let orderList = []
    console.log(req.query);
    let order_q = req.query.order
    let page_q = req.query.page
    let limit_q = req.query.limit
    if(order_q){
       let order = order_q.split(",")
        console.log(order);
        orderList.push({"column":order[0],"order":order[1]})
        // console.log(orderList);
    }
    if(page_q && limit_q){
         page_q = parseInt(page_q)
         limit_q = parseInt(limit_q)
         page_q = page_q*limit_q-limit_q

    }else{
        page_q = 0
        limit_q = 50
    }
     knex.select('*')

        .from('category')
        .orderBy(orderList)
        .limit(limit_q).offset(page_q)
        .then((data) => {
            // console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}
getcategoriesById = (req,res)=>{
     knex.select("*").from("category").where(" category_id ",req.params.id)
    .then((data)=>{
        res.send(data)
        // console.log(data);
    })
    .catch((er)=>{
        console.log(er);
    })
}
productId =  (req, res) => {
     knex.select("category.category_id","department_id", "name")
        .from('category')
        .innerJoin('product_category', function(){
            this.on('category.category_id', 'product_category.category_id')
        })

        .where("product_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}
getdepartmentId = (req, res) => {
     knex.select(
            "category.category_id",
            "category.name",
            "category.description",
            "category.department_id")
        .from('category')

        .where("department_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}
module.exports = {getcategories,getcategoriesById,productId,getdepartmentId}