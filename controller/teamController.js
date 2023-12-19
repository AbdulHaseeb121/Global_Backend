// teamController.js
const Team = require('../models/teamModal');
const AuthModel = require('../models/authModel')

const TeamController = {
  createTeam: async (req, res) => {
    try {
      // Assuming that the request body contains team name and an array of user IDs
      const { name, members } = req.body;

      
      const newTeam = await Team.create({
        name,
        members: members || [], // If members array is not provided, default to an empty array
      });

     
      if (members && members.length > 0) {
        await AuthModel.updateMany(
          { _id: { $in: members } },
          { $push: { teams: newTeam._id } }
        );
      }

      res.status(201).json({
        success: true,
        message: 'Team created successfully',
        team: newTeam,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Team creation failed',
        error: error.message,
      });
    }
  },
};

module.exports = TeamController;