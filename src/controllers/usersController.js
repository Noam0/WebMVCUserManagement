const UsersService = require('../services/usersService');
const { isValidEmail , isValidPassword , isValidBirthdate} = require('../utils/validators');

const UsersController = {
  createUser: async (req, res) => {
    try {
      const { email, firstName, lastName, password, birthdate, interests } = req.body;

      // Validate required fields
      if (!email || !firstName || !lastName || !password || !birthdate || !Array.isArray(interests)) {
        return res.status(400).json({ error: 'Missing or invalid fields' });
      }

      if(!isValidEmail(email)){
        return res.status(400).json({ error: 'Invalid mail format'})
      }

      if(!isValidPassword(password)){
        return res.status(400).json({ error: 'Password must be at least 5 characters long and contain at least one digit' });
      }

      if(!isValidBirthdate(birthdate)){
        return res.status(400).json({ error: 'Invalid date' });
      }

      // Create the user
      const user = await UsersService.createUser({ email, firstName, lastName, password, birthdate, interests });
      const { password: _, ...userWithoutPassword } = user;

      res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error(error.message);
  
        // Return a generic error for any issues
        res.status(500).json({ error: 'Internal Server Error' });
      }

  },


  getUserByEmailAndPassword: async (req, res) => {
    try {
      const { email } = req.params; // Extract email from path
      const { password } = req.query; // Extract password from query parameter
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }
  
      const user = await UsersService.getUserByEmailAndPassword(email, password);
  
      if (!user) {
        return res.status(404).json({ error: 'No user found with the provided credentials' });
      }
  
      const { password: _, ...userWithoutPassword } = user; // Exclude password
      res.status(200).json(userWithoutPassword);

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getPaginatedUsers: async (req, res) => {
    try {
      const { page, size } = req.query;

      // Validate pagination parameters
      const pageIndex = parseInt(page, 10);
      const pageSize = parseInt(size, 10);

      if (isNaN(pageIndex) || isNaN(pageSize) || pageIndex < 0 || pageSize < 1) {
        return res.status(400).json({ error: 'Invalid pagination parameters' });
      }

      // Fetch users
      const users = await UsersService.getPaginatedUsers(pageIndex, pageSize);
      res.status(200).json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getUsersByCriteria: async (req, res) => {
    try {
      const { criteria, value, page, size } = req.query;

      
      if (!criteria || !value) {
        return res.status(400).json({ error: 'Missing criteria or value query parameters' });
      }

     
      const pageIndex = parseInt(page, 10) || 0;
      const pageSize = parseInt(size, 10) || 10;

      if (pageIndex < 0 || pageSize < 1) {
        return res.status(400).json({ error: 'Invalid pagination parameters' });
      }

      // ניתוח הקריטריון
      if (criteria === 'byEmailDomain') {
        const users = await UsersService.getUsersByEmailDomain(value, pageIndex, pageSize);
        return res.status(200).json(users);
      }

      // אם הקריטריון לא מזוהה
      return res.status(400).json({ error: 'Unsupported criteria' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  filterUsers: async (req, res) => {
    try {
      const { criteria, value, page, size } = req.query;

      // Validate query parameters
      if (!criteria || !value || page === undefined || size === undefined) {
        return res.status(400).json({ error: 'Missing required query parameters' });
      }

      const pageIndex = parseInt(page, 10);
      const pageSize = parseInt(size, 10);

      if (isNaN(pageIndex) || isNaN(pageSize) || pageIndex < 0 || pageSize <= 0) {
        return res.status(400).json({ error: 'Invalid pagination parameters' });
      }

      // Call the service to fetch filtered users
      const users = await UsersService.filterUsers(criteria, value, pageIndex, pageSize);
      res.status(200).json(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },



  deleteAllUsers: async (req, res) => {
    try {
      await UsersService.deleteAllUsers();
      res.status(200).json({ message: 'All data deleted successfully.' });
    } catch (error) {
      console.error('Error deleting all data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },



};

module.exports = UsersController;