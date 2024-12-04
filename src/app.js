const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swaggerConfig');
const cors = require('cors');

const developersRoutes = require('./routes/developersRoutes');
const applicationsRoutes = require('./routes/applicationsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
app.use(bodyParser.json());

// API Routes
app.use('/api/developers', developersRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/users', usersRoutes);
app.use(cors());
// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
