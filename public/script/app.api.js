const AppAPI = {};


AppAPI.Login = async function() {

    let _username = document.querySelector("#_appLoginUser");
    let _password = document.querySelector("#_appLoginPass");
    let _error_msg = document.querySelector("#_appLoginMessage");

    if(_username.value.length > 0 && _password.value.length > 0) {

        var _result = await Ly.Http.GetJson("/api/auth/login", { username: _username.value, password: _password.value }).then(_result).catch((_error) => {
            _error_msg.innerHTML = "Unable to login";
        });

        if(_result.success) {
            window.location.href = _result.redirect;
        }
        else {
            _error_msg.innerHTML = _result.message;
        };

    }
    else {
        _error_msg.innerHTML = "Enter username and password";
    };

};


AppAPI.Register = async function() {
    
    let _name = document.querySelector("#_appRegName");
    let _username = document.querySelector("#_appRegUser");
    let _password = document.querySelector("#_appRegPass");
    let _state = document.querySelector("#_appStateSelect");
    let _error_msg = document.querySelector("#_appSignupMessage");

    if(_username.value.length > 0 && _password.value.length > 0 && _name.value.length > 0 && _state.value.length !== "NULL") {

        var _result = await Ly.Http.GetJson("/api/auth/signup", {
            name: _name.value, 
            username: _username.value, 
            password: _password.value, 
            state: _state.value
        }).then(_result).catch((_error) => {
            _error_msg.innerHTML = "Unable to login";
        });

        if(_result.success) {
            window.location.href = _result.redirect;
        }
        else {
            _error_msg.innerHTML = _result.message;
        };

    }
    else {
        _error_msg.innerHTML = "Enter the following fields";
    };

};


AppAPI.Logout = async function() {

    var _result = await Ly.Http.GetJson("/api/auth/logout").then(_result).catch((_error) => {
        alert("Unable to logout");
    });
    
    if(_result.success) {
        window.location.href = window.location.href;
    }

};

AppAPI.UserRemove = async function() {

    var _result = await Ly.Http.GetJson("/api/user/remove").then(_result).catch((_error) => {
        alert("Unable to remove user");
    });
    
    if(_result.success) {
        window.location.href = _result.message;
    };

};


