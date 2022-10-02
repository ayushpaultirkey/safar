Ly.Query();

const App = {};

App.ChangeTab = function(_element, _tabs) {

    let _tab = document.querySelectorAll(_tabs);
    let _el = document.querySelector(_element);

    _tab.forEach(x => {

        if(x !== _el) {
            x.style.display = "none";
        }
        else {
            _el.style.display = "block";
        };

    });

};
App.SlideTab = function(_from, _to) {

    document.querySelector(_from).style.left = "-100%";
    document.querySelector(_to).style.left = "0%";
    
    document.querySelector(_from).style.transform = "scale(0.6)";
    document.querySelector(_to).style.transform = "scale(1)";

};

var __isMenuVisible = false;
App.ToggleMenu = function(_from, _to) {

    if(__isMenuVisible) {
        App.SlideTab(_to, _from);
        __isMenuVisible = false;
    }
    else {
        App.SlideTab(_from, _to);
        __isMenuVisible = true;
    }

};

App.LoadStateList = async function() {

    var _data = await Ly.Http.FetchJson("/public/data/state.2.json", null, true).then(_data).catch((_error) => {
        console.error(_error);
    });
    if(_data !== undefined) {
        
        //var result = Object.keys(_data).map((key) => [_data, _data[key]]);
        let _searchSelect = document.querySelector("#_appStateSelect");

        for(let i = 0; i < _data.length; i++) {
            _searchSelect.innerHTML += `<option value="${_data[i]}">${_data[i]}</option>`;
        };

    }
    else {
        $("#_appTabMessage").html("Unable to load state list");
    };

};


App.Search = function() {

    let _searchSelect = document.querySelector("#_appStateSelect");
    let _searchBox = document.querySelector("#_appSearchBox");
    let _url = "/search";

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

    window.location.href = _url;

};
App.FillSearch = function() {

    let _searchSelect = document.querySelector("#_appStateSelect");
    let _searchBox = document.querySelector("#_appSearchBox");
    
    const params = new URL(window.location.href).searchParams;
    let _state = params.get('state');
    let _name = params.get('name');

    if(_state !== null && _state.length > 0) {
        _searchSelect.value = _state;
    };
    if(_name !== null && _name.length > 0) {
        _searchBox.value = _name;
        document.querySelector("#_appSearchTitle").innerText = _name;
    };

};



App.LoadStateCard = async function() {

    var _template = await Ly.Http.Fetch("/public/fragment/card.state.html", null).then(_template).catch((_error) => {
        console.log(_error);
    });

    var _data = await Ly.Http.FetchJson("/public/data/state.detail.json", null).then(_data).catch((_error) => {
        console.error(_error);
    });

    if(_data !== undefined) {
        
        var _appStateCard = document.querySelector("#_appStateCard");
        var _stateData = Object.keys(_data).map((key) => [key, _data[key].image]);

        for(let i = 0; i < _stateData.length; i++) {
            
            Ly.Element(_appStateCard).AppendTemplate(_template, {
                "@x.name": _stateData[i][0],
                "@x.image": _stateData[i][1]
            });

        };

    }
    else {
        $("#_appTabMessage").html("Unable to load state list");
    };

};

App.LoadStateDetail = async function() {

    const params = new URL(window.location.href).searchParams;
    let _name = params.get('name');

    if(_name !== null && _name.length > 0) {

        var _data = await Ly.Http.FetchJson("/public/data/state.detail.json", null).then(_data).catch((_error) => {
            console.error(_error);
        });

        if(_data[_name] !== undefined) {

            document.querySelector("#_appStateName").innerText = _name;
            document.querySelector("#_appStateDetail").innerText = _data[_name].detail;
            document.title = _name;

            await AppAPI.GetSearchResult(_name, true);

        }
        else {
            alert("Unable to find state");
        };

    };

};


App.ScrollToBottom = function(_element) {

    var objDiv = document.querySelector(_element);
    objDiv.scrollTop = objDiv.scrollHeight;

};
/*
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/public/script/sw.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err));
    });
}
*/