import express from "express"

// import {createOrder, getOrders, intent} from "../controllers/order.controller.js"

import {getOrders, intent, confirm} from "../controllers/order.controller.js"

import { verifyToken } from './../middlewares/jwt.js';


const router = express.Router()

// router.post("/:gigId", verifyToken, createOrder)

router.get("/", verifyToken, getOrders)

router.post("/create-payment-intent/:gigId", verifyToken, intent)

router.put("/", verifyToken, confirm)

export default router