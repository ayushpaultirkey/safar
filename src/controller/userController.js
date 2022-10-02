const { AppConfig } = require("../config/app.config");
const mysql = require("mysql");
const path = require("path");
const formidable = require("formidable");
const fs = require("fs");

/**
    * User controller object
*/
const UserController = {};
UserController.Photo = {};



/**
    * Get current user detail
*/
UserController.Detail = function(req, res) {

    //Response object
    let _response = { message: "", success: false, redirect: "" };

    //#region Check if cookie exists
    //Else perform task
    if(typeof req.cookies.safar_cookie == "undefined") {

        //#region Error response
        //Update response object
        _response.message = "No user found";
        _response.success = false;
        //response
        res.json(_response);
        //#endregion
    
    }
    else {

        //Get cookie values
        let _user_id = req.cookies.safar_cookie;

        //#region Check if all query value are not empty
        //Else display error message
        if(typeof _user_id !== "undefined" && _user_id.length > 0) {
    
            //#region Create MySQL connection
            var con = mysql.createConnection({
                host: AppConfig.MySQLServer.Host,
                user: AppConfig.MySQLServer.Username,
                password: AppConfig.MySQLServer.Password,
                database: AppConfig.MySQLServer.Database.Safar
            });
            //#endregion
    
            //#region Connect to MySQL server
            //If connected then execute sql
            //Else display error message
            con.connect(function(error) {
                if(error) {

                    //#region Error response
                    _response.message = "Unable to check user, UCD0";
                    res.json(_response);
                    console.log(`controller/usercontroller/detail: ${error.message}`);
                    //#endregion

                }
                else {
    
                    //#region Prepare data to insert into query
                    //mysql.escape() used to prevent sql injection
                    _user_id = mysql.escape(_user_id);
    
                    //Prepare query for execution
                    let _query = `SELECT
                        ID as user_id,
                        Name as user_name,
                        Photo as user_photo
                    FROM \`User\` WHERE ID = ${_user_id};`;
                    //#endregion
    
                    //#region Execute query
                    //And check result
                    con.query(_query, function (error, result) {
                        if(error) {

                            //#region Error response
                            _response.message = "Unable to check user, UCD0";
                            res.json(_response);
                            console.log(`controller/usercontroller/detail: ${error.message}`);
                            //#endregion

                        }
                        else {
    
                            //#region Check if result is not empty and send response
                            if(result.length > 0) {
                                _response.data = result[0];
                                _response.success = true;
                            }
                            else {
                                _response.message = "Unable to find user";
                            };
                            
                            //response
                            res.json(_response);
                            //#endregion
    
                        };
                    });
                    //#endregion
    
                };
            });
            //#endregion
    
        }
        else {

            //#region Error response
            _response.message = "Invalid user id";
            res.json(_response);
            //#endregion

        };
        //#endregion

    }
    //#endregion

};



/**
    * Returns user's information
*/
UserController.Get = function(req, res) {

    //Response object
    let _response = { message: "", success: false, data: {}, redirect: "" };

    //Get querystring values
    let _user_id = req.query.id;

    //#region Check if all query value are not empty
    if(typeof _user_id !== "undefined" && _user_id.length > 0) {

        //#region Create MySQL connection
        var con = mysql.createConnection({
            host: AppConfig.MySQLServer.Host,
            user: AppConfig.MySQLServer.Username,
            password: AppConfig.MySQLServer.Password,
            database: AppConfig.MySQLServer.Database.Safar
        });
        //#endregion

        //#region Connect to MySQL server
        //If success then execute sql
        con.connect(function(error) {
            if(error) {

                //#region Error response
                if(error) {
                    _response.message = "Internal server error, E0";
                    res.json(_response);
                    console.log(`controller/usercontroller/get: ${error.message}`);
                };
                //#endregion

            }
            else {

                //#region Prepare data to insert into query
                //mysql.escape() used to prevent sql injection
                _user_id = mysql.escape(_user_id);

                //Prepare query for execution
                let _query = `SELECT
                    ID as user_id,
                    Name as user_name,
                    Photo as user_photo
                FROM \`User\` WHERE ID = ${_user_id};`;
                //#endregion

                //#region Execute query
                con.query(_query, function (error, result) {
                    if(error) {

                        //#region Error response
                        if(error) {
                            _response.message = "Internal server error, E1";
                            res.json(_response);
                            console.log(`controller/usercontroller/get: ${error.message}`);
                        };
                        //#endregion

                    }
                    else {

                        //#region Check if result is not empty and send response
                        if(result.length > 0) {
                            _response.data = result[0];
                            _response.success = true;
                        }
                        else {
                            _response.message = "Unable to find user";
                        }
                        
                        //response
                        res.json(_response);
                        //#endregion

                    };
                });
                //#endregion

            };
        });
        //#endregion

    }
    else {

        //#region Error response
        _response.message = "Invalid user id";
        res.json(_response);
        //#endregion
    
    };
    //#endregion

};



