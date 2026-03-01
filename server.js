const express = require('express');
const app = express();
app.use(express.json());

let users = [];

app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.status(201).json({ message: 'Account created successfully' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', token: 'dummy-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));