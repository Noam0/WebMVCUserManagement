const UsersService = require("../services/usersService");
const {
  isValidEmail,
  isValidPassword,
  isValidBirthdate,
} = require("../utils/validators");


const formatUserResponse = (user) => ({
  email: user.email,
  name: {
    first: user.first_name,
    last: user.last_name,
  },
  birthdate: user.birthdate,
  interests: user.interests,
});



const UsersController = {
  createUser: async (req, res) => {
    try {
      const { email, name, password, birthdate, interests } = req.body;

      if (
        !email ||
        !name ||
        !name.first ||
        !name.last ||
        !password ||
        !birthdate ||
        !Array.isArray(interests)
      ) {
        return res.status(400).json({ error: "Missing or invalid fields" });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      if (!isValidPassword(password)) {
        return res
          .status(400)
          .json({
            error:
              "Password must be at least 5 characters long and contain at least one digit",
          });
      }

      if (!isValidBirthdate(birthdate)) {
        return res.status(400).json({ error: "Invalid birthdate format" });
      }

      const user = await UsersService.createUser({
        email,
        firstName: name.first,
        lastName: name.last,
        password,
        birthdate,
        interests,
      });
      
      res.status(201).json(formatUserResponse(user));
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getUserByEmailAndPassword: async (req, res) => {
    try {
      const { email } = req.params;
      const { password } = req.query;
  
      if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
      }
  
      const user = await UsersService.getUserByEmailAndPassword(email, password);
  
      if (!user) {
        return res
          .status(404)
          .json({ error: "No user found with the provided credentials" });
      }
  
      // Ensure response is in the correct order
      res.status(200).json(formatUserResponse(user));
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getPaginatedUsers: async (req, res) => {
    try {
      const { page, size, criteria, value } = req.query;

      const pageIndex = parseInt(page, 10);
      const pageSize = parseInt(size, 10);

      if (
        isNaN(pageIndex) ||
        isNaN(pageSize) ||
        pageIndex < 0 ||
        pageSize < 1
      ) {
        return res.status(400).json({ error: "Invalid pagination parameters" });
      }

      let users;

      if (criteria) {
        switch (criteria) {
          case "byEmailDomain":
            if (!value) {
              return res
                .status(400)
                .json({ error: "Value is required for byEmailDomain" });
            }
            users = await UsersService.getUsersByEmailDomain(
              value,
              pageIndex,
              pageSize
            );
            break;
          case "byLastname":
            if (!value) {
              return res
                .status(400)
                .json({ error: "Value is required for byLastname" });
            }
            users = await UsersService.getUsersByLastname(
              value,
              pageIndex,
              pageSize
            );
            break;
          case "byMinimumAge":
            if (!value || isNaN(parseInt(value, 10))) {
              return res
                .status(400)
                .json({
                  error: "Valid age value is required for byMinimumAge",
                });
            }
            users = await UsersService.getUsersByMinimumAge(
              parseInt(value, 10),
              pageIndex,
              pageSize
            );
            break;
          default:
            return res.status(400).json({ error: "Invalid criteria provided" });
        }
      } else {
        users = await UsersService.getPaginatedUsers(pageIndex, pageSize);
      }

    res.status(200).json(users.map(formatUserResponse));
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteAllUsers: async (req, res) => {
    try {
      await UsersService.deleteAllUsers();
      res.status(200).json({ message: "All data deleted successfully." });
    } catch (error) {
      console.error("Error deleting all data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UsersController;
