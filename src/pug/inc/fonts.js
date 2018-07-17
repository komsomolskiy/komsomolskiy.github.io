! function() {
	var addListener = function(object, type, callback) {
			object.addEventListener ? object.addEventListener(type, callback, false) : object.attachEvent && object.attachEvent("on" + type, callback);
		},
		isStyle = function(file) {
			var regex = /main\.css$/i;
			if(regex.test(file))
				return false;
			return window.localStorage && localStorage.file
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
	
	var fonts = [
		window.location.origin + '/assets/templates/komsomolskiy/css/main.css',
		window.location.origin + '/assets/templates/komsomolskiy/css/komsomolskiy.css?wt598r',
		"https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&amp;subset=cyrillic,cyrillic-ext",
	];
	fonts.forEach(function(item, index, array){
		loadStyle(item);
	});
}();