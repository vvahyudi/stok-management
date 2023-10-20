const express = require("express")
const Router = express.Router()
const userController = require("../controllers/user")
const authMiddleware = require("../middlewares/auth")
const uploadMiddleware = require("../middlewares/uploadImages")

Router.get(
	"/:username",
	authMiddleware.authentication,
	userController.getUserByUsername,
)
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

module.exports = Router
