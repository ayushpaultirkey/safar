const { AppConfig } = require("./../config/app.config");
const mysql = require("mysql");
const path = require("path");

/**
    * Place controller object
*/
const PlaceController = {};
PlaceController.Place = {};
PlaceController.Review = {};



/**
    * Returns place list
    * @param name - `string` passed by query string
    * @param city - `string` passed by query string
    * @param state - `string` passed by query string
*/
PlaceController.Place.Search2 = function(req, res) {

    //Response object
    let _response = { message: "", success: false, data: [], redirect: "" };

    //Get querystring values
    let _place_name = req.query.name;
    let _place_city = req.query.city;
    let _place_state = req.query.state;

    //#region Check if all query value are not empty
    if( (typeof _place_state    !== "undefined") ||
        (typeof _place_city     !== "undefined") ||
        (typeof _place_name     !== "undefined")) {

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
                if(error) {
                    _response.message = "Unable to search place, ERROR:PCS0";
                    res.json(_response);
                    console.log(`controller/placecontroller/search: ${error.message}`);
                };
                //#endregion
                
            }
            else {

                //#region Prepare data to insert into query
                //mysql.escape() used to prevent sql injection
                _place_name = mysql.escape(`%${_place_name}%`);
                _place_city = mysql.escape(`%${_place_city}%`);
                _place_state = mysql.escape(`%${_place_state}%`);

                //Create query parts according to query string
                let _query_fragment = "";
                let _query_name  = "";
                let _query_city  = "";
                let _query_state = "";
                if(typeof _place_name  !== "undefined" && _place_name.length  > 2 && _place_name.indexOf("undefined")  == -1) { _query_name  += ` Name LIKE ${_place_name} `  ; };
                if(typeof _place_city  !== "undefined" && _place_city.length  > 2 && _place_city.indexOf("undefined")  == -1) { _query_city  += ` City LIKE ${_place_city} `  ; };
                if(typeof _place_state !== "undefined" && _place_state.length > 2 && _place_state.indexOf("undefined") == -1) { _query_state += ` State LIKE ${_place_state} `; };

                //If name.length > 0 then add to query
                if(_query_name.length > 0) {
                    _query_fragment += `WHERE ${_query_name}`;
                }

                //If city.length > 0
                if(_query_city.length > 0) {
                    //Check if name.length > 0 then add city after it
                    //Else add directly to query
                    if(_query_name.length > 0) {
                        _query_fragment += `AND ${_query_city}`;
                    }
                    else {
                        _query_fragment = `WHERE ${_query_city}`;
                    }
                };

                //If state.length > 0
                if(_query_state.length > 0) {
                    //Check if name.length > 0 or city.name > 0 then add state after it
                    //Else add directly to query
                    if(_query_name.length > 0 || _query_city.length > 0) {
                        _query_fragment += `AND ${_query_state}`;
                    }
                    else {
                        _query_fragment = `WHERE ${_query_state}`;
                    }
                };

                //Prepare query for execution
                let _query = `
                SELECT 
                    ID              as place_id,
                    Name            as place_name,
                    Description     as place_description,
                    City            as place_city,
                    State           as place_state,
                    Coordinate      as place_coordinate,
                    (SELECT PlacePhoto.Path from PlacePhoto WHERE PlacePhoto.PlaceID = Place.ID LIMIT 0, 1) as place_photo 
                FROM \`Place\` ${_query_fragment};`;
                //#endregion


                //#region Execute query
                //and check result
                con.query(_query, function (error, result) {
                    if(error) {
                                
                        //#region Error response
                        if(error) {
                            _response.message = "Unable to search place, ERROR:PCS1";
                            res.json(_response);
                            console.log(`controller/placecontroller/search: ${error.message}`);
                        };
                        //#endregion
                    
                    }
                    else {

                        //#region Update response object and send it
                        _response.success = true;
                        _response.data = result;

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
        _response.message = "Enter place's name, city or state";
        res.json(_response);
        //#endregion

    };
    //#endregion

};



PlaceController.Place.Search = function(req, res) {

    //Response object
    let _response = { message: "", success: false, data: [], redirect: "" };

    //Get querystring values
    let _place_name = req.query.name;
    let _place_city = req.query.city;
    let _place_state = req.query.state;

    
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
            if(error) {
                _response.message = "Unable to search place, ERROR:PCS0";
                res.json(_response);
                console.log(`controller/placecontroller/search: ${error.message}`);
            };
            //#endregion
            
        }
        else {


            //Prepare query for execution
            let _query = "";

            
            if( (typeof _place_state !== "undefined") || (typeof _place_city !== "undefined") || (typeof _place_name !== "undefined")) {

                //mysql.escape() used to prevent sql injection
                _place_name = mysql.escape(`%${_place_name}%`);
                _place_city = mysql.escape(`%${_place_city}%`);
                _place_state = mysql.escape(`%${_place_state}%`);

                //Create query parts according to query string
                let _query_fragment = "";
                let _query_name  = "";
                let _query_city  = "";
                let _query_state = "";
                if(typeof _place_name  !== "undefined" && _place_name.length  > 2 && _place_name.indexOf("undefined")  == -1) { _query_name  += ` Name LIKE ${_place_name} `  ; };
                if(typeof _place_city  !== "undefined" && _place_city.length  > 2 && _place_city.indexOf("undefined")  == -1) { _query_city  += ` City LIKE ${_place_city} `  ; };
                if(typeof _place_state !== "undefined" && _place_state.length > 2 && _place_state.indexOf("undefined") == -1) { _query_state += ` State LIKE ${_place_state} `; };

                //If name.length > 0 then add to query
                if(_query_name.length > 0) {
                    _query_fragment += `WHERE ${_query_name}`;
                }

                //If city.length > 0
                if(_query_city.length > 0) {
                    //Check if name.length > 0 then add city after it
                    //Else add directly to query
                    if(_query_name.length > 0) {
                        _query_fragment += `AND ${_query_city}`;
                    }
                    else {
                        _query_fragment = `WHERE ${_query_city}`;
                    }
                };

                //If state.length > 0
                if(_query_state.length > 0) {
                    //Check if name.length > 0 or city.name > 0 then add state after it
                    //Else add directly to query
                    if(_query_name.length > 0 || _query_city.length > 0) {
                        _query_fragment += `AND ${_query_state}`;
                    }
                    else {
                        _query_fragment = `WHERE ${_query_state}`;
                    }
                };

                //Prepare query for execution
                _query = `
                SELECT 
                    ID              as place_id,
                    Name            as place_name,
                    Description     as place_description,
                    City            as place_city,
                    State           as place_state,
                    Coordinate      as place_coordinate,
                    (SELECT PlacePhoto.Path from PlacePhoto WHERE PlacePhoto.PlaceID = Place.ID LIMIT 0, 1) as place_photo 
                FROM \`Place\` ${_query_fragment};`;

            }
            else {
                
                //Prepare query for execution
                _query = `
                SELECT 
                    ID              as place_id,
                    Name            as place_name,
                    Description     as place_description,
                    City            as place_city,
                    State           as place_state,
                    Coordinate      as place_coordinate,
                    (SELECT PlacePhoto.Path from PlacePhoto WHERE PlacePhoto.PlaceID = Place.ID LIMIT 0, 1) as place_photo 
                FROM \`Place\` ORDER BY RAND() LIMIT 5;`;

            };

            //and check result
            con.query(_query, function (error, result) {
                if(error) {
                            
                    if(error) {
                        _response.message = "Unable to search place, ERROR:PCS1";
                        res.json(_response);
                        console.log(`controller/placecontroller/search: ${error.message}`);
                    };
                
                }
                else {

                    _response.success = true;
                    _response.data = result;

                    //response
                    res.json(_response);

                };
            });


        };
    });



};




