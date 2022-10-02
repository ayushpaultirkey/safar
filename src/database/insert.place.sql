#############################################################################
INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(
    "",
    "",
    "",
    "",
    ""
);
SET @place1 = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(
    @place1,
    1,
    "/upload/image/",
    ""
)
#############################################################################


#############################################################################
SET @place_name = "Khajuraho";
SET @place_detail = "Khajuraho";
SET @place_state = "Khajuraho";
SET @place_position = "Khajuraho";

INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(
    "Khajuraho",
    "Khajuraho, a UNESCO World Heritage Site located in Madhya Pradesh, is known around the world for its stunning temples adorned by erotic and sensuous carvings. A small town located in the Bundelkhand region, Khajuraho is a brilliant example of Indian architecture and its culture back in the medieval period. The architecture of these Hindu and Jain temples depict the erotic forms of love, the carvings on the walls display passion in the most sensuous yet aesthetic ways. Built between 950 to 1050 AD the sheer confrontational nature of these carvings shows a stark paradox with the conventional Indian ideals about eroticism, leaving everybody spellbound.",
    "",
    "Madhya Pradesh",
    "24.8481,79.9335"
);
SET @place_id = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(@place_id, 1, "/upload/image/KHAJURAHO.jpg", "01-Oct-2022");
#############################################################################


#############################################################################
INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(
    "Bhedaghat",
    "Bhedaghat is known for the Dhuandar Falls (Dhuan means smoke and Dhar means flow), a huge cascade of water that falls from a height of 98 feet. Boating in Bhedaghat especially during the moonlit night would surely make up for an unforgettable experience. The boatmen of these place are storytellers that will tell you about the place in the form of interesting stories.
    Also regarded as the Marble Rocks of Bhedaghat, this small town has earned a reputation for the massive 100 ft rocks on either side of the Narmada. Bhedaghat is in close proximity of one of the major cities of Madhya Pradesh of Jabalpur
    The other notable attractions include 64 Yogini Temple and 'Bandar Kudini', a spot where two cliffs are so close to each other that monkeys hop over from one side to another.",
    "",
    "Madhya Pradesh",
    "23.1320,79.8010"
);
SET @place_id = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(@place_id, 1, "/upload/image//BHEDAGHAT.jpg", "01-Oct-2022");
#############################################################################


#############################################################################
INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(
    "Pachmarhi",
    "Pachmarhi is the only hill station and is the highest point in Madhya Pradesh. Pachmarhi is also often known as 'Satpura ki Rani' or the 'Queen of the Satpura Range'. Situated at an altitude of 1,067 metres, the picturesque town is a part of UNESCO Biosphere Reserve, home to leopards and bison.
    Five sandstone cut caves on the hilltop are believed to be the spot where Pandavas stayed in Pachmarhi during their exile, making it a popular spot among religious tourists. Being at an elevated height and surrounded by bewitching forests of the Satpuras with the streams and waterfalls, Pachmarhi is a perfect weekend getaway from the nearby cities of Madhya Pradesh and Maharashtra. Since the town was discovered and developed in modern times by Captain James Forsyth of the British Army, it houses charming churches built in colonial style architecture.",
    "",
    "Madhya Pradesh",
    "22.467446,78.434585"
);
SET @place_id = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(@place_id, 1, "/upload/image//PACHMARHI.jpg", "01-Oct-2022");
#############################################################################


#############################################################################
INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(
    "Gwalior",
    "Gwalior is a historic city located in the state of Madhya Pradesh. Popular because of the hilltop fort, Gwalior is full of palaces and glorious temples giving this city a majestic charm which speaks volumes of its glorious past.
    A historic city founded by king Surajesan, Gwalior is a city where India's most eminent royalty once resided. Jai Vilas Pala has the largest carpet in the world which took almost 12 years to weave and two most massive chandeliers in the world that weight close to 3.5 tonnes.
    The great Indian musician Tansen was born in Gwalior, and the tomb of Tansen is also an important place here. Every year, in November/December, a four-day Tansen Music festival is celebrated in the city where various classical musicians from all over the country perform on the stage near the tomb itself.
    Visit the various monuments and museums, eat the local delicacies like namkeen and go boating in Tighra Dam while you are in the city.",
    "",
    "Madhya Pradesh",
    "26.218287,78.182831"
);
SET @place_id = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(@place_id, 1, "/upload/image//GWALIOR.jpg", "01-Oct-2022");
#############################################################################


#############################################################################
INSERT INTO `Place` (`Name`,`Description`,`City`,`State`,`Coordinate`)VALUES(
    "Kanha National Park",
    "Located in a central region of Madhya Pradesh, Kanha National Park is the largest National Park in central India and has been ranked as one of the best parks in Asia. Among the 22 species of large mammals, the royal Bengal tigers are one of the major attractions. One of the best tiger reserves in India, the present-day area stretches over the 940-kilometre square which is divided into two sanctuaries: Hallon and Banjar. 
    The park was established in the year 1955 and has since actively contributed to the preservation of many endangered species. The National Park was taken under the Project Tiger Reserve in 1974. Abundant in flora and fauna, the Kanha National Park houses one of the rarest species of deer- the Barasingha. It is known for the unique Barasingha conversation to save the species that were once on the verge of extinction. One of the most scenic wildlife reserves in Asia today, this National Park came to be known the world over through Rudyard Kipling's book- The Jungle Book.",
    "",
    "Madhya Pradesh",
    "22.2830554,80.6181028"
);
SET @place_id = LAST_INSERT_ID();
INSERT INTO `PlacePhoto` (`PlaceID`,`UserID`,`Path`,`Date`)VALUES(@place_id, 1, "/upload/image//KANHA-NATIONAL-PARK.jpg", "01-Oct-2022");
#############################################################################