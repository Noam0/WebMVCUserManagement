const express = require('express');
const UsersController = require('../controllers/usersController');

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
 *               - firstName
 *               - lastName
 *               - password
 *               - birthdate
 *               - interests
 *             properties:
 *               email:
 *                 type: string
 *                 description: Unique email for the user
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
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
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 birthdate:
 *                   type: string
 *                   description: Birthdate in DD-MM-YYYY format
 *                 interests:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Internal server error
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
 *           description: Email of the user
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *           description: Password of the user
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
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 birthdate:
 *                   type: string
 *                 interests:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Missing or invalid parameters
 *       404:
 *         description: User not found or invalid credentials
 *       500:
 *         description: Internal server error
 */
router.get('/:email', UsersController.getUserByEmailAndPassword);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a paginated list of users
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
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   birthdate:
 *                     type: string
 *                   interests:
 *                     type: array
 *                     items:
 *                       type: string
 *       400:
 *         description: Invalid pagination parameters
 *       500:
 *         description: Internal server error
 */
router.get('/', UsersController.getPaginatedUsers);




/**
 * @swagger
 * /users/filter:
 *   get:
 *     summary: Retrieve filtered users with pagination
 *     tags: [Users]
 *     parameters:
 *       - name: criteria
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           enum: [byEmailDomain, byLastname, byMinimumAge]
 *         description: The criteria for filtering users
 *       - name: value
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The value for the specified criteria
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: The page index (starting from 0)
 *       - name: size
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The number of users per page
 *     responses:
 *       200:
 *         description: A list of filtered users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   description: The user's email
 *                   first_name:
 *                     type: string
 *                     description: The user's first name
 *                   last_name:
 *                     type: string
 *                     description: The user's last name
 *                   birthdate:
 *                     type: string
 *                     description: The user's birthdate in DD-MM-YYYY format
 *                   interests:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The user's interests
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message explaining the issue
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
//router.get('/filter', UsersController.filterUsers);




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