/**
    * Returns place detail
    * @param id - `int` place ID passed by query string
*/
PlaceController.Place.Get = function(req, res) {

    //Response object
    let _response = { message: "", success: false, data: {}, redirect: "" };

    //Get querystring values
    let _place_id = req.query.id;

    //#region Check if all query value are not empty
    if(typeof _place_id !== "undefined" && _place_id.length > 0) {

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
                if(error) {
                    _response.message = "Unable to place detail, ERROR:PCG0";
                    res.json(_response);
                    console.log(`controller/placecontroller/get: ${error.message}`);
                };
                //#endregion

            }
            else {

                //#region Prepare data to insert into query
                //mysql.escape() used to prevent sql injection
                _place_id = mysql.escape(_place_id);
                
                //Prepare query for execution
                let _query = `
                SELECT
                    ID              as place_id,
                    Name            as place_name,
                    Description     as place_description,
                    State           as place_state,
                    Coordinate      as place_coordinate,
                    (SELECT GROUP_CONCAT(PlacePhoto.Path) from PlacePhoto WHERE PlacePhoto.PlaceID = Place.ID) as place_photo
                FROM \`Place\` WHERE ID = ${_place_id};`;
                //#endregion

                //#region Execute query
                //and check result
                con.query(_query, function (error, result) {
                    if(error) {

                        //#region Error response
                        if(error) {
                            _response.message = "Unable to place detail, ERROR:PCG1";
                            res.json(_response);
                            console.log(`controller/placecontroller/get: ${error.message}`);
                        };
                        //#endregion

                    }
                    else {

                        //#region Check if result is not empty
                        //If not empty then send result
                        //Else send error message
                        if(result.length > 0) {

                            //Update response object
                            _response.success = true;
                            _response.data = result[0];

                            //Check image and create it into array
                            let _place_photo = _response.data.place_photo;
                            if(_place_photo !== null) {
                                _place_photo = _place_photo.split(",");
                            }
                            else {
                                _place_photo = [];
                            };
                            _response.data.place_photo = _place_photo;

                        }
                        else {
                            _response.message = "No place found"
                        };

                        //response
                        res.json(_response);
                        //#endregion

                    };
                });

            };
        });
        //#endregion

    }
    else {

        //#region Error response
        _response.message = "Invalid place's id";
        res.json(_response);
        //#endregion
    
    }
    //#endregion

};



