(function (angular) {
'use strict';	

	angular.module('ngAudio', [])					
		// DIRECTIVE
		.directive('audio', ['$timeout', function(timeout) {
			return {
				restrict : 'AE',
				scope: { ngModel:'=', options:'=' },
				template: 
					'<button ng-click="play(0)">Test</button><span ng-class="mainSliderClass" id="{{sliderTmplId}}">' +
						'<table><tr><td>' +
							'<div class="jslider-bg">' +
								'<i class="l"></i><i class="f"></i><i class="r"></i>' +
								// '<i class="v"></i>' +
							'</div>' +

							'<div class="jslider-pointer"></div>' +
							'<div class="jslider-pointer jslider-pointer-to"></div>' +

							'<div class="jslider-label"><span ng-bind-html="from"></span></div>' +
							'<div class="jslider-label jslider-label-to"><span ng-bind-html="to"></span>{{options.dimension}}</div>' +

							'<div class="jslider-value"><span></span>{{options.dimension}}</div>' +
							'<div class="jslider-value jslider-value-to"><span></span>{{options.dimension}}</div>' +

							'<div class="jslider-scale" id="{{sliderScaleDivTmplId}}"></div>' +

						'</td></tr></table>' +
					'</span>',
				link : function(scope, element, attrs) {

					scope.play = function(idx) {						

						var source = scope.context.createBufferSource(); 	// creates a sound source
						source.buffer = scope.bufferList[idx];     			// tell the source which sound to play
						source.connect(scope.context.destination);       	// connect the source to the context's destination (the speakers)
						source.start(0);                           			// play the source now
                        // note: on older systems, may have to use deprecated noteOn(time);
					};

					scope.load = function(urls) {

						scope.bufferLoader = new BufferLoader(scope.context, urls, scope.finishedLoading);
						scope.bufferLoader.load();						

					};

					scope.finishedLoading = function(bufferList) {

						scope.bufferList = bufferList;

					};

					var audioSupported = false;

					scope.init = function() {

						try {
							// Fix up for prefixing
							var AudioContext = window.AudioContext||window.webkitAudioContext;
							scope.context = new AudioContext();
							audioSupported = true;							
						}
						catch(e) {
							alert('Web Audio API is not supported in this browser');
						}

					};

					timeout(function() {
						if (audioSupported)
							scope.load(scope.options.playlist);

					}, 1000);					

					scope.init();					
				}
			};
		}]);


	function BufferLoader(context, urlList, callback) {
	  this.context = context;
	  this.urlList = urlList;
	  this.onload = callback;
	  this.bufferList = new Array();
	  this.loadCount = 0;
	}

	BufferLoader.prototype.loadBuffer = function(url, index) {
		// Load buffer asynchronously
		var xhr = new XMLHttpRequest();

		if ("withCredentials" in xhr) {
			// XHR for Chrome/Firefox/Opera/Safari.
			xhr.open('GET', url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// XDomainRequest for IE.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// CORS not supported.
		}
    
		xhr.open("GET", url, true);
		xhr.responseType = "arraybuffer";

		var loader = this;

		xhr.onload = function() {
			// Asynchronously decode the audio file data in request.response
			loader.context.decodeAudioData(
			  xhr.response,
			  function(buffer) {
			    if (!buffer) {
			      alert('error decoding file data: ' + url);
			      return;
			    }
			    loader.bufferList[index] = buffer;
			    if (++loader.loadCount == loader.urlList.length)
			      loader.onload(loader.bufferList);
			  },
			  function(error) {
			    console.error('decodeAudioData error', error);
			  }
			);
		}

		xhr.onerror = function() {
			alert('BufferLoader: XHR error');
		}

		xhr.send();
	}

	BufferLoader.prototype.load = function() {
	  for (var i = 0; i < this.urlList.length; ++i)
	  this.loadBuffer(this.urlList[i], i);
	}

})(angular);