/**
    * Returns photos uploaded by the user
    * @param id - `int` passed by query string
*/
UserController.Photo.List = function(req, res) {

    //Response object
    let _response = { message: "", success: false, data: {}, redirect: "" };

    //#region Check if cookie exists
    //Else perform task
    if(typeof req.cookies.safar_cookie == "undefined") {

        //#region Error response
        //Update response object
        _response.message = "No user found";
        _response.success = false;
        //response
        res.json(_response);
        //#endregion
    
    }
    else {

        //Get querystring values
        let _user_id = req.query.id;

        //#region Check if all query value are not empty
        //Else display error message
        if(typeof _user_id !== "undefined" && _user_id.length > 0) {
    
            //#region Create MySQL connection
            var con = mysql.createConnection({
                host: AppConfig.MySQLServer.Host,
                user: AppConfig.MySQLServer.Username,
                password: AppConfig.MySQLServer.Password,
                database: AppConfig.MySQLServer.Database.Safar
            });
            //#endregion
    
            //#region Connect to MySQL server
            //If connected then execute sql
            //Else display error message
            con.connect(function(error) {
                if(error) {

                    //#region Error response
                    _response.message = "Internal server error, E0";
                    res.json(_response);
                    console.log(`controller/usercontroller/photo/list: ${error.message}`);
                    //#endregion

                }
                else {
    
                    //#region Prepare data to insert into query
                    //mysql.escape() used to prevent sql injection
                    _user_id = mysql.escape(_user_id);
    
                    //Prepare query for execution
                    let _query = `SELECT
                        ID AS photo_id,
                        PlaceID AS place_id,
                        Path AS photo_path,
                        Date AS photo_date,
                        (SELECT Place.Name FROM Place WHERE Place.ID = PlacePhoto.PlaceID) AS photo_place
                    FROM \`PlacePhoto\` WHERE UserID = ${_user_id};`;
                    //#endregion
    
                    //#region Execute query
                    //And check result
                    con.query(_query, function (error, result) {
                        if(error) {

                            //#region Error response
                            _response.message = "Internal server error, E1";
                            res.json(_response);
                            console.log(`controller/usercontroller/photo/list: ${error.message}`);
                            //#endregion

                        }
                        else {
    
                            //#region Check if result is not empty and send response
                            if(result.length > 0) {
                                _response.data = result;
                                _response.success = true;
                            }
                            else {
                                _response.message = "Unable to find photo";
                            };
                            
                            //response
                            res.json(_response);
                            //#endregion
    
                        };
                    });
                    //#endregion
    
                };
            });
            //#endregion
    
        }
        else {

            //#region Error response
            _response.message = "Invalid user id";
            res.json(_response);
            //#endregion

        };
        //#endregion

    }
    //#endregion

};



