import express from 'express';

const router = express.Router();
import {indexController} from '../controller/index-controller.js';

router.get("/", indexController.showIndex);
router.get("/orders", indexController.createOrder);
router.post("/orders", indexController.createPizza);
router.get("/orders/:id/", indexController.showOrder);
router.delete("/orders/:id/", indexController.deleteOrder);

export const indexRoutes = router;
