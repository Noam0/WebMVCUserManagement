const express = require('express');
const DevelopersController = require('../controllers/developersController');

const router = express.Router();

/**
 * @swagger
 * /developers:
 *   post:
 *     summary: Register a new developer
 *     tags: [Developers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:    # Required fields
 *               - email
 *               - name
 *               - apiKey
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Developer's email address
 *               name:
 *                 type: string
 *                 description: Name of the developer
 *               apiKey:
 *                 type: string
 *                 description: API key for the developer
 *               password:
 *                 type: string
 *                 description: Password for the developer
 *     responses:
 *       201:
 *         description: Developer registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Developer's email address
 *                 name:
 *                   type: string
 *                   description: Name of the developer
 *                 apiKey:
 *                   type: string
 *                   description: API key for the developer
 *                 password:
 *                   type: string
 *                   description: Hashed password (optional display, for demonstration purposes)
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/', DevelopersController.registerDeveloper);

/**
 * @swagger
 * /developers/{email}:
 *   get:
 *     summary: Get developer by email
 *     tags: [Developers]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           description: The email of the developer
 *     responses:
 *       200:
 *         description: The developer data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Developer's email address
 *                 name:
 *                   type: string
 *                   description: Name of the developer
 *                 apiKey:
 *                   type: string
 *                   description: API key for the developer
 *       404:
 *         description: Developer not found
 *       500:
 *         description: Internal server error
 */
router.get('/:email', DevelopersController.getDeveloper);

/**
 * @swagger
 * /developers/{email}/applications:
 *   get:
 *     summary: Retrieve all applications registered by a specific developer
 *     tags: [Developers]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the developer
 *     responses:
 *       200:
 *         description: A list of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   appId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Developer not found or no applications registered
 *       500:
 *         description: Internal server error
 */
router.get('/:email/applications', DevelopersController.getDeveloperApplications);


module.exports = router;
