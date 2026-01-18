import express from "express";
import * as authController from "../controller/auth.controller.js";
import * as ValidationRules from "../middlewares/validation.middlewar.js";

const router = express.Router();

router.post(
  "/register",
  ValidationRules.registerUSerValidationRules,
  authController.register,
);

export default router;
