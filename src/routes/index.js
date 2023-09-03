const express = require("express")
const Router = express.Router()

const authRoutes = require("./auth")
const userRoutes = require("./user")
const productRoutes = require("./product")
const historyStockRoutes = require("./historystock")

Router.use("/auth", authRoutes)
Router.use("/user", userRoutes)
Router.use("/product", productRoutes)
Router.use("/historystock", historyStockRoutes)

Router.get("/", (_, response) => {
	response.json({ message: "Welcome to Stock Management API" })
})

module.exports = Router
