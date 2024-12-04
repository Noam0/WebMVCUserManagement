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
 *               - userId
 *               - appId
 *               - firstSeen
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Unique identifier for the user
 *               appId:
 *                 type: string
 *                 description: ID of the application the user belongs to
 *               firstSeen:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp when the user first interacted with the app
 *               lastSeen:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp when the user last interacted with the app (optional)
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 appId:
 *                   type: string
 *                 firstSeen:
 *                   type: string
 *                   format: date-time
 *                 lastSeen:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/', UsersController.createUser);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by userId and appId
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the user
 *       - in: query
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the application the user belongs to
 *     responses:
 *       200:
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 appId:
 *                   type: string
 *                 firstSeen:
 *                   type: string
 *                   format: date-time
 *                 lastSeen:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userId', UsersController.getUser);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appId
 *             properties:
 *               appId:
 *                 type: string
 *                 description: ID of the application the user belongs to
 *               lastSeen:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp when the user last interacted with the app
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 appId:
 *                   type: string
 *                 firstSeen:
 *                   type: string
 *                   format: date-time
 *                 lastSeen:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:userId', UsersController.updateUser);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the user
 *       - in: query
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the application the user belongs to
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:userId', UsersController.deleteUser);

/**
 * @swagger
 * /users/GetAllAppUsersByAppID/{appId}:
 *   get:
 *     summary: Retrieve all users for a specific application
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the application
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
 *                   userId:
 *                     type: string
 *                   appId:
 *                     type: string
 *                   firstSeen:
 *                     type: string
 *                     format: date-time
 *                   lastSeen:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No users found for this application
 *       500:
 *         description: Internal server error
 */
router.get('/GetAllAppUsersByAppID/:appId', UsersController.getUsersByApplication);

module.exports = router;
