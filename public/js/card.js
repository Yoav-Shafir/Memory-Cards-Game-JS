;(function(Game) {

	// private helpers methods.
	var _createElement = function(self) {
		self.el = document.createElement('div');
		self.el.className = 'card';
		self.el.setAttribute('data-type', self.type);
	};

	var _addListeners = function(self) {
		self.el.addEventListener('click', function(e) {
			self.deck.selectCard(self)
		}, false);
	};

	// Constructor.
	Game.Card = function(type, deck) {
		Object.defineProperties(this, {
			_isFlipped: {
				value: false,
				writable: true
			},
			type: {
				value: type,
				writable: false	
			},
			deck: {
				value: deck,
				writable: false	
			},
			posX: {
				value: undefined,
				writable: true
			},
			posY: {
				value: undefined,
				writable: true
			}
		});
		
		_createElement(this);
		_addListeners(this);

	};

	Object.defineProperties(Game.Card .prototype, {
		
		isFlipped: {
			get: function() {
				return this._isFlipped;
			},
			set: function(value) {
				this._isFlipped = value;
				this.updateClass(value);	
			}
		},
		
		updateClass: {
			value: function(isFlipped) {
				if (isFlipped)
			 		this.el.classList.add('card-flipped');
				else
			 		this.el.classList.remove('card-flipped');
			}
		},

		remove: {
			value: function() {
				var self = this;
				this.el.addEventListener('webkitTransitionEnd', function() {
					self.el.parentNode.removeChild(self.el);
				});
				this.el.classList.add('card-removed');
			}
		},	

		render: {
			value: function() {
				var div1, div2;

				div1 = document.createElement('div');
				div1.className = 'face front';
				div2 = document.createElement('div');
				div2.className = 'face back';

				this.el.appendChild(div1);
				this.el.appendChild(div2);
				return this.el;
			}
		},

		moveToPosition: {
			value: function() { 
				
				this.el.style.WebkitTransform = 'translate3d(' + 
					(this.posX - Game.config.CARD_START_POINT_X + Game.config.CARD_MARGIN) + 'px, ' + 
					(this.posY - Game.config.CARD_START_POINT_Y + Game.config.CARD_MARGIN) + 'px, 0)';
			}
		},

		onPositionArraived: {
			value: function(startCountingCb) {
				var self, func;

				self = this;
				func = function(e) {
					startCountingCb();
					self.el.removeEventListener('webkitTransitionEnd', func, false);
				};

				this.el.addEventListener('webkitTransitionEnd', func, false);
			}
		}
	});

})(Game);