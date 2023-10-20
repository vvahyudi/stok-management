const express = require("express")
const Router = express.Router()
const userController = require("../controllers/user")
const authMiddleware = require("../middlewares/auth")
const uploadMiddleware = require("../middlewares/uploadImages")

Router.get("/:id", authMiddleware.authentication, userController.getUserById)
Router.get(
	"/",
	authMiddleware.authentication,
	authMiddleware.authorizationAdmin,
	userController.getAllUser,
)
Router.post(
	"/",
	authMiddleware.authentication,
	authMiddleware.authorizationAdmin,
	uploadMiddleware.uploadUser,
	userController.addUser,
)
Router.patch(
	"/:id",
	authMiddleware.authentication,
	authMiddleware.authorizationAdmin,
	uploadMiddleware.uploadUser,
	userController.updateUser,
)
Router.delete(
	"/:id",
	authMiddleware.authentication,
	authMiddleware.authorizationAdmin,
	userController.deleteUser,
)

module.exports = Router
