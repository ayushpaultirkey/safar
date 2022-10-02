const Ly = {};
const LyDebug = true;


Ly.Device = {};
Ly.Device.Online = window.navigator.onLine;
Ly.Device.ClearCache = function() {
    localStorage.clear();
};


window.addEventListener('online', () => {
    Ly.Device.Online = true;
});
window.addEventListener('offline', () => {
    Ly.Device.Online = false;
});
Ly.Http = {};

Ly.Http.ObjectSerialize = function(_Object = {}) {
    return Object.keys(_Object).map(function(_Key) {
        return _Key + '=' + _Object[_Key];
    }).join('&');
};


Ly.Http.Get = async function(_URL = '', _Data = null) {
    return new Promise(function(_Response, _Reject) {
        
        var _xhttp = new XMLHttpRequest();
        _xhttp.onload = function() {
            if(this.status >= 200 && this.status < 300) {
                //_Response((_isJson) ? JSON.parse(_xhttp.response) : _xhttp.response);
                _Response(_xhttp.response);
            }
            else {
                if(LyDebug) {
                    console.error(`Ly.Http.Get: Http request failed, code: ${this.status}, url: ${_URL} `);
                };
                _Reject({
                    message: `Ly.Http.Get: Http request failed, code: ${this.status}, url: ${_URL} `,
                    code: this.status,
                    url: _URL
                });
            };
        };
        _xhttp.onerror = function() {
            if(LyDebug) {
                console.error(`Ly.Http.Get: Http request failed, code: ${this.status}, url: ${_URL} `);
            };
            _Reject({
                message: `Ly.Http.Get: Http request failed, code: ${this.status}, url: ${_URL} `,
                code: this.status,
                url: _URL
            });
        };
        
        var _dataString = '';
        if(typeof _Data !== 'undefined' && _Data !== null) {
            _dataString = '?' + Ly.Http.ObjectSerialize(_Data);
        };
        
        _xhttp.open('GET', _URL + _dataString);
        _xhttp.send();

    });
};
Ly.Http.GetJson = async function(_URL = "", _Data = null) {
    return new Promise(async function(_Response, _Reject) {

        await Ly.Http.Get(_URL, _Data)
        .then((_data) => {
            _Response(JSON.parse(_data));
        })
        .catch((_error) => {
            _Reject(_error);
        });

    });
};

Ly.Http.Fetch = async function(_URL = "", _Data = null, _useCache = false) {

    var _urlData = "";
    if(_Data !== null) { _urlData = "?" + Ly.Http.ObjectSerialize(_Data); };
    var _cacheKey = `${_URL}${_urlData}`;

    return new Promise(async function(_Response, _Reject) {
        if(Ly.Device.Online) {

            if(_useCache && localStorage.getItem(_cacheKey) !== null) {
                _Response(localStorage.getItem(_cacheKey));
                console.warn(`Ly.Http.Fetch: ${_cacheKey} loaded from cache.`);
            }
            else {
                await Ly.Http.Get(_URL, _Data)
                .then((_responseData) => {
                    localStorage.setItem(_cacheKey, _responseData);
                    _Response(_responseData);
                    console.warn(`Ly.Http.Fetch: ${_cacheKey} cache created, updated.`);
                })
                .catch((_error) => {
                    _Reject(_error);
                });
            };

        }
        else {
            if(localStorage.getItem(_cacheKey) !== null) {
                _Response(localStorage.getItem(_cacheKey));
                console.warn(`Ly.Http.Fetch: ${_cacheKey} loaded from cache.`);
            }
            else {
                _Reject("Ly.Http.Fetch: No cache found");
                console.warn(`Ly.Http.Fetch: ${_cacheKey} cache not found.`);
            };
        };
    });

};
Ly.Http.FetchJson = async function(_URL = "", _Data = null, _useCache = false) {

    var _urlData = "";
    if(_Data !== null) { _urlData = "?" + Ly.Http.ObjectSerialize(_Data); };
    var _cacheKey = `${_URL}${_urlData}`;

    return new Promise(async function(_Response, _Reject) {
        if(Ly.Device.Online) {

            if(_useCache && localStorage.getItem(_cacheKey) !== null) {
                _Response(JSON.parse(localStorage.getItem(_cacheKey)));
                console.warn(`Ly.Http.Fetch: ${_cacheKey} loaded from cache.`);
            }
            else {
                await Ly.Http.Get(_URL, _Data)
                .then((_responseData) => {
                    localStorage.setItem(_cacheKey, _responseData);
                    _Response(JSON.parse(_responseData));
                    console.warn(`Ly.Http.Fetch: ${_cacheKey} cache created, updated.`);
                })
                .catch((_error) => {
                    _Reject(_error);
                });
            };

        }
        else {
            if(localStorage.getItem(_cacheKey) !== null) {
                _Response(JSON.parse(localStorage.getItem(_cacheKey)));
                console.warn(`Ly.Http.Fetch: ${_cacheKey} loaded from cache.`);
            }
            else {
                _Reject("Ly.Http.Fetch: No cache found");
                console.warn(`Ly.Http.Fetch: ${_cacheKey} cache not found.`);
            };
        };
    });

}


