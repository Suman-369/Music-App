import express from "express";
import * as authController from "../controller/auth.controller.js";
import * as ValidationRules from "../middlewares/validation.middlewar.js";

import passport from "passport";
const router = express.Router();

router.post(
  "/register",
  ValidationRules.registerUSerValidationRules,
  authController.register,
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleAuthCallback,
);

export default router;
