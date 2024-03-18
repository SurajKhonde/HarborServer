const mongoose= require("mongoose");
const todoSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ["priority1", "priority2", "priority3"],
    },
    targetdate: {
        type: Date,
        required: true,
    },
    taskcompleted: {
        type: Boolean,
        required:true,
        default:false,
    },
    delaytask: {
        type: Boolean,
        required:true,
        default:false,
    },
    
}, {timestamps:true});
todoSchema.index({name: "text" });
module.exports = mongoose.model("Todo", todoSchema);