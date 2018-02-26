/**
 * Fyll.js
 * Distributed under MIT license.
 * Source: https://github.com/nicklassandell/Fyll.js
*/
;(function() {
	"use strict";

	window.fyll = {

		// Default configuration
		config: {
			actionDelay: 500,
			keyPressInterval: 100,
			humanisePressInterval: true,
			focusClass: 'fyll-focus',
			complete: false
		},

		// Initializer
		go: function(query, config) {

			// Make sure it's not already running
			if(this.isRunning) {
				console.warn('Fyll: Only one instance of Fyll can be run at once.');
				return false;
			}

			// Merge supplied config with default
			if(typeof config === 'object') {
				this.config = this.helpers.mergeObjects(this.config, config);
			}
			// If function was passed, set it as callback function
			else if(typeof config === 'function') {
				this.config.complete = config;
			}

			this.isRunning = true;
			this.queue = this.parseQuery(query);
			this.readQueue();
		},

		// Looper; initiates every action and calls the next one
		// after. Also responsible for pausing inbetween.
		readQueue: function() {
			var fyll = window.fyll;
			
			// Is queue empty? If so, run "complete" callback.
			if(!fyll.queue.length) {
				if(typeof fyll.config.complete === 'function') {
					fyll.config.complete();
				}
				fyll.isRunning = false;
				return false;
			}

			var next = fyll.queue.pop(),
				instr = fyll.parseInstruction(next),
				action = fyll.actions[instr.action];

			// Does the action exist?
			if(typeof action === 'object') {
				action.execute(instr.value, function() {

					// As long as there are any instructions left, continue
					if(fyll.queue.length > 0) {

						// Default pause is 0ms
						var pauseAfter = 0;

						if(action.pauseAfter) {
							pauseAfter = fyll.config.actionDelay;
						}
						setTimeout(fyll.readQueue, pauseAfter);
					
					// This was the last one, no need to pause
					} else {
						fyll.readQueue();
					}
				});

			// Action didn't exist, let's continue but throw an error
			} else {
				console.error('Fyll: The specified action `'+ instr.action +'` does not exist.');
				fyll.readQueue();
			}
		},

		// Parses full query into small instructions
		parseQuery: function(instr) {
			var then = instr.split('then');
			
			for(var i=0; i < then.length; ++i) {
				then[i] = this.helpers.betterTrim(then[i]);
			}
			return then.reverse();
		},

		// Parses single instruction into action/value pairs
		parseInstruction: function(query) {
			var kv = query.split(' '),
				res = {};

			res.action = kv[0];
			res.value = kv[1];

			return res;
		},

		// Get press interval
		// Dependent on config.humanisePressInterval
		getPressInterval: function() {
			var interval = this.config.humanisePressInterval ? this.config.keyPressInterval + ((Math.random()*1.5-.5)*100) : this.config.keyPressInterval;
			return interval;
		},


		// Various helpers
		helpers: {
			betterTrim: function(text) {
				return text.replace(/\s+(?=\s)/g, '').trim();
			},
			mergeObjects: function (originalObject, objectToAppend) {
			    for (var item in objectToAppend) {
			        if (objectToAppend.hasOwnProperty(item)) {
			            originalObject[item] = objectToAppend[item];
			        }
			    }
			    return originalObject;
			}
		},


		// Action helpers
		actionHelpers: {
			setFocus: function(target, callback) {
				var fyll = window.fyll;

				// Add focus class
				target.className += ' ' + fyll.config.focusClass;

				// Wait a keystroke after focus
				if(typeof callback === 'function') {
					setTimeout(callback, fyll.getPressInterval());
				}
			},
			removeFocus: function(target, callback) {
				var fyll = window.fyll;

				setTimeout(function() {
					target.className = target.className.replace(fyll.config.focusClass, '');

					if(typeof callback === 'function') {
						callback();
					}
				}, fyll.getPressInterval());
			}
		},


		// All available actions are in here. This object can be extended.
		actions: {

			// Fill a text field
			fill: {
				pauseAfter: true,
				execute: function(value, callback) {
					var fyll = window.fyll,
						target = document.getElementById(value);

					if(!target) {
						console.warn('Fyll: The specified target `'+ value +'` does was not found.');
						callback();
						return false;
					}

					// Reset target value
					target.value = '';

					var fillValue = target.getAttribute('data-fyll');

					// Check if there is a value to fill with
					if(fillValue) {
						var letters = fillValue.split('').reverse();

						// Wait a keystroke after focus
						fyll.actionHelpers.setFocus(target, function() {

							// Function to run for each keypress
							var pressFunc = function() {
								target.value += letters.pop();

								// Last letter, let's run the callback
								if(letters.length < 1) {
									fyll.actionHelpers.removeFocus(target);
									callback();

								// Not last letter, let's self invoke
								} else {
									setTimeout(pressFunc, fyll.getPressInterval());
								}
							}

							// Call press once. It will self invoke after.
							pressFunc();
						});

					// No fill value was attached to element
					} else {
						console.warn('Fyll: No fill value was attached to element #' + value);
						callback();
					}
				}
			},

			// Click a button
			click: {
				pauseAfter: true,
				execute: function(value, callback) {
					var fyll = window.fyll,
						target = document.getElementById(value);

					if(!target) {
						console.warn('Fyll: The specified target `'+ value +'` does was not found.');
						callback();
						return false;
					}

					fyll.actionHelpers.setFocus(target, function() {
						fyll.actionHelpers.removeFocus(target, function() {
							callback();
						});
					});
				}
			},

			// Toggle checkbox/radio
			toggle: {
				pauseAfter: true,
				execute: function(value, callback) {
					var fyll = window.fyll,
						target = document.getElementById(value);

					if(!target) {
						console.warn('Fyll: The specified target `'+ value +'` does was not found.');
						callback();
						return false;
					}

					if(typeof target.checked === 'boolean') {
						target.checked = !target.checked;
					}
					callback();
				}
			},

			// Pause for specified time before continuing
			pause: {
				pauseAfter: false,
				execute: function(value, callback) {
					setTimeout(callback, value);
				}
			}
		}
	};

})();