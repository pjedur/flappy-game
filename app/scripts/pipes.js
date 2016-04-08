window.Pipes = (function() {
  'use strict';

  var SPEED = 30;
  var WIDTH = 10;
  var HEIGHT = 15;
  var INITIAL_POSITION_X = 0;
  var INITIAL_POSITION_Y = 0;
  var rand = 0;
  var bottom = 0;

  var Pipes = function(el, game) {
      this.el   = el;
      this.game = game;
      this.pipes = [];


      for(var i = 0; i < this.el.length; i+=2) {
        this.pipes[i]   = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y };
        this.pipes[i+1] = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y };
        INITIAL_POSITION_X += 45;
        rand = (Math.random() * 20) + 10;
        this.el[i].css({"height" : rand+'em'});
        this.el[i+1].css({"bottom": '0'});
        this.el[i+1].css({"height" : '6em'});
      }
  };

  Pipes.prototype.reset = function(i) {
    INITIAL_POSITION_X = 0;
    INITIAL_POSITION_Y = 0;

    for(var i = 0; i < this.pipes.length; i+=2) {
      this.pipes[i] = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y};
      this.pipes[i+1] = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y};
      rand = (Math.random() * 20) + 7;
      bottom = (this.game.WORLD_HEIGHT - rand - 15);
      this.el[i].css({"height" : rand+'em'});
      this.el[i+1].css({"bottom":'0'});
      this.el[i+1].css({"height": bottom +'em'});
      INITIAL_POSITION_X += 45;
    }
  };

  Pipes.prototype.onFrame = function(delta) {
    for (var i = 0; i < this.pipes.length; i+=2) {
      this.pipes[i].x   -= delta * SPEED;
      this.pipes[i+1].x -= delta * SPEED;
      this.checkCollisionWithBounds(parseInt(i));
    }
  };


  Pipes.prototype.checkCollisionWithBounds = function(i) {
    if(this.pipes[i].x <= -this.game.WORLD_WIDTH - 25) {
      this.pipes[i].x = 10;
      this.pipes[i+1].x = 10;

      rand = (Math.random() * 20) + 7;
      bottom = (this.game.WORLD_HEIGHT - rand - 15);
      this.el[i].css({"height" : rand+"em"});
      this.el[i+1].css({"bottom" : 0});
      this.el[i+1].css({"height": bottom +'em'});

    }
    else {
      this.el[i].css('transform', 'translate(' + this.pipes[i].x + 'em, ' + this.pipes[i].y + 'em)');
      this.el[i+1].css('transform', 'translate(' + this.pipes[i+1].x + 'em, ' + this.pipes[i+1].y + 'em)');

    }
	};

  return Pipes;
})();
