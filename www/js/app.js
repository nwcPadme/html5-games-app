angular.module("html5_games_app", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ionicLazyLoad","html5_games_app.controllers", "html5_games_app.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "HTML5 games app" ;
		$rootScope.appLogo = "data/images/icon/icone_Mad-Games-Maker_mini.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$rootScope.liveStatus = "pause" ;
		$ionicPlatform.ready(function(){
			$rootScope.liveStatus = "run" ;
		});
		$ionicPlatform.on("pause",function(){
			$rootScope.liveStatus = "pause" ;
		});
		$ionicPlatform.on("resume",function(){
			$rootScope.liveStatus = "run" ;
		});


		$rootScope.hide_menu_home = false ;
		$rootScope.hide_menu_games = false ;
		$rootScope.hide_menu_exchange = false ;
		$rootScope.hide_menu_faq = false ;
		$rootScope.hide_menu_user_profile = false ;


		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "html5_games_app",
				storeName : "html5_games_app",
				description : "The offline datastore for HTML5 games app app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("html5_games_app.dashboard");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})



.config(function($stateProvider,$urlRouterProvider,$sceDelegateProvider,$ionicConfigProvider,$httpProvider){
	/** tabs position **/
	$ionicConfigProvider.tabs.position("bottom"); 
	try{
	// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?crypto\-world\.pp\.ua/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?mad\-agency\.xyz/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("html5_games_app",{
		url: "/html5_games_app",
		abstract: true,
		templateUrl: "templates/html5_games_app-tabs.html",
	})

	.state("html5_games_app.about_us", {
		url: "/about_us",
		views: {
			"html5_games_app-about_us" : {
						templateUrl:"templates/html5_games_app-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.admob", {
		url: "/admob",
		cache:false,
		views: {
			"html5_games_app-admob" : {
						templateUrl:"templates/html5_games_app-admob.html",
						controller: "admobCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.asdasd", {
		url: "/asdasd",
		cache:false,
		views: {
			"html5_games_app-asdasd" : {
						templateUrl:"templates/html5_games_app-asdasd.html",
						controller: "asdasdCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.dashboard", {
		url: "/dashboard",
		views: {
			"html5_games_app-dashboard" : {
						templateUrl:"templates/html5_games_app-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.exchange", {
		url: "/exchange",
		cache:false,
		views: {
			"html5_games_app-exchange" : {
						templateUrl:"templates/html5_games_app-exchange.html",
						controller: "exchangeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.faq", {
		url: "/faq",
		views: {
			"html5_games_app-faq" : {
						templateUrl:"templates/html5_games_app-faq.html",
						controller: "faqCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.game_air", {
		url: "/game_air",
		views: {
			"html5_games_app-game_air" : {
						templateUrl:"templates/html5_games_app-game_air.html",
						controller: "game_airCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.game_candy", {
		url: "/game_candy",
		views: {
			"html5_games_app-game_candy" : {
						templateUrl:"templates/html5_games_app-game_candy.html",
						controller: "game_candyCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.game_color", {
		url: "/game_color",
		views: {
			"html5_games_app-game_color" : {
						templateUrl:"templates/html5_games_app-game_color.html",
						controller: "game_colorCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.game_halloween", {
		url: "/game_halloween",
		cache:false,
		views: {
			"html5_games_app-game_halloween" : {
						templateUrl:"templates/html5_games_app-game_halloween.html",
						controller: "game_halloweenCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.game_stick", {
		url: "/game_stick",
		views: {
			"html5_games_app-game_stick" : {
						templateUrl:"templates/html5_games_app-game_stick.html",
						controller: "game_stickCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.game_traffic", {
		url: "/game_traffic",
		views: {
			"html5_games_app-game_traffic" : {
						templateUrl:"templates/html5_games_app-game_traffic.html",
						controller: "game_trafficCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.games", {
		url: "/games",
		cache:false,
		views: {
			"html5_games_app-games" : {
						templateUrl:"templates/html5_games_app-games.html",
						controller: "gamesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.hallowin", {
		url: "/hallowin",
		cache:false,
		views: {
			"html5_games_app-hallowin" : {
						templateUrl:"templates/html5_games_app-hallowin.html",
						controller: "hallowinCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.help", {
		url: "/help",
		views: {
			"html5_games_app-help" : {
						templateUrl:"templates/html5_games_app-help.html",
						controller: "helpCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.profile", {
		url: "/profile",
		cache:false,
		views: {
			"html5_games_app-profile" : {
						templateUrl:"templates/html5_games_app-profile.html",
						controller: "profileCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"html5_games_app-slide_tab_menu" : {
						templateUrl:"templates/html5_games_app-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.user_login", {
		url: "/user_login",
		views: {
			"html5_games_app-user_login" : {
						templateUrl:"templates/html5_games_app-user_login.html",
						controller: "user_loginCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.user_profile", {
		url: "/user_profile",
		views: {
			"html5_games_app-user_profile" : {
						templateUrl:"templates/html5_games_app-user_profile.html",
						controller: "user_profileCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("html5_games_app.user_register", {
		url: "/user_register",
		views: {
			"html5_games_app-user_register" : {
						templateUrl:"templates/html5_games_app-user_register.html",
						controller: "user_registerCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/html5_games_app/dashboard");
});
