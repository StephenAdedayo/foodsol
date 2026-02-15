const { app } = require("./app");
const http = require("http");
const { PORT } = require("./config/keys");


const server = http.createServer(app)

server.listen(PORT, "0.0.0.0", () => console.log("Server Started Successfully on Port", PORT))