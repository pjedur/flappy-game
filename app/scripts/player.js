window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	//var SPEED = 30; // * 10 pixels per second
	var SPEED              = 20;
	var WIDTH              = 5;
	var HEIGHT             = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var GROUND_SIZE        = 5.6;

	var Player = function(el, game, pipes) {
		this.el           = el;
		this.game         = game;
		this.acceleration = 0;
		this.rotation     = 0;
		this.pos          = { x: 0, y: 0 };
		this.pipes        = pipes;
		this.score        = 0;
		this.highScore    = 0;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x        = INITIAL_POSITION_X;
		this.pos.y        = INITIAL_POSITION_Y;
		this.acceleration = 0;
		this.rotation     = 0;
		this.score        = -1;
		this.lastX        = 0;
	};

	Player.prototype.onFrame = function(delta) {
		this.checkCollisionWithBounds();

		if(Controls.didJump()) {
			this.game.isPlaying         = true;
			this.acceleration           = 0;
			this.rotation               = 23;
			this.game.sound.currentTime = 0;
			this.game.sound.play();
			this.pos.y -= delta * SPEED*23;


			this.el.css('transform','translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + this.rotation + 'deg)');
			return;
		}
		else {
			this.acceleration += 0.019;
			this.pos.y += delta * SPEED + this.acceleration;

			this.rotation < -89 ? this.rotation : this.rotation -= 2;
			this.el.css('transform','translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + -this.rotation + 'deg)');
			return;
		}
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.y + HEIGHT + GROUND_SIZE > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}

		for (var i = 0; i < this.pipes.pipes.length; i+= 2) {
			if(Math.floor(this.pipes.pipes[i].x) === -60) {
				this.score++;
			}
			if(Math.floor(this.pipes.pipes[i].x) < -60  && Math.floor(this.pipes.pipes[i].x) > -70) {
				if((this.pipes.pipes[i].y <= this.pos.y) && ((this.game.WORLD_HEIGHT- GROUND_SIZE - this.pipes.pipes[i+1].y) >= this.pos.y)) {
					console.log('JEIJ');
				}
				else {
					return this.game.gameover();
				}
			}
		}
	}


	return Player;

})();
