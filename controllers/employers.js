// import express and create an express router in this controller to dispatch http requests
const express = require('express')
const router = express.Router()

// import Employer model for CRUD operations
const Employer = require('../models/employer')

/* GET root of employers */
router.get('/', (req, res) => {
    // use the mongoose model to query the list of employers in mongodb
    // all mongoose methods return either an error or (usually) some data
    Employer.find((err, employers) => {
        if (err) {
            console.log(err)
        }
        else {
             res.render('employers/index', { 
                title: 'Employers',
                employers: employers    
            })
        }
    })   
})

// export this file so it is public
module.exports = router