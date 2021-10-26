/*   File name: contactList.js
     Student name: Parth Patel
     Student ID: 301207843
     Assignment: web authentication 
     date : 25th oct 2021   */
let express = require('express');
// let router = express.Router();
let mongoose = require('mongoose');

// connect to contact list
let contacts = require('../models/contacts');


// GET Route for Contact List page - READ operation
module.exports.displayContactList = (req, res, next) => {
    contacts.find((err, contactList) => {
        // sort the contact by name
        contactList.sort((a, b) => {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
        })
        if(err) {
            return console.error(err);
        } else {
            res.render('businessContacts/contactList', {title: 'Business Contacts', contactList: contactList, email: req.user? req.user.email : ''})
        }
    })
}

// GET Route for displaying Add Contact page - CREATE
module.exports.displayAddContact = (req, res, next) =>{ 
    res.render('businessContacts/add', {title: 'Add Contact', email: req.user? req.user.email : ''});
}


// POST process Add Contact
module.exports.addContact = (req, res, next) =>{ 
    let newContact = contacts({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    })

    contacts.create(newContact, (err, Contacts) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            //refresh contact list
            res.redirect('/contact-list');
        }
    })
}

// GET Route for displaying Edit Contact page - UPDATE
module.exports.displayEditPage = (req, res, next) =>{ 
    // let id = req.params.id;
    let id = new mongoose.Types.ObjectId(req.params.id);  // getting id
    console.log('EDIT! id: ' + id);
    contacts.findById(id, (err, contactToEdit) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            // show edit contact view
            res.render('businessContacts/edit', {title: 'Edit Contact', contact: contactToEdit, email: req.user? req.user.email : ''})
        }
    })
}

// POST Route for processing Edit Contact page - UPDATE
module.exports.processEditContact = (req, res, next) =>{ 
    // let id = req.params.id;
    let id = new mongoose.Types.ObjectId(req.params.id);  // getting id
    let updateContact = contacts({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    })

    contacts.updateOne({_id: id}, updateContact, (err)=> {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //refresh contact list
            res.redirect('/contact-list');
        }
    })
}

// GET to perform Contact Deleteion - DELETE
module.exports.deleteContact = (req, res, next) =>{ 
    // let id = req.params.id;
    let id = new mongoose.Types.ObjectId(req.params.id);  // getting id
    console.log("id:::" + id);
    contacts.remove({_id: id}, (err)=> {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //refresh contact list
            res.redirect('/contact-list');
        }
    })
}