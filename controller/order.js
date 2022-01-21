const knex = require("../model/db")

createOrder =  async (req, res) => {
    await knex
        .select('*')
        .from('shopping_cart')
        .where('cart_id', req.body.cart_id)
        .join("product", function () {
            this.on('shopping_cart.product_id', 'product.product_id')
        })
        .then((data) => {
            // console.log(data);
            knex("orders").insert({
                "total_amount": data[0].quantity * data[0].price,
                "created_on": new Date(),
                "customer_id": req.body.customer_id,
                "shipping_id": req.body.shipping_id,
                "tax_id": req.body.tax_id
            })
                .then((result) => {
                    // console.log(result)
                    knex.select("*").from("shopping_cart").where("cart_id", req.body.cart_id).delete()
                        .then(() => {
                            res.send({ "order Id": result[0] })
                        }).catch(() => {
                            res.send({ "error": "error in deleting data" })
                     })

                })
               
        })
        .catch((er) => {
            console.log(er);
            res.send({ "error": "cart id not found..." })
        })
}

getShortDetailsOfCustmer = async (req, res) => {
    await  knex("order_detail").select("*")
        // .from("order_detail")
        .where("order_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}


// Get order by custome
getOrdersByCustomer = async (req, res) => {
    await knex.select("*")
        .from('orders')
        .where("customer_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}



module.exports = {createOrder ,getOrdersByCustomer,getShortDetailsOfCustmer}