/**
    * Upload photo to upload/image/ folder and add it as profile picture
    * @param file - `file` passed by formdata
*/
UserController.Photo.Upload = function(req, res) {

    //Response object
    let _response = { message: "", success: false, redirect: "" };

    //#region Check if cookie exists
    //Else perform task
    if(typeof req.cookies.safar_cookie == "undefined") {

        //#region Error response
        //Update response object
        _response.message = "No user found";
        _response.success = false;
        //response
        res.json(_response);
        //#endregion

    }
    else {

        //#region Get form data and upload folder path
        let _form = new formidable.IncomingForm();
        let _public_path = "./../../upload/image/";
        //#endregion
    
        //#region Process the uploaded file
        //Read, Write then Delete
        _form.parse(req, function (error, field, file) {

            //#region Uploaded file path
            //console.log(field.detail);
            let _date = new Date();
            let _date_d = _date.getDate();
            let _date_M = _date.getMonth();
            let _date_y = _date.getFullYear();
            let _date_h = _date.getHours();
            let _date_m = _date.getMinutes();
            let _date_s = _date.getSeconds();
            let _date_i = _date.getMilliseconds();
            let _date_filename = `${_date_d}${_date_M}${_date_y}_${_date_i}${_date_s}${_date_m}${_date_h}${path.extname(file.fileupload.originalFilename)}`;

            let _old_path = file.fileupload.filepath;
            let _new_path = path.join(__dirname, _public_path) + "/" + _date_filename;
            //#endregion

            //#region Read the uploaded file
            fs.readFile(_old_path, function(error, data) {

                //#region Error response
                if(error) {
                    _response.message = "Unable to upload image, ERROR:UCPU0";
                    res.json(_response);
                    console.log("controller/usercontroller/photo/upload: Unable to locate uploaded file");
                };
                //#endregion
    
                //#region Create new file in /upload/image folder
                fs.writeFile(_new_path, data, function (error) {

                    //#region Error response
                    if(error) {
                        _response.message = "Unable to upload image, ERROR:UCPU1";
                        res.json(_response);
                        console.log("controller/usercontroller/photo/upload: Unable to create new file");
                    };
                    //#endregion
                                
                    //#region Create MySQL connection
                    var con = mysql.createConnection({
                        host: AppConfig.MySQLServer.Host,
                        user: AppConfig.MySQLServer.Username,
                        password: AppConfig.MySQLServer.Password,
                        database: AppConfig.MySQLServer.Database.Safar
                    });
                    //#endregion

                    //#region Connect to MySQL server
                    //If success then execute sql
                    con.connect(function(error) {
                        if(error) {

                            //#region Error response
                            if(error) {
                                _response.message = "Unable to upload image, ERROR:UCPU2";
                                res.json(_response);
                                console.log(`controller/usercontroller/photo/upload: ${error.message}`);
                            };
                            //#endregion

                        }
                        else {

                            //#region Prepare data to insert into query
                            //mysql.escape() used to prevent sql injection
                            let _user_id = mysql.escape(req.cookies.safar_cookie);
                            let _photo_path = mysql.escape(_new_path);

                            //Prepare query for execution
                            let _query = `UPDATE \`User\` SET Photo = '/upload/image/${_date_filename}' WHERE ID = ${_user_id};`;
                            //#endregion

                            //#region Execute query
                            con.query(_query, function (error, result) {
                                if(error) {

                                    //#region Error response
                                    if(error) {
                                        _response.message = "Internal server error, E1";
                                        res.json(_response);
                                        console.log(`controller/usercontroller/get: ${error.message}`);
                                    };
                                    //#endregion

                                }
                                else {

                                    //Update response object and send it
                                    _response.message = "Profile picture updated";
                                    _response.success = true;
                                    res.json(_response);

                                };
                            });
                            //#endregion

                        };
                    });
                    //#endregion

                });
                //#endregion
    
                //#region Delete the old file
                fs.unlink(_old_path, function (error) {

                    //#region Error response
                    if(error) {
                        console.log("controller/usercontroller/photo/upload: Unable to delete old file");
                    };
                    //#endregion

                });
                //#endregion
    
            });
            //#endregion
    
        });
        //#endregion

    };
    //#endregion

};


