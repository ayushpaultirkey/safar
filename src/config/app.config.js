const crypto = require("crypto");

const AppConfig = {};

AppConfig.MySQLServer = {
    Host: "127.0.0.1",
    Username: "root",
    Password: "",
    Database: {
        Safar: "Safar"
    }
}

module.exports = { AppConfig };