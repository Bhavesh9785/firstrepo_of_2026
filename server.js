// Simple Express backend to serve static files
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the demo directory
app.use(express.static(__dirname));

// Optional: API endpoint for future backend features
// app.use(express.json());
// app.post('/api/users', (req, res) => {
//     // Handle user data here
//     res.json({ message: 'User received!' });
// });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});