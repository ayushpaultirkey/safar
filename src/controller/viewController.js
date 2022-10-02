const path = require("path");

var _publicPath = "./../../public/view";

const ViewController = {};


ViewController.Auth = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/auth.html`));
};
ViewController.Login = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/login.html`));
};
ViewController.Register = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/signup.html`));
};
ViewController.Search = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/search.html`));
};
ViewController.State = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/state.html`));
};
ViewController.User = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/user.html`));
};
ViewController.Place = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/place.html`));
};
ViewController.Home = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/home.html`));
};
ViewController.Test = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/test.html`));
};

ViewController.About = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/about.html`));
};
ViewController.Contact = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/contact.html`));
};
ViewController.Gallery = function(req, res) {
    res.sendFile(path.join(__dirname, `${_publicPath}/gallery.html`));
};

module.exports = { ViewController }