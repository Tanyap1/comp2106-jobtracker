// use Mongoose to interact with MongoDB
const mongoose = require('mongoose')

// create a schema for an Employer document
let employerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    location: {
        type: String,
        required: 'Location is required',
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    }
})

// make the model public so the controller can use it for CRUD
module.exports = mongoose.model('Employer', employerSchema)