const express = require("express")
const Router = express.Router()
const productController = require("../controllers/product")
const authMiddleware = require("../middlewares/auth")
const uploadMiddleware = require("../middlewares/uploadImages")

Router.get("/", authMiddleware.authentication, productController.getAllProduct)
Router.get(
	"/:id",
	authMiddleware.authentication,
	productController.getProductById,
)
Router.post(
	"/",
	authMiddleware.authorizationOperator,
	uploadMiddleware.uploadProduct,
	productController.createProduct,
)
Router.patch(
	"/:id",
	authMiddleware.authentication,
	uploadMiddleware.uploadProduct,
	productController.updateProduct,
)

Router.delete(
	"/:id",
	authMiddleware.authentication,
	productController.deleteProduct,
)
module.exports = Router