AppAPI.GetUserLocation = async function(_redirect = true) {

    if (navigator.geolocation) {

        let _searchSelect = document.querySelector("#_appStateSelect");
        let _searchBox = document.querySelector("#_appSearchBox");

        document.querySelector(".fa-map-marker").classList.add("loc-blink");

        navigator.geolocation.getCurrentPosition((_location) => {
            let _lat = _location.coords.latitude;
            let _lon = _location.coords.longitude;

            $.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${_lat}&lon=${_lon}`, function(_result) {
                
                let _city = _result.address.city;
                let _state = _result.address.state;

                _searchSelect.value = _state;
                //_searchBox.value = _city;

                if(_redirect) {
                    App.Search();
                }

            });

        }, (er) => {
            alert("Unable to get location", er);
            document.querySelector(".fa-map-marker").classList.remove("loc-blink");
        });
        
    }
    else {
        alert("Geolocation is not supported");
    };

};



AppAPI.CheckUser = async function(_redirect = "") {

    let _appUser = document.querySelector("#_appUserRedirect");
    let _appLogout = document.querySelector("#_appLogoutRedirect");
    let _appLogin = document.querySelector("#_appLoginRedirect");
    
    var _result = await Ly.Http.GetJson("/api/user/check").then(_result).catch((_error) => {
        console.error("Unable to check user");
    });

    if(_result.success) {
        _appUser.style.display = "block";
        _appLogout.style.display = "block";
        _appLogin.style.display = "none";
    }
    else {
        if(_redirect.length > 0) {
            window.location.href = _redirect;
        }
        _appLogin.style.display = "block";
    }

};



AppAPI.UpdateUserImage = async function() {
    
    if(fileupload.files.length > 0) {
        let formData = new FormData(); 
        formData.append("detail", "name");
        formData.append("fileupload", fileupload.files[0]);
    
        await fetch('/api/user/photo/upload', { method: "POST",  body: formData}).then(() => {
            AppAPI.LoadUserDetail();
        }).catch((_error) => {
            alert("Unable to update profile picture");
        });
    }
    else {
        alert("Select image file");
    };

};

AppAPI.LoadUserDetail = async function(_redirect = "") {

    let _userImage = document.querySelector("#_appUserImage");
    let _userName = document.querySelector("#_appUserName");

    var _result = await Ly.Http.GetJson("/api/user/detail").then(_result).catch((_error) => {
        console.error("Unable to check user");
    });

    if(_result.success) {

        _userImage.style.backgroundImage = `url(${_result.data.user_photo})`;
        _userName.innerText = _result.data.user_name;

    }
    else {
        window.location.href = _redirect;
    }

};



AppAPI.GetSearchResult = async function(_state = "", _loadMap = false) {

    let _searchSelect = document.querySelector("#_appStateSelect");
    let _searchBox = document.querySelector("#_appSearchBox");
    let _url = "/api/place/search";

    if(_state.length > 0) {
        _url += "?state=" + _state;
    }
    else {
        if(_searchBox.value.length > 0) {
            _url += "?name=" + _searchBox.value;
        };
    
        if(_searchSelect.value !== "NULL") {
            if(_searchBox.value.length > 0) {
                _url += "&state=" + _searchSelect.value;
            }
            else {
                _url += "?state=" + _searchSelect.value;
            };
        };
    }

    var _template = await Ly.Http.Fetch("/public/fragment/card.search.html", null).then(_template).catch((_error) => {
        console.log(_error);
    });

    var _result = await Ly.Http.FetchJson(_url, null).then(_result).catch((_error) => {
        alert("Unable to search");
    });

    if(_result.success) {

        let _appSearchResult = Ly.Element("#_appSearchResult");

        for(let i = 0; i < _result.data.length; i++) {

            _appSearchResult.AppendTemplate(_template, {
                "@x.id": _result.data[i].place_id,
                "@x.name": _result.data[i].place_name,
                "@x.state": _result.data[i].place_state,
                "@x.image": _result.data[i].place_photo
            });

            var _coordinate = _result.data[i].place_coordinate
            if(_loadMap && _coordinate.length > 0) {
                var _pos = _coordinate.split(",");
                AppMap.AddMarker({ lat: _pos[0], lon: _pos[1] }, _result.data[i].place_name);
            };

        };

    }
    else {
        alert("Unable to search");
    };

};


AppAPI.GetRandomPlace = async function() {

    let _url = "/api/place/search";

    var _template = await Ly.Http.Fetch("/public/fragment/card.search.html").then(_template).catch((_error) => {
        console.log(_error);
    });

    var _result = await Ly.Http.FetchJson("/api/place/search").then(_result).catch((_error) => {
        alert("Unable to search");
    });

    if(_result.success) {

        let _appSearchResult = Ly.Element("#_appSearchResult");

        for(let i = 0; i < _result.data.length; i++) {

            _appSearchResult.AppendTemplate(_template, {
                "@x.id": _result.data[i].place_id,
                "@x.name": _result.data[i].place_name,
                "@x.state": _result.data[i].place_state,
                "@x.image": _result.data[i].place_photo
            });

        };

    }
    else {
        alert("Unable to get place");
    };

};


AppAPI.GetPlaceDetail = async function() {

    const params = new URL(window.location.href).searchParams;
    let _id = params.get('id');

    var _template = await Ly.Http.Fetch("/public/fragment/card.image.html", null).then(_template).catch((_error) => {
        console.log(_error);
    });
    
    var _result = await Ly.Http.FetchJson("/api/place/get", { id: _id }).then(_result).catch((_error) => {
        alert("Unable to get place detail");
    });

    if(_result.success) {

        document.querySelector("#_appPlaceName").innerText = _result.data.place_name;
        document.querySelector("#_appPlaceDetail").innerText = _result.data.place_description;
        
        let _appPlacePhoto = document.querySelector("#_appPlacePhoto");

        for(let i = 0; i < _result.data.place_photo.length; i++) {

            Ly.Element(_appPlacePhoto).AppendTemplate(_template, {
                "@x.image": _result.data.place_photo[i]
            });

        };

        var _coordinate = _result.data.place_coordinate
        if(_coordinate.length > 0) {
            var _pos = _coordinate.split(",");
            AppMap.AddMarker({ lat: _pos[0], lon: _pos[1] }, _result.data.place_name, true);
        };

    }
    else {
        alert("Unable to get place detail");
    };

};