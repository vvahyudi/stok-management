const express = require("express")
const Router = express.Router()
const historyStockController = require("../controllers/historystock")
const authMiddleware = require("../middlewares/auth")

Router.get(
	"/",
	authMiddleware.authentication,
	historyStockController.getAllHistoryStock,
)
Router.get("/:id", historyStockController.getHistoryStockByProductId)

Router.post(
	"/add",
	authMiddleware.authentication,
	authMiddleware.authorizationAdmin,
	historyStockController.addStockByProductId,
)
Router.post(
	"/reduce",
	authMiddleware.authentication,
	authMiddleware.authorizationAdmin,
	historyStockController.reduceStockByProductId,
)
Router.patch(
	"/:product_id",
	authMiddleware.authentication,
	authMiddleware.authorizationAdmin,
	historyStockController.updateStockByProductId,
)

module.exports = Router
