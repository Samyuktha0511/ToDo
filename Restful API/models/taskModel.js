const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type : Date,
        default: Date.now
    },
    userId: {
        type : String
    }
},
{
    collection : 'tasks'
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;