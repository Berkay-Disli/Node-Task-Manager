const express = require("express")
const { register, login, getCurrentUser } = require("../controllers/userController")
const validateToken = require("../middlewares/validateTokenHandler")
const router = express.Router()


router.post("/register", register)
router.post("/login", login)
router.get("/current", validateToken, getCurrentUser)


module.exports = router