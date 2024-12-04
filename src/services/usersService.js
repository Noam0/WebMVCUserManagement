const UserModel = require('../models/users');

const UsersService = {
    createUser: async ({ userId, appId, firstSeen, lastSeen }) => {
        // Validate that the appId exists
        const applicationExists = await UserModel.doesApplicationExist(appId);
        if (!applicationExists) {
            throw new Error(`Application with appId ${appId} does not exist`);
        }

        // Validate that the userId is unique for the application
        const existingUser = await UserModel.getUserByIdAndAppId(userId, appId);
        if (existingUser) {
            throw new Error(`User with ID ${userId} already exists for appId ${appId}`);
        }

        return await UserModel.createUser({ userId, appId, firstSeen, lastSeen });
    },

    getUserDetails: async (userId, appId) => {
        const user = await UserModel.getUserByIdAndAppId(userId, appId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found for appId ${appId}`);
        }
        return user;
    },

    updateUser: async (userId, appId, updates) => {
        const user = await UserModel.getUserByIdAndAppId(userId, appId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found for appId ${appId}`);
        }

        return await UserModel.updateUser(userId, appId, updates);
    },

    deleteUser: async (userId, appId) => {
        const user = await UserModel.getUserByIdAndAppId(userId, appId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found for appId ${appId}`);
        }

        return await UserModel.deleteUser(userId, appId);
    },

    getUsersByApplication: async (appId) => {
        const users = await UserModel.getUsersByAppId(appId);
        return users;
    },
};

module.exports = UsersService;
