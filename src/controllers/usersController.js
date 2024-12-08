const UsersService = require("../services/usersService");
const {
  isValidEmail,
  isValidPassword,
  isValidBirthdate,
} = require("../utils/validators");

const UsersController = {
  createUser: async (req, res) => {
    try {
      const { email, firstName, lastName, password, birthdate, interests } =
        req.body;

      // Validate required fields
      if (
        !email ||
        !firstName ||
        !lastName ||
        !password ||
        !birthdate ||
        !Array.isArray(interests)
      ) {
        return res.status(400).json({ error: "Missing or invalid fields" });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid mail format" });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({
          error:
            "Password must be at least 5 characters long and contain at least one digit",
        });
      }

      if (!isValidBirthdate(birthdate)) {
        return res.status(400).json({ error: "Invalid date" });
      }

      // Create the user
      const user = await UsersService.createUser({
        email,
        firstName,
        lastName,
        password,
        birthdate,
        interests,
      });
      const { password: _, ...userWithoutPassword } = user;

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(error.message);

      // Return a generic error for any issues
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getUserByEmailAndPassword: async (req, res) => {
    try {
      const { email } = req.params; // Extract email from path
      const { password } = req.query; // Extract password from query parameter

      if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
      }

      const user = await UsersService.getUserByEmailAndPassword(
        email,
        password
      );

      if (!user) {
        return res
          .status(404)
          .json({ error: "No user found with the provided credentials" });
      }

      const { password: _, ...userWithoutPassword } = user; // Exclude password
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // getPaginatedUsers: async (req, res) => {
  //   try {
  //     const { page, size } = req.query;

  //     // Validate pagination parameters
  //     const pageIndex = parseInt(page, 10);
  //     const pageSize = parseInt(size, 10);

  //     if (
  //       isNaN(pageIndex) ||
  //       isNaN(pageSize) ||
  //       pageIndex < 0 ||
  //       pageSize < 1
  //     ) {
  //       return res.status(400).json({ error: "Invalid pagination parameters" });
  //     }

  //     // Fetch users
  //     const users = await UsersService.getPaginatedUsers(pageIndex, pageSize);
  //     res.status(200).json(users);
  //   } catch (error) {
  //     console.error(error.message);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // },

  getPaginatedUsers: async (req, res) => {
    try {
      const { page, size, criteria, value } = req.query;

      // Validate pagination parameters
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
        // Handle filtering by criteria
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
              return res.status(400).json({
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
        // Default case: get paginated users
        users = await UsersService.getPaginatedUsers(pageIndex, pageSize);
      }

      // Fetch users
      res.status(200).json(users);
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
