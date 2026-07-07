import { Router } from "express";
import { productRoutes } from "./product.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
	res.status(200).json({ message: "Server is healthy" });
});

router.use("/products", productRoutes);

export const apiRoutes = router;
