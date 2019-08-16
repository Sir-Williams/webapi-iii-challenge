const express = require('express');
const db = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
    db.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error collecting posts.'})
        })
});

router.get('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    
    db.getById(id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error finding post with this ID'})
        })
});

router.delete('/:id', validatePostId, (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(post => {
            res.status(200).json({ message: 'post deleted'})
        })
        .catch(err => {
            res.status(500).json({ error: 'Error deleting post with this ID'})
        })
});

router.put('/:id',validatePostId, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(update => {
            res.status(200).json(update)
        })
        .catch(err => {
            res.status(500).json({ error: 'Error updating post with this ID'})
        })
});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id;

    db.getById(id)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(400).json({message: 'no post with this ID'});
            }
        })
        .catch (err => {
            res.status(500).json({error: 'Error validating post with ID.'})
        })
};

module.exports = router;