const express = require('express');
const app = express();
const port = 3000; // Choose an available port

app.get('/callback', (req, res) => {
    const code = req.query.code;
    // Send the code to your discord bot using webhooks or some other method
    console.log("Code received:", code)
    // Respond to GitHub
    res.send('GitHub authorization successful. You can now close this window.');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
