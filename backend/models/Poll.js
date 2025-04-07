
const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    question: { type: String, require: true },
    type: { type: String, require: true },
    options: [
        {
            optionText: { type: String, require: true },
            votes: { type: Number, default: 0 },
        },
    ],
    responses: [
        {
            voterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For open ended polls
            responseText: { type: String }, //user submitted text-response
            createdAt: { type: Date, default: Date.now }
        }
    ],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //to preevent mulipal votes
    createdAt: {type:Date,default:Date.new},
    closed : {type:Boolean, default:false}, //to mark poll as colsed
});

module.exports = mongoose.model("poll",PollSchema);