const server = require('./api/server.js');

const port = 5000;

server.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
})