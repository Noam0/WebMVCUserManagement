<h1 align="center">WebMVCUserManagement</h1>

<p align="center">
  A RESTful microservice project for managing users, built with Node.js, PostgreSQL, and Docker.
</p>

<h2>🎓 About the Project</h2>

<p>This project is created as part of the <strong>Cloud Programming Course</strong>. The goal is to implement a scalable microservice using modern development practices like Dockerization and database integration.</p>

<h2>🛠️ Technologies Used</h2>

<ul>
  <li><strong>Node.js</strong> - Backend server</li>
  <li><strong>PostgreSQL</strong> - Database</li>
  <li><strong>Docker</strong> - Containerization</li>
  <li><strong>Swagger</strong> - API Documentation</li>
</ul>

<h2>🚀 Features</h2>

<ul>
  <li>Create, retrieve, and manage users</li>
  <li>Filter users by criteria (e.g., email domain, last name, minimum age)</li>
  <li>Paginated retrieval of user data</li>
  <li>Full Dockerized environment for seamless setup</li>
</ul>

<h2>📦 Installation</h2>

<p>Follow the steps below to set up the project on your local machine:</p>

<ol>
  <li>Clone the repository:
    <pre>
      <code>git clone https://github.com/your-username/WebMVCUserManagement.git</code>
    </pre>
  </li>
  <li>Navigate to the project folder:
    <pre>
      <code>cd WebMVCUserManagement</code>
    </pre>
  </li>
  <li>Run the application using Docker Compose:
    <pre>
      <code>docker-compose up --build</code>
    </pre>
  </li>
</ol>

<h2>🌐 Access</h2>

<ul>
  <li>API Base URL: <code>http://localhost:3000</code></li>
  <li>Swagger Documentation: <code>http://localhost:3000/api-docs</code></li>
  <li>Database: <code>localhost:5433</code> (PostgreSQL)</li>
</ul>

<h2>📝 Notes</h2>

<ul>
  <li>Make sure Docker is installed on your system before running the project.</li>
  <li>The default database credentials are configured in <code>docker-compose.yml</code>.</li>
</ul>

<h2>👩‍💻 Contributors</h2>

<p>This project is part of a group assignment for the Cloud Programming course.</p>
