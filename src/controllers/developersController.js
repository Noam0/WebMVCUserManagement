const DevelopersService = require('../services/developersService');
const Validators = require('../utils/validators');

const DevelopersController = {
    registerDeveloper: async (req, res) => {
        try {
            const { email, name, apiKey , password } = req.body;

            // Validate email format
            if (!Validators.isValidEmail(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            const developer = await DevelopersService.registerDeveloper({ email, name, apiKey , password});
            res.status(201).json(developer);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Internal Server Error' });
        }
    },
    getDeveloper: async (req, res) => {
        try {
            const email = req.params.email; // Using email from the route parameter
            const developer = await DevelopersService.getDeveloperDetails(email);
            if (!developer) {
                return res.status(404).json({ error: 'Developer not found' });
            }
            res.status(200).json(developer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Igfnternal Server Error' });
        }
    },
    getDeveloperApplications: async (req, res) =>{
        try {
            const { email } = req.params;

            if (!Validators.isValidEmail(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            const applications = await DevelopersService.getApplicationsByDeveloper(email);
            if (!applications || applications.length === 0) {
                return res.status(404).json({ error: 'No applications found for this developer.' });
            }
            res.status(200).json(applications);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    },
};

module.exports = DevelopersController;
