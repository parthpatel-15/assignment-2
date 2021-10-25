let express = require('express');
let router = express.Router();

let contactListController = require('../controllers/contactList');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// GET Route for Contact List page - READ operation
router.get('/', requireAuth, contactListController.displayContactList);

// GET Route for displaying Add Contact page - CREATE
router.get('/add',  requireAuth, contactListController.displayAddContact);

// POST Route for processing Add Contact page - CREATE
router.post('/add', requireAuth, contactListController.addContact);

// GET Route for displaying Edit Contact page - UPDATE
router.get('/edit/:id', requireAuth, contactListController.displayEditPage);

// POST Route for processing Edit Contact page - UPDATE
router.post('/edit/:id', requireAuth, contactListController.processEditContact);

// GET to perform Contact Deleteion - DELETE
router.get('/delete/:id', requireAuth, contactListController.deleteContact);

module.exports = router;