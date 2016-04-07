window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	//var Pipes = window.Pipes;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	//var SPEED = 30; // * 10 pixels per second
	var SPEED = 20;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game, pipes) {
		this.el = el;
		this.game = game;
		this.acceleration = 0;
		this.pos = { x: 0, y: 0 };
		this.pipes = pipes;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.acceleration = 0;
	};

	Player.prototype.onFrame = function(delta) {
		this.checkCollisionWithBounds();
		this.checkCollisionWithPipes();

		if(Controls.didJump()) {
			this.acceleration = 0;
			this.pos.y -= delta * SPEED*30   ;
			//this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
			this.el.css('transform','translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + 23 + 'deg)');
		}
		else {
			this.acceleration += 0.04;
			this.pos.y += delta * SPEED + this.acceleration;
			//this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
			this.el.css('transform','translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + (23) + 'deg)');
		}

	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	// X hja pipe
	// Y hja player

	Player.prototype.checkCollisionWithPipes = function() {
		//console.log("X: [%d] Y: [%d]", this.pos.x, this.pos.y);
		//console.log("PIPE X: [%d] PIPE Y: [%d]", this.pipes.pos.x, this.pipes.pos.y);
		if(this.pos.x + WIDTH === this.pipes.pos.x + 10) {
			//console.log("hit");
			return this.game.gameover();
		}
	}

	return Player;

})();
