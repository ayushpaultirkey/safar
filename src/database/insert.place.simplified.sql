SET @place_state = "";


######################
###     Place 1    ###
#############################################################################
SET @place_name = "";
SET @place_detail = "";
SET @place_position = "";
SET @place_image = "/upload/image/";


INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(@place_name, @place_detail, "", @place_state, @place_position);
SET @place_id = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(@place_id, 1, @place_image, "01-Oct-2022");
#############################################################################


######################
###     Place 2    ###
#############################################################################
SET @place_name = "";
SET @place_detail = "";
SET @place_position = "";
SET @place_image = "/upload/image/";


INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(@place_name, @place_detail, "", @place_state, @place_position);
SET @place_id = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(@place_id, 1, @place_image, "01-Oct-2022");
#############################################################################


######################
###     Place 3    ###
#############################################################################
SET @place_name = "";
SET @place_detail = "";
SET @place_position = "";
SET @place_image = "/upload/image/";


INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(@place_name, @place_detail, "", @place_state, @place_position);
SET @place_id = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(@place_id, 1, @place_image, "01-Oct-2022");
#############################################################################


######################
###     Place 4    ###
#############################################################################
SET @place_name = "";
SET @place_detail = "";
SET @place_position = "";
SET @place_image = "/upload/image/";


INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(@place_name, @place_detail, "", @place_state, @place_position);
SET @place_id = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(@place_id, 1, @place_image, "01-Oct-2022");
#############################################################################


######################
###     Place 5    ###
#############################################################################
SET @place_name = "";
SET @place_detail = "";
SET @place_position = "";
SET @place_image = "/upload/image/";


INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(@place_name, @place_detail, "", @place_state, @place_position);
SET @place_id = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(@place_id, 1, @place_image, "01-Oct-2022");
#############################################################################