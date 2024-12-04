const ApplicationsModel = require('../models/applications');
const DevelopersModel = require('../models/developers');

const ApplicationsService = {
    registerApplication: async ({ appId, developerEmail, name, description }) => {
        // Check if the developer email exists
        const developerExists = await DevelopersModel.doesDeveloperExist(developerEmail);
        if (!developerExists) {
            throw new Error(`Developer with email ${developerEmail} does not exist`);
        }

        // Check if the Application ID already exists
        const existingApplication = await ApplicationsModel.getApplicationByAppId(appId);
        if (existingApplication) {
            throw new Error(`Application with ID ${appId} already exists`);
        }

        // Proceed with application creation
        const createdAt = new Date();
        return await ApplicationsModel.createApplication({ appId, developerEmail, name, description, createdAt });
    },
    
    getApplication: async (appId) => {
        return await ApplicationsModel.getApplicationByAppId(appId);
    }
};

module.exports = ApplicationsService;
