// import express and create an express router in this controller to dispatch http requests
const express = require('express')
const req = require('express/lib/request')
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

/* GET /employers/create => load empty employer form */
router.get('/create', (req, res) => {
    res.render('employers/create', {
        title: 'Employer Details'
    })
})

/* POST /employers/create => process form submission to create new employer document */
router.post('/create', (req, res) => {
    // use our Mongoose model to create a new employer from the submitted form body
    Employer.create(req.body, (err, employer) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/employers')
        }
    })
})

/* GET /employers/delete/abc123 => delete employer with the id found in the url param */
router.get('/delete/:_id', (req, res) => {
    Employer.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/employers')
        }
    })
})

/* GET /employers/edit/abc123 => show edit form populated with values of selected employer document from url param */
router.get('/edit/:_id', (req, res) => {
    Employer.findById(req.params._id, (err, employer) => {
        if (err) {
            console.log(err)
        }
        else {
            res.render('employers/edit', {
                title: 'Employer Details',
                employer: employer
            })
        }
    })
})

/* POST /employers/edit/abc123 => update document in mongodb & redirect to index */
router.post('/edit/:_id', (req, res) => {
    Employer.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err, employer) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/employers')
        }
    })
})


// export this file so it is public
module.exports = router