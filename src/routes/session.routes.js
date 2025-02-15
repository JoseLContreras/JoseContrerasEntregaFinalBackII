import { Router } from "express";
import userRepository from "../persistence/mongoDB/user.repository.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/register", passportCall("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "ok", msg: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

router.post("/login", passportCall("login"), async (req, res) => {
  try {
    const token = createToken(req.user);
    res.cookie("token", token, {httpOnly: true});

    return res.status(200).json({ status: "ok", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

/* router.post("/auth", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.getByEmail(email);
    if (!user || !isValidPassword(user.password, password)) return res.status(401).json({ status: "error", msg: "User or email invalid" });

    const token = createToken(user);

    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ status: "ok", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});
 */
router.get("/current", passportCall("jwt"), async (req, res) => {
  res.status(200).json({ status: "ok", user:req.user });
});

export default router;
