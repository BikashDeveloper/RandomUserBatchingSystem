const app = require("./app");
const config = require("./config/config");

app.listen(config.server.port, () => {
    console.log(`Server running at http://localhost:${config.server.port}`);
});
