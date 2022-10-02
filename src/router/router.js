const express = require("express");
const router = express.Router();


//Controller for displaying markup files
const { ViewController } = require("../controller/viewController");
router.get("/auth", ViewController.Auth);
//router.get("/login", ViewController.Login);
//router.get("/register", ViewController.Register);
router.get("/home", ViewController.Home);
router.get("/search", ViewController.Search);
router.get("/place", ViewController.Place);
router.get("/state", ViewController.State);
router.get("/user", ViewController.User);
router.get("/test", ViewController.Test);
router.get("/about", ViewController.About);
router.get("/contact", ViewController.Contact);
router.get("/gallery", ViewController.Gallery);


//Controller for authentication
const { AuthController } = require("../controller/authController");
router.get("/api/auth/login", AuthController.Login);
router.get("/api/auth/signup", AuthController.Signup);
router.get("/api/auth/logout", AuthController.Logout);


//Controller for place and review
const { PlaceController } = require("../controller/placeController");
router.get("/api/place/search", PlaceController.Place.Search);
router.get("/api/place/get", PlaceController.Place.Get);
//router.get("/api/place/photo/upload", PlaceController.Place.Get); //add new photo
//router.get("/api/place/request", PlaceController.Place.Get); //add new place
router.get("/api/review/list", PlaceController.Review.List);
//router.get("/api/review/add", PlaceController.Review.Add); //add new review
//router.get("/api/review/delete", PlaceController.Review.Delete); //delete new review


//Controller for user
const { UserController } = require("../controller/userController");
router.get("/api/user/check", UserController.Check);
router.get("/api/user/detail", UserController.Detail);
router.get("/api/user/get", UserController.Get);
router.get("/api/user/photo/list", UserController.Photo.List);
router.post("/api/user/photo/upload", UserController.Photo.Upload);
router.get("/api/user/remove", UserController.Remove);


module.exports = router;