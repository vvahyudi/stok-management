const express = require("express")
const Router = express.Router()
const historyStockController = require("../controllers/historystock")
const authMiddleware = require("../middlewares/auth")

Router.get(
	"/",
	authMiddleware.authentication,
	historyStockController.getAllHistoryStock,
)
Router.get(
	"/:id",
	authMiddleware.authentication,
	historyStockController.getHistoryStockByProductId,
)

Router.post(
	"/add",
	authMiddleware.authentication,
	authMiddleware.authorizationOperator,
	historyStockController.addStockByProductId,
)
Router.post(
	"/reduce",
	authMiddleware.authentication,
	authMiddleware.authorizationOperator,
	historyStockController.reduceStockByProductId,
)
Router.post(
	"/:id",
	authMiddleware.authentication,
	authMiddleware.authorizationOperator,
	historyStockController.updateStockByProductId,
)

module.exports = Router
