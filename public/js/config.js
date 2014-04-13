;(function(Game) {

	Game.config = {
		classes: {
			Deck: Game.Deck,
			Card: Game.Card,
			Timer: Game.Timer,
			storage: Game.storage,
			Popup: Game.Popup
		},
		NUM_OF_PAIRS: 6,
		DECK_ID: 'cards',
		CARD_WIDTH: 60,
		CARD_HEIGHT: 100,
		CARD_MARGIN: 12,
		TIMER_ID: 'timer',
		POPUP_ID: 'popup',
		CARD_START_POINT_Y: 600
	};
	Game.config.CARD_START_POINT_X = 150 - (Game.config.CARD_WIDTH/2);

	Object.defineProperties(Game.config, {

		getClass: {
			value: function(className) {
				return this.classes[className]
			}
		}

	});
	
})(Game);
