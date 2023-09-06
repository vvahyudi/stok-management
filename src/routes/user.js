const express = require("express")
const Router = express.Router()
const userController = require("../controllers/user")
const authMiddleware = require("../middlewares/auth")

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

module.exports = Router
