const { AppConfig } = require("./../config/app.config");
const mysql = require("mysql");

/**
    * Authentication controller object
*/
const AuthController = {};


/**
    * Check user and create cookie and redirect on successfully login
    * @param username - `string` passed by query string
    * @param password - `string` passed by query string
*/
AuthController.Login = function(req, res) {

    //Response object
    let _response = { message: "", success: false, redirect: "" };

    //#region Check if cookie exists
    //Else perform task
    if(typeof req.cookies.safar_cookie !== "undefined") {

        //#region Error response
        //Update response object
        _response.message = "User already logined, logout first";
        _response.success = false;
        //response
        res.json(_response);
        //#endregion
    
    }
    else {
        
        //Get querystring values
        let _user_username = req.query.username;
        let _user_password = req.query.password;

        //#region Check if all query value are not empty
        //Else display error message
        if( (typeof _user_username !== "undefined" && _user_username.length > 2) &&
            (typeof _user_password !== "undefined" && _user_password.length > 2)) {

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
            con.connect(function(error) {
                if(error) {

                    //#region Error response
                    _response.message = "Internal server error, ERROR: ACL0";
                    res.json(_response);
                    console.log(`controller/authcontroller/login: ${error.message}`);
                    //#endregion

                }
                else {

                    //#region Prepare data to insert into query
                    //mysql.escape() used to prevent sql injection
                    _user_username = mysql.escape(_user_username);
                    _user_password = mysql.escape(_user_password);

                    //Prepare query for execution
                    let _query = `SELECT ID FROM \`User\` WHERE Username = ${_user_username} AND Password = ${_user_password};`;
                    //#endregion

                    //#region Execute query
                    //And check result
                    con.query(_query, function (error, result) {
                        if(error) {

                            //#region Error response
                            _response.message = "Internal server error, ERROR: ACL1";
                            res.json(_response);
                            console.log(`controller/authcontroller/login: ${error.message}`);
                            //#endregion

                        }
                        else {

                            //#region Check if username and password exists in table
                            //if true then redirect to home and create cookie
                            //else send message
                            if(result.length > 0) {

                                _response.redirect = "/home";
                                _response.success = true;
                                res.cookie("safar_cookie", result[0].ID, { maxAge: 360000, secure: true, httpOnly: true });

                            }
                            else {
                                _response.message = "Incorrect username or password";
                                _response.success = false;
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
            _response.message = "Enter username and password";
            res.json(_response);
            //#endregion

        };
        //#endregion

    };

};



/**
    * Check if username exists, if not then create new user, cookie, and redirect
    * @param name - `string` passed by query string
    * @param username - `string` passed by query string
    * @param password - `string` passed by query string
    * @param address - `string` passed by query string
    * @param email - `string` passed by query string
    * @param gender - `string` passed by query string
*/
AuthController.Signup = function(req, res) {

    //Response object
    let _response = { message: "", success: false, redirect: "" };

    //#region Check if cookie exists
    //Else perform task
    if(typeof req.cookies.safar_cookie !== "undefined") {

        //#region Error response
        //Update response object
        _response.message = "User already logined, logout first";
        _response.success = false;
        //response
        res.json(_response);
        //#endregion
    
    }
    else {

        //Get querystring values
        let _user_name = req.query.name;
        let _user_username = req.query.username;
        let _user_password = req.query.password;
        let _user_state = req.query.state;

        //#region Check if all query value are not empty
        //Else display error message
        if( (typeof _user_name      !== "undefined" && _user_name.length        > 2) &&
            (typeof _user_username  !== "undefined" && _user_username.length    > 2) &&
            (typeof _user_password  !== "undefined" && _user_password.length    > 2) &&
            (typeof _user_state     !== "undefined" && _user_state.length       > 2)) {

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
            con.connect(function(error) {
                if(error) {
                    
                    //#region Error response
                    _response.message = "Unable to signup, ERROR: ACS0";
                    res.json(_response);
                    console.log(`controller/authcontroller/signup: ${error.message}`);
                    //#endregion

                }
                else {

                    //#region Prepare data to insert into query
                    //mysql.escape() used to prevent sql injection
                    _user_name      = mysql.escape(_user_name);
                    _user_username  = mysql.escape(_user_username);
                    _user_password  = mysql.escape(_user_password);
                    _user_state     = mysql.escape(_user_state);

                    //Prepare query for execution
                    let _query = `INSERT INTO \`User\` (Name,Username,Password)
                    SELECT * FROM (SELECT ${_user_name} AS t_name, ${_user_username} AS t_username, ${_user_password} AS t_password) AS tmp
                    WHERE NOT EXISTS (
                        SELECT Username FROM \`User\` WHERE Username = ${_user_username}
                    ) LIMIT 1;`;
                    //#endregion
                        
                    //#region Execute query
                    //And check result
                    con.query(_query, function (error, result) {
                        if(error) {

                            //#region Error response
                            _response.message = "Unable to signup, ERROR: ACS1";
                            res.json(_response);
                            console.log(`controller/authcontroller/signup: ${error.message}`);
                            //#endregion

                        }
                        else {

                            //Get new user id
                            let _user_id = result.insertId;

                            //#region Check if user is added to table
                            //if _user_id > 0 then user is added
                            //else show messge to change username
                            if(_user_id > 0) {

                                //Update response object
                                _response.message = "User created";
                                _response.success = true;
                                _response.redirect = "/home";

                                res.cookie("safar_cookie", _user_id, { maxAge: 360000, secure: true, httpOnly: true });

                            }
                            else {
                                _response.message = "This username is already taken";
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
            _response.message = "Enter the following fields";
            res.json(_response);
            //#endregion

        };
        //#endregion

    }
    //#endregion


    
};


/**
    * Check if cookie exists, if exist then delete it
*/
AuthController.Logout = function(req, res) {

    //Response object
    let _response = { message: "", success: false, redirect: "" };

    //#region Check if cookie exists
    //Delete if cookie exists
    if(typeof req.cookies.safar_cookie !== "undefined") {

        //Update response object
        _response.success = true;

        //response
        res.clearCookie("safar_cookie");
        res.json(_response);

    }
    else {

        _response.message = "No user to logout";
        res.json(_response);

    };
    //#endregion

};


module.exports = { AuthController }