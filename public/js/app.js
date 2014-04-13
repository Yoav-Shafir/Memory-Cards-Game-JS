// Main.
;(function(Game) {

	Game.App = function(Deck, Timer, Popup) {
		Object.defineProperties(this, {
			deck: {
				value: new Deck(this),
				writable: false
			},
			timer: {
				value: new Timer(),
				writable: false
			},
			popup: {
				value: new Popup(this),
				writable: false
			}
		});
	};
	Object.defineProperties(Game.App.prototype, {
		
		createCards: {
			value: function() {
				this.deck.createCards();
			}
		},

		moveToPosition: {
			value: function(startCountingCb) {
				this.deck.moveToPosition(startCountingCb);	
			}
		},

		startTimer: {
			value: function() {
				this.timer.init();
			}
		},

		gameOver: {
			value: function() {
				
				var time; 
				
				time = this.timer.seconds;
				this.timer.stop();
				this.compareTimeToLastTime(time);	
			}
		},	

		compareTimeToLastTime: {
			value: function(currentTime) {
				var storage, lasttTime, timeToDisplay, message = '';

				storage   = Game.config.getClass('storage');
				lasttTime = storage.getKey('lastTime');

				// first time.
				if (!lasttTime) {
					storage.setKey('lastTime', currentTime);
					timeToDisplay = currentTime;
				}
				else if (currentTime > lasttTime) {
					timeToDisplay = lasttTime;
				}

				if (timeToDisplay) {
					message += '<div class="message-wrapper">';
						message += '<div class="message">Your best time so far:<div>';
						message += '<div class="message-time">' + this.timer.convertSecondsToTimeFormat(timeToDisplay) + '</div>';
					message += '</div>';		
				}
				
				// new record.
				if (lasttTime && (currentTime < lasttTime)) {
					storage.setKey('lastTime', currentTime);
					message += '<div class="message-wrapper">';
						message += '<div class="congratulations">Congratulations!</div>'
						message += '<div class="message">Your have set a new record:<div>';
						message += '<div class="message-time">' + this.timer.convertSecondsToTimeFormat(currentTime) + '</div>';
					message += '<div>';
				}	
				
				this.showPopup(message);	

			}
		},	

		showPopup: {
			value: function(message) {
				this.popup.show(message);
			}
		},	

		resume: {
			value: function() {
				this.timer.reset();
				this.init();
			}
		},

		init: {
			value: function() {
				var startCountingCb, self;

				self = this;

				this.createCards();

				startCountingCb = this.startTimer.bind(this);
				setTimeout(function() {
					self.moveToPosition(startCountingCb);	
				}, 2000);
			}
		}
	});
})(Game);