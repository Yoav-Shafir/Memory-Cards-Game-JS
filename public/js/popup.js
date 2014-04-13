;(function(Game) {

	var _addListeners = function(self) {
		var tryAgainBtn = self.el.querySelector('.btn');
		tryAgainBtn.addEventListener('click', function(e) {
			e.preventDefault();
			self.close();
			self.app.resume();
		}, false);
	};

	Game.Popup = function(app) {

		Object.defineProperties(this, {
			app: {
				value: app			
			},

			el: {
				value: document.getElementById(Game.config.POPUP_ID)			
			}
		});

		_addListeners(this);
	};

	Object.defineProperties(Game.Popup.prototype, {
		show: {
			value: function(message) {
				this.el.querySelector('.popup-content')
						.innerHTML = message;
				this.el.classList.add('visible');
			}
		},

		close: {
			value: function(message) {
				this.el.querySelector('.popup-content')
						.innerHTML = '';
				this.el.classList.remove('visible');
			}
		}		
	});

})(Game);