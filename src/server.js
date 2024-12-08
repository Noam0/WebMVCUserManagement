const app = require('./app');
const PORT = process.env.PORT || 3000; // Ensure this matches Swagger's URL

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
