const express = require("express");
const router = express.Router();
const usersCon = require("../controllers/usersCon");
const {
  userValidationResult,
  userValidator,
} = require("../validators/userValidator");

router.get("/", usersCon.getUsers);
router.get("/:id", usersCon.getUserById);
router.post("/", userValidator, userValidationResult, usersCon.addUser);
router.delete("/:id", usersCon.deleteUserById);
router.put("/", userValidator, userValidationResult, usersCon.updateUser);

module.exports = router;
