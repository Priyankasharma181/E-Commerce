
const knex= require("../model/db")
const { sign } = require("jsonwebtoken");
getCustomerId = async (req, res) => {
  await knex.select("*")
      .from('customer')
      .where("customer_id", req.params.id)
      .then((data) => {
          console.log(data);
          res.send(data)
      })
      .catch((er) => {
          console.log(er);
      })
}
customerSign =async (req, res) => {
  const userdata = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  }
  console.log(userdata);
  knex('customer').insert(userdata)
  .then((data) => {
      const token=sign({customer_id:data[0]},"priyankasharma",{ expiresIn:"6h"})
      console.log(data);
          res.send(token)
        })
      .catch((er) => {
          console.log("It is Already");
          res.send({message:"Already sign"})
      })
}

// Log in

customerLogin=async (req, res) => {
    knex.from('customer').select("*").where("email","=",req.body.email,"password","=",req.body.password)
  .then((data) => {
    console.log(data);
    const token=sign({customer_id:data[0].customer_id},"priyankasharma",{ expiresIn:"6h"})
    console.log(token);
    res.cookie("user",token)
      res.json({"success": true,
      "status": 200,
      "message": "Login successfull.",
      "token": token,
      })
      console.log({message:data});
  })
  .catch((err) => { 
    res.json({message:err })
    console.log({message:err });
    })
}

// Upddate User
customerUpdate = async(req,res)=>{
  await knex("customer").update({
    "name":req.body.name,
    "email":req.body.email,
    "password":req.body.password,
    "day_phone":req.body.day_phone,
    "eve_phone":req.body.eve_phone,
    "mob_phone":req.body.mob_phone
  })
  .where("customer_id",req.params.id)
  .then((data)=>{
    console.log(data);
    res.send(200)
  })
  .catch((er)=>{
    res.send()
  })
  
}
customerAddresUpdate = async (req,res)=>{
  await knex("customer").update({
    "address_1":req.body.address_1,
    "address_2":req.body.address_2,
    "city":req.body.city,
    "region":req.body.region,
    "postal_code":req.body.postal_code,
    "country":req.body.country,
    "shipping_region_id":req.body.shipping_region_id
  })
  .where("customer_id",req.params.id)
  .then((data)=>{
    console.log(data);
    // res.send(200)
    res.sendStatus(200)
  })
  .catch((er)=>{
    console.log(er);
  })
}

updateCreditCardCustomer = async (req,res)=>{
  await knex("customer").update({
    "credit_card":req.body.credit_card
  })
  .where("customer_id",req.params.customer_id)
  .then((data)=>{
    console.log(data);
    res.send(data)
  })
}
module.exports = {getCustomerId,customerSign,customerLogin,customerUpdate,customerAddresUpdate,updateCreditCardCustomer}