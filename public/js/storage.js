;(function(Game) {

		Game.storage = {

		}

		Object.defineProperties(Game.storage, {

			setKey: {
				value: function(key, val) {
					localStorage.setItem(key, JSON.stringify(val));
				}
			},

			getKey: {
				value: function(key) {
					return JSON.parse(localStorage.getItem(key));
				}
			},

			unsetKey: {
				value: function() {
					
				}
			}

		});

})(Game)