// routes/routes.js
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Authentication route
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/me", authenticate, authController.me);

// User routes
router.post(
  "/users",
  //   authenticate,
  //   authorize(["admin"]),
  userController.createUser
);

router.post(
  "/create-admin",
  authenticate,
  // authorize(["admin"]),
  userController.createAdmin
);
router.get(
  "/users",
    authenticate,
    authorize(["admin"]),
  userController.getUsers
);
router.get(
  "/users/:id",
    authenticate,
    authorize(["admin"]),
  userController.getUserById
);
router.put(
  "/users/:id",
    authenticate,
    authorize(["admin"]),
  userController.updateUser
);
router.delete(
  "/users/:id",
    authenticate,
    authorize(["admin"]),
  userController.deleteUser
);


module.exports = router;
