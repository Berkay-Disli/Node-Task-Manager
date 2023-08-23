const express = require("express")
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require("../controllers/taskController")
const validateToken = require("../middlewares/validateTokenHandler")
const router = express.Router()

router.use(validateToken)

router.route("/").get(getTasks)
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask)
router.route("/").post(createTask)


module.exports = router