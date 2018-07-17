window.debug = false;
window.time = (new Date()).getTime();
! function() {
	var origin = window.location.origin;
	var addListener = function(object, type, callback) {
			object.addEventListener ? object.addEventListener(type, callback, false) : object.attachEvent && object.attachEvent("on" + type, callback);
		},
		isStyle = function(file) {
			var regex = /main\.css$/i;
			if(debug) {
				if(window.localStorage){
					window.localStorage.clear();
					window.localStorage["__key__"] = time
				}
				return false;
			}
			return (window.localStorage && window.localStorage[file]);
		},
		loadStyle = function(file) {
			if (window.localStorage && window.XMLHttpRequest){
				if (isStyle(file)){
					setStyle(localStorage[file]);
				} else {
					var xhr = new XMLHttpRequest;
					xhr.open("GET", file, !0);
					addListener(xhr, "load", function() {
						if(xhr.readyState === 4){
							setStyle(xhr.responseText);
							localStorage[file] = xhr.responseText;
						}
					});
					xhr.send();
				}
			} else {
				var c = document.createElement("link");
				c.href = o;
				c.rel = "stylesheet";
				c.type = "text/css";
				document.getElementsByTagName("head")[0].appendChild(c);
			}
		},
		setStyle = function(css) {
			var style = document.createElement("style"),
				textCss = document.createTextNode(css);
			style.type = "text/css";
			style.appendChild(textCss);
			document.getElementsByTagName("head")[0].appendChild(style);
		};
	if(!debug){
		if(window.localStorage) {
			if(window.localStorage["__stamp__"]) {
				time = window.localStorage["__stamp__"];
			}else{
				window.localStorage["__stamp__"] = time;
			}
		}
	}
	var fonts = [
		origin + '/assets/templates/komsomolskiy/css/main.css?' + time,
		origin + '/assets/templates/komsomolskiy/css/komsomolskiy.css?' + time,
		"https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&amp;subset=cyrillic,cyrillic-ext",
	];
	fonts.forEach(function(item, index, array){
		loadStyle(item);
	});
}();