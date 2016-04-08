window.Pipes = (function() {
  'use strict';

  var SPEED = 30;
  var WIDTH = 10;
  var HEIGHT = 15;
  var INITIAL_POSITION_X = 0;
  var INITIAL_POSITION_Y = 0;
  var rand = 0;

  var Pipes = function(el, game) {
      this.el   = el;
      this.game = game;

      this.pipes = [];

      for(var i = 0; i < this.el.length; i++) {
        //this.pipes[i] = {};
        this.pipes[i] = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y };
        INITIAL_POSITION_X += 45;
        rand = (Math.random() * 20) + 10;
        this.el[i].css({"height" : rand+'em'});
        //console.log(this.pipes[i].x)
        //console.log(this.el[i]);
      }

      //this.pos  = { x: 0, y: 0 };
  };

  Pipes.prototype.reset = function(i) {

    //this.pos.x = INITIAL_POSITION_X;
    //this.pos.y = INITIAL_POSITION_Y;
    INITIAL_POSITION_X = 0;
    INITIAL_POSITION_Y = 0;
  //  this.pipes[i].x = 0;
  //  this.pipes[i].y = 0;
    for(var i = 0; i < this.pipes.length; i++) {
      this.pipes[i] = { x: INITIAL_POSITION_X, y: INITIAL_POSITION_Y};
      rand = (Math.random() * 20) + 10;
      this.el[i].css({"height" : rand+'em'});
      INITIAL_POSITION_X += 45;
    }
  };

  Pipes.prototype.onFrame = function(delta) {
  //  this.checkCollisionWithBounds();

    for (var i = 0; i < this.pipes.length; i++) {
      this.pipes[i].x -= delta * SPEED;
      this.checkCollisionWithBounds(parseInt(i));
    }
  };


  Pipes.prototype.checkCollisionWithBounds = function(i) {
    if(this.pipes[i].x <= -this.game.WORLD_WIDTH - 30) {
      this.pipes[i].x = 5;
      rand = (Math.random() * 20) + 10;
      this.el[i].css({"height" : rand+"em"});
    }
    else {
      this.el[i].css('transform', 'translate(' + this.pipes[i].x + 'em, ' + this.pipes[i].y + 'em)');
    }

    /*
    for(var i = 0; i < this.pipes.length; i++) {
      if(this.pipes[i].x + this.game.WORLD_WIDTH < 0) {
        this.pipes[i].x = 0;
        this.pipes[i].y = 0;
        rand = (Math.random() * 20) + 10;
        this.el[i].css({"height" : rand+'em'});
      }
    }*/
	};

  return Pipes;
})();
