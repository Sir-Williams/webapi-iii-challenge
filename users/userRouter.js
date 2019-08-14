const express = require('express');
const userDb = require('./userDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
    userDb.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error in posting user.'})
        })
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    userDb.get()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'Users Could not be found.'})
        })
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {
    userDb.remove(req.params.id)
        .then(user => {
            res.status(200).json({ message: 'User Deleted'})
        })
        .catch(err => {
            res.status(500).json({ error: 'Error deleting user.'})
        })
});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;

    userDb.getById(id)
        .then(user => {
            if(user){
                req.user = user;
                next();
            } else {
                res.status(400).json({ message: "Could not find user with this ID."})
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Error in finding ID.'})
        })
};

function validateUser(req, res, next) {
    const body = req.body;
    const name = req.body.name;

    if (!body || !name) {
      res.status(400).json({ message: 'Must insert body and name.' });
    } else {
      next();
    }
};

function validatePost(req, res, next) {

};

module.exports = router;
