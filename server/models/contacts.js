/*   File name: contact.js
     Student name: Parth Patel
     Student ID: 301207843
     Assignment: web authentication 
     date : 25th oct 2021   */
let mongoose = require('mongoose');

// create a model class
let contactsModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('contacts', contactsModel);