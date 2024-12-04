const DevelopersModel = require('../models/developers');

const DevelopersService = {
    registerDeveloper: async ({ email, name, apiKey ,password }) => {
        // Check if the email is already registered
        const existingDeveloper = await DevelopersModel.getDeveloperByEmail(email);
        if (existingDeveloper) {
            throw new Error('Developer with this email already exists');
        }

        // Generate API key if not provided
        const finalApiKey = apiKey || `apiKey-${Date.now()}`;

        return await DevelopersModel.createDeveloper({ email, name, apiKey: finalApiKey , password });
    },
    getDeveloperDetails: async (email) => {
        return await DevelopersModel.getDeveloperByEmail(email);
    },

    getApplicationsByDeveloper: async (email) => {
        return await DevelopersModel.fetchApplicationsByDeveloper(email);
    },
};

module.exports = DevelopersService;
