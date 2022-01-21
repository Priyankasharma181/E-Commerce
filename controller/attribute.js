const knex = require("../model/db")

getAttribute = (req,res)=>{
    knex.select("*").from("attribute")
    .then((data)=>{
        res.send(data)
        console.log(data);
    }).catch((er)=>{
        console.log(er);
    })
}

getAttributeById = (req,res)=>{
    knex.select("*").from("attribute")
    .where("attribute_id",req.params.id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    })
}

getAttributeByValue = (req,res)=>{
    knex.select("attribute_value_id".value)
    .from("attribute_value")
    .where("attribute_id",req.params.id)
    .then((data)=>{
        res.send(data)
        console.log(data);

    }).catch((er)=>{
        console.log(er);
    })
}


getAttributesByProductId =  (req, res) => {

     knex.select("*")
        .from('attribute')
        .join('attribute_value', function () {
            this.on('attribute.attribute_id', 'attribute_value.attribute_id')
        })
        .join('product_attribute', function () {
            this.on('attribute_value.attribute_id', 'product_attribute.attribute_value_id')
        })

        .where("product_attribute.product_id", req.params.id)
        .then((data) => {
            // console.log(data);
            // res.send(data)
            let arr = []
            for(i of data){
                // console.log(i);
                dict = {
                    "attribute_name" :i.name,
                    "attribute_value":i.value,
                    "attribute_id":i.attribute_id
                }
                // console.log(dict);
                arr.push(dict)
            }

                // console.log(arr);
            res.send(arr)
        }).catch((er) => {
            console.log(er);
        })

}

module.exports = {getAttribute,getAttributeById,getAttributeByValue,getAttributesByProductId}