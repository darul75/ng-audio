(function (angular) {
'use strict';	
	//http://www.html5rocks.com/en/tutorials/webaudio/intro/?redirect_from_locale=fr
	angular.module('ngAudio', [])					
		// DIRECTIVE
		.directive('audio', ['$timeout', function(timeout) {
			return {
				restrict : 'AE',
				scope: { ngModel:'=', options:'=' },
				template: '<div ng-click="play(0)" class="play_border" ng-show="loaded && !running">' +
					'<div class="play_button"></div>' +
					'</div><div ng-click="stop(0)" class="play_border" ng-show="loaded && running">' +
					'<div class="pause_button"></div>' +
					'</div>',
				link : function(scope, element, attrs) {

					var o = {loop:false};

					angular.extend(o, scope.options);

					scope.play = function(idx) {						
						if (scope.running)
							return;
						scope.source = scope.context.createBufferSource();	// creates a sound source
						scope.source.buffer = scope.bufferList[idx];		// tell the source which sound to play
						scope.source.connect(scope.context.destination);	// connect the source to the context's destination (the speakers)
						scope.source.loop = o.loop;	// Start playback in a loop
						if (!scope.source.start)
							scope.source.start = source.noteOn;
						scope.source.start(0);	// play the source now // note: on older systems, may have to use deprecated noteOn(time);
						scope.running = true;							
					};

					scope.stop = function(idx) {
						if (!scope.running)
							return;
						if (!scope.source.stop)
							scope.source.stop = scope.source.noteOff;
						scope.source.stop(0);
						scope.running = false;
					};

					scope.load = function(urls) {
						scope.bufferLoader = new BufferLoader(scope.context, urls, scope.finishedLoading);
						scope.bufferLoader.load();
					};

					scope.finishedLoading = function(err, bufferList) {
						if (err && console) {console.error(err);return;}							
						scope.bufferList = bufferList;
						timeout(function() {
							scope.loaded = true;	
						});
					};

					scope.init = function() {
						try {
							// Fix up for prefixing
							var AudioContext = window.AudioContext||window.webkitAudioContext;
							scope.context = new AudioContext();
							scope.load(scope.options.playlist);					
						}
						catch(e) {
							if (console)
								console.log('Web Audio API is not supported in this browser');
						}
					};
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

		if ('withCredentials' in xhr) {
			// XHR for Chrome/Firefox/Opera/Safari.
			xhr.open('GET', url, true);
		} else if (typeof XDomainRequest != 'undefined') {
			// XDomainRequest for IE.
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// CORS not supported.
		}
    
		xhr.open('GET', url, true);
		xhr.responseType = 'arraybuffer';

		var loader = this;

		xhr.onload = function() {
			// Asynchronously decode the audio file data in request.response
			loader.context.decodeAudioData(xhr.response,
			  function(buffer) {
				if (!buffer) {
					this.onload('error decoding file data: ' + url);
					return;
			    }
				loader.bufferList[index] = buffer;
				if (++loader.loadCount == loader.urlList.length)
					loader.onload(null, loader.bufferList);
			  },
			  function(error) {
				this.onload('decodeAudioData error' + error);
			  }
			);
		}

		xhr.onerror = function() {
			this.onload('BufferLoader: XHR error');
		}

		xhr.send();
	}

	BufferLoader.prototype.load = function() {
	  for (var i = 0; i < this.urlList.length; ++i)
	  this.loadBuffer(this.urlList[i], i);
	}

})(angular);