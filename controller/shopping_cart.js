const knex = require("../model/db")
const UniqueId = require("generate-unique-id")
const generateUniqueId = (req,res)=>{
   const id = UniqueId({
    includeSymbols: ['@','#','|'],
    excludeSymbols: ['0']
  });res.send(id)

}
//  add product by cart 
addProductInCart = async (req, res) => {
    const cart_data = {
        'cart_id': req.body.cart_id,
        'product_id': req.body.product_id,
        'attributes': req.body.attributes,
        'quantity': 1,
        'added_on': new Date()
    }
    knex.select('quantity')
        .from('shopping_cart')
        .where('shopping_cart.cart_id', cart_data.cart_id)
        .andWhere('shopping_cart.product_id', cart_data.product_id)
        .andWhere('shopping_cart.attributes', cart_data.attributes)
        .then((data) => {
            if (data.length == 0) {
                // for quantity
                knex('shopping_cart')
                    .insert({
                        'cart_id': cart_data.cart_id,
                        'product_id': cart_data.product_id,
                        'attributes': cart_data.attributes,
                        'quantity': 1,
                        'added_on': new Date()
                    })
                    .then(() => {
                        knex
                            .select(
                                'item_id',
                                'name',
                                'attributes',
                                'shopping_cart.product_id',
                                'price',
                                'quantity',
                                'image'
                            )
                            .from('shopping_cart')
                            .join('product', function () {
                                this.on('shopping_cart.product_id', 'product.product_id')
                            })
                            .then(data => {
                                // console.log(data);
                                let datas = []
                                for (let i of data) {
                                    // console.log(i);
                                    let subtotal = i.price * i.quantity;
                                    i.subtotal = subtotal;
                                    datas.push(i);
                                }
                                // console.log(datas)
                                res.send(data);
                            }).catch(err => console.log(err));
                    }).catch((err) => console.log(err))
            }
        })
        .catch((er) => {
            console.log(er);
        })
}
// get cart  by cart_id 
getShoppingcartByCartId = async (req, res) => {
    await knex.select(
        'item_id',
        'name',
        'attributes',
        'shopping_cart.product_id',
        'price',
        'quantity',
        'image')
        .from('shopping_cart')
        .join('product', function () {
            this.on('shopping_cart.product_id', 'product.product_id')
        })
        .where('shopping_cart.cart_id', req.params.id)
        .then((data)=>{
        // console.log(data);
        // res.send(data)
        let arr = []
        for (i of data){
            subtotal = i.price * i.quantity
            i.subtotal = subtotal
            arr.push(i)
            // console.log(arr);
        }
        res.send(arr)
        console.log(arr);
        })
    .catch((er)=>{
        console.log(er);
    })
}


// update shoppingcartr by item_id
upadteShoppingCart = async (req, res) => {
    knex('shopping_cart')
        .where('shopping_cart.item_id', req.params.id)
        .update({
            'quantity': req.body.quantity
        })

        .then(() => {
            knex.select(
                    'item_id',
                    'product.name',
                    'shopping_cart.attributes',
                    'shopping_cart.product_id',
                    'product.price',
                    'shopping_cart.quantity',
                    'product.image'
                )
                .from('shopping_cart')
                .where('shopping_cart.item_id', req.params.id)
                .join('product', function () {
                    this.on('shopping_cart.product_id', 'product.product_id')
                })
                .then((data) => {
                    // console.log(data);
                    let result = [];
                    for (let i of data) {
                        let subtotal = i.price * i.quantity;
                        i.subtotal = subtotal;
                        result.push(i);
                    }
                    // console.log(result);
                    console.log("data updated!");
                    res.send(result);
                }).catch(err => console.log(err));
        }).catch((err) => {
            console.log(err)
        })
}
// delet shopping cart

emptyShoppingCartByCartId = async (req, res) => {
    await knex.select("*")
        .from('shopping_cart')
        .where('shopping_cart.cart_id', req.params.id)
        .del()
        .then((data) => {
            console.log(data);
            res.send({ delete: 'data deleted successfully!!!' })
        })
        .catch((er) => {
            console.log(er);
        })
}
 
// get Total Amount by cart_id 
 

getTotalAmountByCartId = async (req, res) => {
    knex.select(
        'price',
        'quantity')
        .from('shopping_cart')
        .join('product', function () {
            this.on('shopping_cart.product_id', 'product.product_id')
        })
        .where('shopping_cart.cart_id', req.params.id)
        .then((data) => {
            console.log(data);
            arr_3 = []
            for (let i of data) {
                let result = [];
                let total_Amount = i.quantity * i.price;
                i.total_Amount = total_Amount;
                console.log(i);
                arr_3.push(i);
            }
            res.send(arr_3);


        }).catch((err) => {
            console.log(err);
        })
}

// remove product by item_id 
removedProductbyId = async (req, res) => {
    knex.select("*")
    .from('shopping_cart')
    .delete()
    .where('shopping_cart.item_id', req.params.id)
    .then((data) =>{
        console.log("data delete successfully!")
        res.send("data delete successfully!")
        console.log(data);
    }).catch((err) =>{
        console.log(err);
    })
}

module.exports = {addProductInCart,generateUniqueId,getShoppingcartByCartId,upadteShoppingCart,emptyShoppingCartByCartId ,getTotalAmountByCartId,removedProductbyId}