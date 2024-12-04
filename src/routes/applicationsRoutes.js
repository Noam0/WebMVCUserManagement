const express = require('express');
const ApplicationsController = require('../controllers/applicationsController');

const router = express.Router();

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Register a new application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appId
 *               - developerEmail
 *               - name
 *             properties:
 *               appId:
 *                 type: string
 *                 description: The unique ID of the application
 *               developerEmail:
 *                 type: string
 *                 description: The email of the developer registering the application
 *               name:
 *                 type: string
 *                 description: The name of the application
 *               description:
 *                 type: string
 *                 description: A brief description of the application
 *     responses:
 *       201:
 *         description: Application registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 appId:
 *                   type: string
 *                   description: The unique ID of the application
 *                 developerEmail:
 *                   type: string
 *                   description: The email of the developer
 *                 name:
 *                   type: string
 *                   description: The name of the application
 *                 description:
 *                   type: string
 *                   description: A brief description of the application
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/', ApplicationsController.registerApplication);

/**
 * @swagger
 * /applications/{appId}:
 *   get:
 *     summary: Get application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique ID of the application
 *     responses:
 *       200:
 *         description: Application retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 appId:
 *                   type: string
 *                   description: The unique ID of the application
 *                 developerEmail:
 *                   type: string
 *                   description: The email of the developer who owns the application
 *                 name:
 *                   type: string
 *                   description: The name of the application
 *                 description:
 *                   type: string
 *                   description: A brief description of the application
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the application was registered
 *       404:
 *         description: Application not found
 *       500:
 *         description: Internal server error
 */
router.get('/:appId', ApplicationsController.getApplication);


module.exports = router;
