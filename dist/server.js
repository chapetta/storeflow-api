"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 3001;
const server = app_1.app.listen(PORT, () => {
    console.log(`🚀 HTTP server running on port ${PORT}`);
});
server.on("error", (error) => {
    console.error("HTTP server error:", error);
});
server.on("close", () => {
    console.log("HTTP server closed");
});
