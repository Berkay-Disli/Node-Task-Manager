const asyncHandler = require("express-async-handler")
const Task = require("../models/taskModel")

const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find( { user_id: req.user.id } )
    res.status(200).json(tasks)
})

const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    res.status(200).json(task)
})

const createTask = asyncHandler(async (req, res) => {
    const { title, details, priority, status, date } = req.body

    if (!title || !details) {
        res.status(400)
        throw new Error("Title and description is mandatory.")
    }

    let adjustedTaskDate;
    if (date) {
        adjustedTaskDate = new Date(date).toISOString();
    } else {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1); 
        adjustedTaskDate = currentDate.toISOString();
    }

    const newTask = await Task.create({
        title,
        details,
        priority: priority || "low",
        status: status || "todo",
        user_id: req.user.id,
        date: adjustedTaskDate
    })

    res.status(201).json({
        message: "Succesfuly created.",
        task: newTask
    })
})

const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        )
    if (!task) {
        res.status(404)
        throw new Error("Task not found.")
    }
    res.status(200).json(task)
})

const deleteTask = asyncHandler( async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task) {
        res.status(404)
        throw new Error("Task not found.")
    }

    task.deleteOne()

    res.status(200).json({
        message: "Task deleted."
    })
})

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask }