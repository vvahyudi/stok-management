const express = require("express")
const Router = express.Router()
const historyStockController = require("../controllers/historystock")
const authMiddleware = require("../middlewares/auth")

Router.get("/", historyStockController.getAllHistoryStock)
Router.get("/:product_id", historyStockController.getHistoryStockByProductId)
Router.get("/:id", historyStockController.getHistoryStockById)
Router.post("/", historyStockController.createHistoryStock)
Router.patch("/:product_id", historyStockController.updateStockByProductId)

Router.delete("/:product_id", historyStockController.deleteStockByProductId)

module.exports = Router
