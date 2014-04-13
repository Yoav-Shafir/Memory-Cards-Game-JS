;(function(Game) {

	// scope variables.
	var CARD_WIDTH, CARD_HEIGHT, CARD_MARGIN, countCards;

	var _getNextCardPosition = function() {
		var result = {};
		result.x = ( CARD_WIDTH + CARD_MARGIN) * ( countCards % 4 );
		result.y = ( CARD_HEIGHT * Math.floor( countCards / 4 ) ) + CARD_MARGIN;	
		countCards++;
		return result;
	};	

	Game.Deck = function(app) {
		
		Object.defineProperties(this, {
			
			// ref to main app.
			app: {
				value: app
			},

			// ref to dom elem.
			el: {
				value: document.getElementById(Game.config.DECK_ID),
				writable: false	
			},

			// cards collection.
			_cards: {
				value:  [],
    		writable: false	
			}
			
		});		

		this.setLocalVars();
	};
	
	Object.defineProperties(Game.Deck.prototype, {
		
		setLocalVars: {
			value: function() {
				CARD_WIDTH  = Game.config.CARD_WIDTH;	
				CARD_HEIGHT = Game.config.CARD_HEIGHT;
				CARD_MARGIN = Game.config.CARD_MARGIN;	
				countCards  = 0;
			}
		},

		createCards: {
			value: function() {
				var Card = Game.config.getClass('Card'); 
				for (var i = 0; i < Game.config.NUM_OF_PAIRS; i++) {
					var c1, c2, type;
					type = 'TYPE_' + i;
					
					c1 = new Card(type, this);
					c2 = new Card(type, this);
					
					this.add(c1);
					this.add(c2);
				}
				this.render();
			}
		},

		render: {
			value: function() {
				countCards = 0;
				this.shuffle();
				this.cards.forEach(function(card) {
					this.setCardPosition(card);
					this.el.appendChild(card.render());
				}, this);
			}
		},

		moveToPosition: {
			value: function(startCountingCb) {
				var delay, numOfCards 

				delay      = 500;
				numOfCards = this.cards.length;

				this.cards.forEach(function(card) {
					setTimeout(function() {
						
						numOfCards--;
						if (!numOfCards) 
							// last card.
							card.onPositionArraived(startCountingCb);
					
						card.moveToPosition();
					}, delay += 150);
				}, this);	
			}
		},

		shuffle: {
			value: function() {
				this.cards.sort(function shuffle() {
					return 0.5 - Math.random();
				});		
			}
		},

		setCardPosition: {
			value: function(card) {
				positionObj = _getNextCardPosition();	
				card.posX   = positionObj.x;
				card.posY   = positionObj.y;
			}
		},

		cards: {
			get: function() {
				return this._cards;
			}
		},

		add: {
			value: function(card) {
				this._cards.push(card);
			}
		},

		selectCard: {
			value: function(card) {
				var func;
				if (this.getNumOfFlippedCards() === 2 )
					return;

				card.isFlipped = true;
				if (this.getNumOfFlippedCards() === 2 ){
					func = this.checkIsSameType.bind(this);
					setTimeout(func, 700);
				}
			}
		},

		getNumOfFlippedCards: {
			value: function() {
				var count = 0;
				this.cards.forEach(function(card) {
					if (card.isFlipped)
						count++;
				}, this);
				return count;
			}
		},

		getFlippedCards: {
			value: function() {
				var flippedCards = [];
				this.cards.forEach(function(card) {
					if (card.isFlipped)
						flippedCards.push(card);
				}, this);
				return flippedCards;	
			}
		},	

		checkIsSameType: {
			value: function() {
				if ( this.compareTypes() )
					this.removeFlippedCards();	
				else 
					this.toggleFlippedCards();					
			}
		},	

		compareTypes: {
			value: function() {
				var flippedCards, card1, card2;

				flippedCards = this.getFlippedCards();
				card1 = flippedCards[0];
				card2 = flippedCards[1];
				return card1.type == card2.type;
			}
		},

		toggleFlippedCards: {
			value: function() {
				this.getFlippedCards().forEach(function(flippedCard) {
					flippedCard.isFlipped = false;
				});
			}
		},

		removeFlippedCards: {
			value: function() {
				for (var i = 0; i < this.cards.length; i++) {
					var card = this.cards[i];
					if (!card.isFlipped) continue;

					card.remove();
					this.cards.splice(i, 1);
					i--;	
				}
				this.checkIsDeckEmpty();
				
			}
		},

		checkIsDeckEmpty: {
			value: function() {
				if (!this.cards.length) 
					this.app.gameOver();
			}
		}

	});
	
})(Game);
