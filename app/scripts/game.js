window.Game = (function() {
	'use strict';

	var Controls = window.Controls;
	var PIPES    = 6;
	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.pipes = [];
		this.Backgrounds = [];
		this.grounds = [];

		this.Backgrounds[0] = this.el.find('.Background1');
		this.Backgrounds[1] = this.el.find('.Background2');
		this.grounds[0] = this.el.find('.Ground1');
		this.grounds[1] = this.el.find('.Ground2');

		for(var i = 0; i < PIPES; i+=2) {
			this.pipes[i]   = this.el.find('.Pipe'+ i);
			this.pipes[i+1] = this.el.find('.Pipe'+ (i+1));
		}

		//this.pipe   = new window.Pipes(this.el.find('.Pipes'), this);
		this.pipe   = new window.Pipes(this.pipes, this);
		this.player = new window.Player(this.el.find('.Player'), this, this.pipe);
		this.ground = new window.Ground(this.grounds, this);
		this.Background = new window.Background(this.Backgrounds, this);

		this.BackgroundSound = new Audio('/audio/background.mp3');
		this.sound           = new Audio('/audio/Upptaka.m4a');
		this.lostSound = new Audio('/audio/lost.mp3');

		this.isPlaying = false;
		this.isIdle    = true;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}
		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
		delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.ground.onFrame(delta);
		this.pipe.onFrame(delta);
		this.Background.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		this.BackgroundSound.currentTime = 0;
		this.BackgroundSound.loop = true;
		this.BackgroundSound.play();
		this.sound.currentTime = 0;
		this.sound.volume = 0.2;

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);

		this.isPlaying = true;
		this.isIdle = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	 	var muted = false;	
	Game.prototype.Mute = function() {
		this.BackgroundSound.pause();
		if(muted === false){
			this.BackgroundSound.pause();
		}

	};
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		this.BackgroundSound.pause();
		this.lostSound.currentTime = 1.5;
		this.lostSound.play();
		console.log(this.player.score);
		document.getElementById('Score').innerHTML = this.player.score;
		this.player.score = 0;
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};





	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();
