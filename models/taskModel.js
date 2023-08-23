const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Task title is required."]
    },
    details: {
        type: String,
        required: [true, "Task detail is required."]
    },
    priority: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model("Task", taskSchema)