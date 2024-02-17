const mongoose = require('mongoose')

module.exports = GlobalErrorHandler;


function GlobalErrorHandler(err, req, res, next) {
    
    // Mongoose Validation Error
    if (err instanceof mongoose.Error.ValidatorError) {
        return res.status(400).json(err.errors)
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({"Message" : err.message})
    }
   
    // Mongo DB Error

    // Default
    return res.status(500).json({"Message | Default" : err.message})
}
