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

module.exports = Router