/**
    * Returns review list of place
    * @param id - `int` place ID passed by query string
*/
PlaceController.Review.List = function(req, res) {

    //Response object
    let _response = { message: "", success: false, data: [], redirect: "" };

    //Get querystring values
    let _place_id = req.query.id;

    //#region Check if all query value are not empty
    if(typeof _place_id !== "undefined" && _place_id.length > 0) {

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
                if(error) {
                    _response.message = "Unable to get place review, ERROR:PRL0";
                    res.json(_response);
                    console.log(`controller/placecontroller/review/list: ${error.message}`);
                };
                //#endregion

            }
            else {

                //#region Prepare data to insert into query
                //mysql.escape() used to prevent sql injection
                _place_id = mysql.escape(_place_id);
                
                //Prepare query for execution
                let _query = `
                SELECT
                    ID as review_id,
                    Description as review_description,
                    Rating as review_rating,
                    Date as review_date,
                    (SELECT \`User\`.ID FROM \`User\` WHERE \`User\`.ID = PlaceReview.UserID) AS user_id,
                    (SELECT \`User\`.Name FROM \`User\` WHERE \`User\`.ID = PlaceReview.UserID) AS user_name,
                    (SELECT \`User\`.Photo FROM \`User\` WHERE \`User\`.ID = PlaceReview.UserID) AS user_photo
                FROM PlaceReview WHERE PlaceReview.PlaceID = ${_place_id};`;
                //#endregion

                //#region Execute query
                //and check result
                con.query(_query, function (error, result) {
                    if(error) {
                                
                        //#region Error response
                        if(error) {
                            _response.message = "Unable to get place review, ERROR:PRL1";
                            res.json(_response);
                            console.log(`controller/placecontroller/review/list: ${error.message}`);
                        };
                        //#endregion

                    }
                    else {

                        //#region Check if result is not empty
                        //If not empty then send result
                        //Else send error message
                        if(result.length > 0) {

                            //Update response object
                            _response.success = true;
                            _response.data = result;

                        }
                        else {
                            _response.message = "No review found";
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
        _response.message = "Invalid place's id";
        res.json(_response);
        //#endregion

    };
    //#endregion

};

module.exports = { PlaceController }