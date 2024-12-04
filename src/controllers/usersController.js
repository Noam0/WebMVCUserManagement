const UsersService = require('../services/usersService');

const UsersController = {
    createUser: async (req, res) => {
        try {
            const { userId, appId, firstSeen, lastSeen } = req.body;

            if (!userId || !appId) {
                return res.status(400).json({ error: 'Missing required fields: userId or appId' });
            }

            const user = await UsersService.createUser({ userId, appId, firstSeen, lastSeen });
            res.status(201).json(user);
        } catch (error) {
            console.error(error.message);
            if (error.message.includes('already exists')) {
                return res.status(409).json({ error: error.message });
            }
            res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    },

    getUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { appId } = req.query;

            if (!userId || !appId) {
                return res.status(400).json({ error: 'Missing required fields: userId or appId' });
            }

            const user = await UsersService.getUserDetails(userId, appId);
            res.status(200).json(user);
        } catch (error) {
            console.error(error.message);
            res.status(404).json({ error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { appId, lastSeen } = req.body;

            if (!userId || !appId) {
                return res.status(400).json({ error: 'Missing required fields: userId or appId' });
            }

            const updatedUser = await UsersService.updateUser(userId, appId, { lastSeen });
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error.message);
            res.status(404).json({ error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { appId } = req.query;

            if (!userId || !appId) {
                return res.status(400).json({ error: 'Missing required fields: userId or appId' });
            }

            const deletedUser = await UsersService.deleteUser(userId, appId);
            res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        } catch (error) {
            console.error(error.message);
            res.status(404).json({ error: error.message });
        }
    },

    getUsersByApplication: async (req, res) => {
        try {
            const { appId } = req.params;

            if (!appId) {
                return res.status(400).json({ error: 'Missing required field: appId' });
            }

            const users = await UsersService.getUsersByApplication(appId);
            res.status(200).json(users);
        } catch (error) {
            console.error(error.message);
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = UsersController;
