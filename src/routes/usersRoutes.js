const express = require("express");
const UsersController = require("../controllers/usersController");

const router = express.Router();


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *               - birthdate
 *               - interests
 *             properties:
 *               email:
 *                 type: string
 *                 description: Unique email for the user
 *               name:
 *                 type: object
 *                 required:
 *                   - first
 *                   - last
 *                 properties:
 *                   first:
 *                     type: string
 *                     description: First name of the user
 *                   last:
 *                     type: string
 *                     description: Last name of the user
 *               password:
 *                 type: string
 *                 description: Password for the user
 *               birthdate:
 *                 type: string
 *                 description: Birthdate of the user in DD-MM-YYYY format
 *                 example: "02-12-1998"
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of user interests
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 name:
 *                   type: object
 *                   properties:
 *                     first:
 *                       type: string
 *                       description: First name of the user
 *                     last:
 *                       type: string
 *                       description: Last name of the user
 *                 birthdate:
 *                   type: string
 *                   description: Birthdate in DD-MM-YYYY format
 *                 interests:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid input or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post('/', UsersController.createUser);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Get user by email and password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *         description: Password of the user
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Unique email of the user
 *                   example: "valid@email.address"
 *                 name:
 *                   type: object
 *                   properties:
 *                     first:
 *                       type: string
 *                       description: First name of the user
 *                       example: "Jane"
 *                     last:
 *                       type: string
 *                       description: Last name of the user
 *                       example: "Smith"
 *                 birthdate:
 *                   type: string
 *                   description: Birthdate of the user in DD-MM-YYYY format
 *                   example: "02-12-1998"
 *                 interests:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of user interests
 *                   example: ["Make Sure", "This Arrays", "Contains", "at least", "ONE STRING"]
 *       400:
 *         description: Missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message explaining the issue
 *                   example: "Invalid email or password"
 *       404:
 *         description: User not found or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message explaining the issue
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for server issues
 *                   example: "Internal server error"
 */
router.get('/:email', UsersController.getUserByEmailAndPassword);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a paginated list of users or filter by criteria
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: The page index (starting from 0)
 *       - in: query
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The number of users per page
 *       - in: query
 *         name: criteria
 *         required: false
 *         schema:
 *           type: string
 *           enum: [byEmailDomain, byLastname, byMinimumAge]
 *         description: The criteria for filtering users (optional)
 *       - in: query
 *         name: value
 *         required: false
 *         schema:
 *           type: string
 *         description: The value corresponding to the criteria (required if criteria is provided)
 *     responses:
 *       200:
 *         description: A list of users or filtered users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   name:
 *                     type: object
 *                     properties:
 *                       first:
 *                         type: string
 *                       last:
 *                         type: string
 *                   birthdate:
 *                     type: string
 *                   interests:
 *                     type: array
 *                     items:
 *                       type: string
 *       400:
 *         description: Invalid pagination parameters or filtering criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message for server issues
 */
router.get('/', UsersController.getPaginatedUsers);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete all data from the service
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.delete('/', UsersController.deleteAllUsers);

module.exports = router;