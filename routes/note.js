var express = require('express');
const { verifyToken } = require('../src/auth');
const Note = require('../src/models/note');
var router = express.Router();
router.get('/', verifyToken, async function (req, res, next) {
    try {
        const notes = await Note.find({
            user: req?.user?.username
        }).exec();
        var result = []
        notes.map(note => {
            result.push({
                _id: note?._id,
                title: note?.title,
                description: note?.description,
            });
        });
        return res.status(200).send({
            "notes": JSON.stringify(result)
        });
    } catch (err) {
        return res.status(500).send({
            code: err
        });
    }
});
router.post('/', verifyToken, async function (req, res, next) {
    try {
        if (!req.body?.description) return res.status(400).send({
            code: "FieldDescriptionRequired",
            message: "Field Description Required",
        });
        const note = new Note({
            title: req.body?.title ? req.body?.title : "Untitled",
            description: req.body?.description,
            user: req.user.username
        });
        await note.save();
        return res.status(201).send({
            "message": "Success"
        });
    } catch (err) {
        return res.status(500).send({
            code: err
        });
    }
});
router.put('/', verifyToken, async function (req, res, next) {
    try {
        if (!req.body?.description) return res.status(400).send({
            code: "FieldDescriptionRequired",
            message: "Field Description Required",
        });
        Note.findOneAndUpdate({
            _id: req.body._id,
            user: req.user.username
        }, {
            title: req.body?.title ? req.body?.title : "Untitled",
            description: req.body?.description,
        }).exec();

        return res.status(201).send({
            "message": "Success"
        });
    } catch (err) {
        return res.status(500).send({
            code: "Error"
        });
    }
});
router.delete('/', verifyToken, async function (req, res) {
    try {
        await Note.findOneAndRemove({
            user: req?.user?.username,
            _id: req?.body?._id
        }).exec();
        return res.status(202).send({
            "message": "Success"
        });
    } catch (err) {
        return res.status(500).send({
            code: "Error"
        });
    }
});

module.exports = router;
