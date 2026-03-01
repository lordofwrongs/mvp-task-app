const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// In-memory users array (for MVP)
let users = [];

// ===== API Endpoints =====

// Signup
app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.status(201).json({ message: 'Account created successfully' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', token: 'dummy-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

// ===== Serve React Frontend =====
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to send index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