/**
    * Check if user exists
*/
UserController.Check = function(req, res) {

    //Response object
    let _response = { message: "", success: false, redirect: "" };

    //#region Check if cookie exists
    //Else perform task
    if(typeof req.cookies.safar_cookie == "undefined") {

        //#region Error response
        //Update response object
        _response.message = "No user found";
        _response.success = false;
        //response
        res.json(_response);
        //#endregion
    
    }
    else {

        //Get cookie values
        let _user_id = req.cookies.safar_cookie;

        //#region Check if all query value are not empty
        //Else display error message
        if(typeof _user_id !== "undefined" && _user_id.length > 0) {
    
            //#region Create MySQL connection
            var con = mysql.createConnection({
                host: AppConfig.MySQLServer.Host,
                user: AppConfig.MySQLServer.Username,
                password: AppConfig.MySQLServer.Password,
                database: AppConfig.MySQLServer.Database.Safar
            });
            //#endregion
    
            //#region Connect to MySQL server
            //If connected then execute sql
            //Else display error message
            con.connect(function(error) {
                if(error) {

                    //#region Error response
                    _response.message = "Unable to check user, UCCU0";
                    res.json(_response);
                    console.log(`controller/usercontroller/checkuser: ${error.message}`);
                    //#endregion

                }
                else {
    
                    //#region Prepare data to insert into query
                    //mysql.escape() used to prevent sql injection
                    _user_id = mysql.escape(_user_id);
    
                    //Prepare query for execution
                    let _query = `SELECT ID FROM \`User\` WHERE ID = ${_user_id};`;
                    //#endregion
    
                    //#region Execute query
                    //And check result
                    con.query(_query, function (error, result) {
                        if(error) {

                            //#region Error response
                            _response.message = "Unable to check user, UCCU0";
                            res.json(_response);
                            console.log(`controller/usercontroller/checkuser: ${error.message}`);
                            //#endregion

                        }
                        else {
    
                            //#region Check if result is not empty and send response
                            if(result.length > 0) {
                                _response.success = true;
                            }
                            else {
                                _response.message = "Unable to find user";
                            };
                            
                            //response
                            res.json(_response);
                            //#endregion
    
                        };
                    });
                    //#endregion
    
                };
            });
            //#endregion
    
        }
        else {

            //#region Error response
            _response.message = "Invalid user id";
            res.json(_response);
            //#endregion

        };
        //#endregion

    }
    //#endregion

};


/**
    * Delete user if exists
*/
UserController.Remove = function(req, res) {

    //Response object
    let _response = { message: "", success: false, redirect: "" };

    //#region Check if cookie exists
    //Else perform task
    if(typeof req.cookies.safar_cookie == "undefined") {

        //#region Error response
        //Update response object
        _response.message = "No user found";
        _response.success = false;
        //response
        res.json(_response);
        //#endregion
    
    }
    else {

        //Get cookie values
        let _user_id = req.cookies.safar_cookie;

        //#region Check if all query value are not empty
        //Else display error message
        if(typeof _user_id !== "undefined" && _user_id.length > 0) {
    
            //#region Create MySQL connection
            var con = mysql.createConnection({
                host: AppConfig.MySQLServer.Host,
                user: AppConfig.MySQLServer.Username,
                password: AppConfig.MySQLServer.Password,
                database: AppConfig.MySQLServer.Database.Safar
            });
            //#endregion
    
            //#region Connect to MySQL server
            //If connected then execute sql
            //Else display error message
            con.connect(function(error) {
                if(error) {

                    //#region Error response
                    _response.message = "Unable to delete user, UCD0";
                    res.json(_response);
                    console.log(`controller/usercontroller/remove: ${error.message}`);
                    //#endregion

                }
                else {
    
                    //#region Prepare data to insert into query
                    //mysql.escape() used to prevent sql injection
                    _user_id = mysql.escape(_user_id);
    
                    //Prepare query for execution
                    let _query = `DELETE FROM \`User\` WHERE ID = ${_user_id};`;
                    //#endregion
    
                    //#region Execute query
                    //And check result
                    con.query(_query, function (error, result) {
                        if(error) {

                            //#region Error response
                            _response.message = "Unable to delete user, UCD1";
                            res.json(_response);
                            console.log(`controller/usercontroller/remove: ${error.message}`);
                            //#endregion

                        }
                        else {
    
                            //#region Check if result is not empty and send response
                            res.clearCookie("safar_cookie");
                            _response.redirect = "/home";
                            _response.success = true;
                            
                            //response
                            res.json(_response);
                            //#endregion
    
                        };
                    });
                    //#endregion
    
                };
            });
            //#endregion
    
        }
        else {

            //#region Error response
            _response.message = "Invalid user id";
            res.json(_response);
            //#endregion

        };
        //#endregion

    }
    //#endregion

};

module.exports = { UserController }

