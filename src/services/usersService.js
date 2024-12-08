const UserModel = require("../models/users");
const { formatUserBirthdate } = require("../utils/dateFormat");

const UsersService = {
  createUser: async ({
    email,
    firstName,
    lastName,
    password,
    birthdate,
    interests,
  }) => {
    // Check if the email is already in use
    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
      throw new Error("A user with this email already exists");
    }

    // Create the user
    const newUser = await UserModel.createUser({
      email,
      firstName,
      lastName,
      password,
      birthdate,
      interests,
    });
    return formatUserBirthdate(newUser);
  },
  getUserByEmailAndPassword: async (email, password) => {
    // Fetch the user by email and password
    const user = await UserModel.getUserByEmailAndPassword(email, password);

    if (!user) {
      return null; // Return null if the user doesn't exist or credentials are incorrect
    }

    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = user;

    // Format the birthdate before returning the user
    return formatUserBirthdate(userWithoutPassword);
  },

  getPaginatedUsers: async (page, size) => {
    const offset = page * size; // Zero-based page index
    const users = await UserModel.getPaginatedUsers(offset, size);

    // Exclude passwords and format birthdates
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return formatUserBirthdate(userWithoutPassword);
    });
  },

  getUsersByLastname: async (lastname, pageIndex, pageSize) => {
    const offset = pageIndex * pageSize;
    const users = await UserModel.getUsersByLastname(
      lastname,
      pageSize,
      offset
    );
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return formatUserBirthdate(userWithoutPassword);
    });
  },

  getUsersByMinimumAge: async (minimumAge, pageIndex, pageSize) => {
    const offset = pageIndex * pageSize;
    const users = await UserModel.getUsersByMinimumAge(
      minimumAge,
      pageSize,
      offset
    );
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return formatUserBirthdate(userWithoutPassword);
    });
  },

  getUsersByEmailDomain: async (domain, pageIndex, pageSize) => {
    const offset = pageIndex * pageSize;
    const users = await UserModel.getUsersByEmailDomain(
      domain,
      pageSize,
      offset
    );

    // Exclude passwords and format birthdates
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return formatUserBirthdate(userWithoutPassword);
    });
  },

  deleteAllUsers: async () => {
    await UserModel.deleteAll();
  },
};

module.exports = UsersService;
