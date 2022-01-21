const router=require('express').Router()
const {getCustomerId,customerSign,customerLogin,customerUpdate,customerAddresUpdate,updateCreditCardCustomer} = require("../controller/custmor")
// const auth = require("../auth/jwt")

// Ragistraion
router.get("/api/getCustomer/:id",getCustomerId)
router.post("/api/customerSign",customerSign)
router.post("/api/customerLogin",customerLogin)
router.put("/api/customerUpdate/:id",customerUpdate)
router.put("/api/customerAddresUpdate/:id",customerAddresUpdate)
router.put("/api/updateCreditCardCustomer",updateCreditCardCustomer)

// get dapartment
const {getdepartment,getdepartmentByID} = require("../controller/departments")

router.get("/api/getdepartment",getdepartment)
router.get("/api/getdepartmentByID/:id",getdepartmentByID)


//  Get categories
const {getcategories,getcategoriesById,productId,getdepartmentId} = require("../controller/Catogeris")

router.get("/api/getcategories",getcategories)
router.get("/api/getcategoriesById/:id",getcategoriesById)
router.get("/api/productId/:id",productId)
router.get("/api/getdepartmentId/:id",getdepartmentId)




// Get attribute
const {getAttribute,getAttributeById,getAttributeByValue,getAttributesByProductId} = require("../controller/attribute")
router.get("/api/getAttribute",getAttribute)
router.get("/api/getAttributeById/:id",getAttributeById)
router.get("/api/getAttributeByValue/:id",getAttributeByValue)
router.get("/api/getAttributesByProductId/:id",getAttributesByProductId)


// Get Product
const {getProduct ,getproductById ,getByProductCatogeryId ,getproductsDetails ,getlocationByProductId ,getproductReviewById,
    createPostReview} = require("../controller/product")



router.get("/api/getProduct",getProduct)
// router.get("/api/getproductBySearch",getproductBySearch)
router.get("/api/getproductById/:id",getproductById)
router.get("/api/getByCatogeryId/:id",getByProductCatogeryId)
router.get("/api/getproductsDetails/:id",getproductsDetails)
router.get("/api/getlocationByProductId/:id",getlocationByProductId)
router.get("/api/getproductReviewById/:id",getproductReviewById)
router.post("/api/createPostReview",createPostReview)

// For shipping
const {getShipping,getShippingByRegionId} = require("../controller/shipping")
router.get("/api/getShipping",getShipping)
router.get("/api/getShippingByRegionId/:id",getShippingByRegionId)

// For tax 
 const {getTax,getTaxByID} = require("../controller/tax")
 router.get("/api/getTax",getTax)
 router.get("/api/getTaxById/:id",getTaxByID)

//  for Order
const {createOrder ,getOrdersByCustomer,getShortDetailsOfCustmer} = require("../controller/order")

router.post("/api/createOrder",createOrder)
router.get("/api/getOrdersbyCustomer/:id",getOrdersByCustomer)
router.get("/api/getShortDetailsOfCustmer/:id",getShortDetailsOfCustmer)







//  For Shoppingcart
const{addProductInCart,generateUniqueId,getShoppingcartByCartId,upadteShoppingCart,emptyShoppingCartByCartId,getTotalAmountByCartId,removedProductbyId} = require("../controller/shopping_cart")
router.get("/api/generateUniqueId",generateUniqueId)
router.post("/api/addProductInCart",addProductInCart)
router.get("/api/getShoppingcartByCartId/:id",getShoppingcartByCartId)
router.put("/api/upadteShoppingCart/:id",upadteShoppingCart)
router.delete("/api/emptyShoppingCartByCartId/:id",emptyShoppingCartByCartId)
router.get("/api/getTotalAmountByCartId/:id",getTotalAmountByCartId)
router.get("/api/removedProductbyId/:id",removedProductbyId)
module.exports = router