Ly.Http.Post = async function(_URL = '', _Data = null) {
    return new Promise(function(_Response, _Reject) {
        
        var _xhttp = new XMLHttpRequest();
        _xhttp.onload = function() {
            if(this.readyState == 4 && this.status == 200) {
                //_Response((_isJson) ? JSON.parse(_xhttp.response) : _xhttp.response);
                _Response(_xhttp.response);
            }
            else {
                if(LyDebug) {
                    console.error(`Ly.Http.Post: Http request failed, code: ${this.status}, url: ${_URL} `);
                };
                _Reject({
                    message: `Ly.Http.Get: Http request failed, code: ${this.status}, url: ${_URL} `,
                    code: this.status,
                    url: _URL
                });
            };
        };
        _xhttp.onerror = function() {
            if(LyDebug) {
                console.error(`Ly.Http.Post: Http request failed, code: ${this.status}, url: ${_URL} `);
            };
            _Reject({
                message: `Ly.Http.Get: Http request failed, code: ${this.status}, url: ${_URL} `,
                code: this.status,
                url: _URL
            });
        };

        _xhttp.open('POST', _URL);
        _xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        var _dataString = '';
        if(typeof _Data !== 'undefined' && _Data !== null) {
            _dataString = Ly.Http.ObjectSerialize(_Data);
        };

        _xhttp.send(_dataString);

    });
};
Ly.Http.PostJson = async function(_URL = "", _Data = null) {
    return new Promise(async function(_Response, _Reject) {

        await Ly.Http.Post(_URL, _Data)
        .then((_data) => {
            _Response(JSON.parse(_data));
        })
        .catch(() => {
            _Reject();
        });

    });
};

Ly.Element = function(_Selector = "") {

    var _element = null;
    if(!(_Selector instanceof Element)) {
        _element = document.querySelector(_Selector);
    }
    else {
        _element = _Selector;
    };

    return {
        AppendHtml: function(_Text = "", _Position = "beforeend") {
            if(_Text !== null && _Text.length > 0) {
                _element.insertAdjacentHTML(_Position, _Text);
            }
        },
        AppendText: function(_Text = "") {
            if(_Text !== null && _Text.length > 0) {
                _element.innerText += _Text;
            }
        },
        AppendTemplate: function(_Template = "", _Object = {}, _Position = "beforeend") {

            for(var _key in _Object) {
                _Template = _Template.replace(new RegExp(_key, 'g'), _Object[_key]);
            };
            this.AppendHtml(_Template, _Position);

        },
        Html: function(_Text = "") {
            if(_Text !== null && _Text.length > 0) {
                _element.innerHTML = _Text;
            }
            else {
                return _element.innerHTML;
            }
        },
        Text: function(_Text = "") {
            if(_Text !== null && _Text.length > 0) {
                _element.innerText = _Text;
            }
            else {
                return _element.innerText;
            }
        }
    }

};

Ly.Fragment = {};
Ly.Fragment.Load = async function(_Path = "", _Data = null, _useCache = false) {

    return new Promise(async function(_Response, _Reject) {

        if(_useCache) {

            var _urlData = "";
            if(_Data !== null) { _urlData = "?" + Ly.Http.ObjectSerialize(_Data); };
            var _cacheKey = `${_Path}${_urlData}`;

            if(localStorage.getItem(_cacheKey) !== null) {
                _Response(localStorage.getItem(_cacheKey));
                console.warn(`Ly.Fragment.Load: ${_cacheKey} loaded from cache.`);
            }
            else {
                await Ly.Http.Get(_Path, _Data)
                .then((_data) => {
                    localStorage.setItem(_cacheKey, _data);
                    _Response(_data);
                    console.warn(`Ly.Fragment.Load: ${_cacheKey} loaded.`);
                })
                .catch((_error) => { _Reject(_error) });
            };
        }
        else {
            await Ly.Http.Get(_Path, _Data)
            .then((_data) => { _Response(_data) })
            .catch((_error) => { _Reject(_error) });
        };

    });

};


Ly.Query = async function() {

    var _element = document.querySelectorAll("[ly-query]");

    for(var i = 0, l = _element.length; i < l; i++) {

        var _elem = _element[i];

        var _query = _elem.getAttribute("ly-query");
        if(_query.indexOf("load.fragment") == 0) {

            var _url = _query.replace("load.fragment ", "").trim();
            /*var _template = await Ly.Http.Fetch(_url, null, true).then(_template).catch((_error) => {
                console.error(_error);
            });*/
            var _template = await Ly.Http.Fetch(_url).then(_template).catch((_error) => {
                console.error(_error);
            });
            _elem.innerHTML = _template;
            
        }

    };

};
Ly.QueryData = null;
