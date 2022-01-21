const knex = require("../model/db")
 
getTax = async (req, res) => {
    await knex.select('*')
        .from('tax')
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}
getTaxByID = async (req,res)=>{
    await knex.select("*").from("tax")
    .where("tax_id",req.params.id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((er)=>{
        console.log(er);
    })
}

module.exports = {getTax,getTaxByID}