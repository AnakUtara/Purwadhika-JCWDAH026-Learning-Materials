import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { validateRequest } from "../middlewares/validate-request.js";
import {
	createProductSchema,
	listProductsQuerySchema,
	productParamsSchema,
	updateProductSchema,
} from "../validators/product.validator.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();
const controller = new ProductController();

router.get(
	"/",
	validateRequest(listProductsQuerySchema, "query"),
	asyncHandler(controller.list),
);
router.get(
	"/:id",
	validateRequest(productParamsSchema, "params"),
	asyncHandler(controller.getById),
);
router.post(
	"/",
	validateRequest(createProductSchema),
	asyncHandler(controller.create),
);
router.patch(
	"/:id",
	validateRequest(productParamsSchema, "params"),
	validateRequest(updateProductSchema),
	asyncHandler(controller.update),
);
router.delete(
	"/:id",
	validateRequest(productParamsSchema, "params"),
	asyncHandler(controller.delete),
);

export const productRoutes = router;
