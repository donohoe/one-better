(function (window, document) {
	
	function OneBetter () {

		var config = {
			"class":  "one-better",
			"source": "http://donohoe.github.io/one-better/src/",
			"style":  "max-width: 1100px; max-height: 800px;"
		};

		var unit = {
			"wide": {
				"border": "0",
				"height": "180px",
				"width":  "100%"
			},
			"square": {
				"border": "0",
				"height": "100%",
				"width":  "100%"
			},
			"tall": {
				"border": "0",
				"height": "180px",
				"width":  "100%"
			}
		};

		var debug = false;
		var ads = [];

		return {

			watch: function(selector, options) {
				if (typeof(selector)==='undefined') {
					return;
				};
				if (typeof(options)==='undefined') {
					options = {};
				};

				var ad = JSON.parse(JSON.stringify(config));
				ad['selector'] = selector;
				ad['class']    = options['class']  || config['class'];
				ad['source']   = "";//options['source'] || config['source'];
				ad['unit']     = options['unit']   || 'wide';
				ad['debug']    = options['debug']  || config['debug'];

				ads.push(ad);
			},

			set: function(options) {
				config['class']  = options['class']  || config['class'];
				config['source'] = options['source'] || config['source'];
				config['unit']   = options['unit']   || config['unit'];
				config['style']  = options['style']  || config['style'];
				config['debug']  = options['debug']  || config['debug'];
			},

			run: function() {
				var len = ads.length;
				for (var i=0; i<len; i++) {
					console.log("ad", i, ads[i]);
					this.insert(ads[i]);
				}
			},

			insert: function(ad) {

				console.log("run ads", ads);

			    var items = document.querySelectorAll(ad.selector);
			    var list = [];

			    for (var i = 0; i < items.length; i++) {
			        if (!items[i].getAttribute("data-loaded")) {

			            var item = items[i];
			            var display = window.getComputedStyle(item).display;
			            if (display === "none" || ad.debug == true) {

			                item.setAttribute("data-loaded", "yes");
			                var f = document.createElement("iframe");

			                f.className    = ad['class'];
							f.scrolling    = "no";
							f.style        = config['style'];

							var u = unit[ad['unit']];
							for (var name in u) {
							    var value = u[name];
								f.style[name] = value;
							}

							f.style.overflow = "hidden";
			                f.src = ad['source'] + "src/units/" + ad['unit'] + "/index.html"; // drop ""http:"

			                var parentDiv = item.parentNode;
			                parentDiv.insertBefore(f, item);
			            }
			        }
			    }
			},
		};

	}

	window.OneBetter = OneBetter;

})(window, document);


