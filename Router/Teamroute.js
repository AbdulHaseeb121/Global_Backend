const express = require('express');
const TeamController = require('../controller/teamController');
const router = express.Router();

router.post('/create', TeamController.createTeam);
router.get('/', TeamController.getAllTeamsWithMembers);
router.post('/sendMessage', async (req, res) => {
    const { teamId, senderId , content } = req.body;
    TeamController.sendMessage(req.app.io, { teamId, content , senderId });
    res.status(200).json({ success: true, message: 'Message sent' , senderId});
});

module.exports = router;