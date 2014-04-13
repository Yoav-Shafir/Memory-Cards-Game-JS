;(function(Game) {

		Game.Timer = function() {
			Object.defineProperties(this, {
				el :{
					value: document.getElementById(Game.config.TIMER_ID)
				},
				seconds: {
					value: undefined,
					writable: true
				},
				counting: {
					value: false,
					writable: true
				}
			});	
			this.reset();
		};

		Object.defineProperties(Game.Timer.prototype, {

			init: {
				value: function() {
					var self = this;
					
					this.resume();
					
					(function count() {
						if (!self.counting) return;	

						if (typeof self.seconds === 'undefined')
							self.seconds = 0;
						else
							self.seconds++;

						self.el.innerHTML = self.convertSecondsToTimeFormat(self.seconds);	
						setTimeout(count, 1000);	
					})();

				}
			},

			reset: {
				value: function() {
					this.el.innerHTML = '00:00';
				}
			},

			resume: {
				value: function() {	
					this.seconds = undefined;
					this.counting = true;
				}
			},

			convertTo2DigitsFormat: {
				value: function(value) {
					if (value < 10) 
						return '0' + value;
					else
						return value;
				}
			},

			convertSecondsToTimeFormat: {
				value: function(numOfSeconds) {
					var min, sec;
					
					min = Math.floor(numOfSeconds / 60);
					sec = numOfSeconds % 60;
					return this.convertTo2DigitsFormat(min) + ':' +  this.convertTo2DigitsFormat(sec);
				}
			},

			stop: {
				value: function() {
					this.counting = false;
				}
			}	

		});

})(Game)