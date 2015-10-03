(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    this.$el.on("click", "li", function(e){
      var $li = $(e.currentTarget);
      this.makeMove($li);
    }.bind(this));
  };

  View.prototype.makeMove = function ($square) {
    try {
      var pos = $square.data("pos");
      var playerMark = this.game.currentPlayer;
      this.game.playMove(pos);
      $square.removeClass("unclicked").addClass("clicked").text(playerMark);

      if (this.game.isOver()) {
        var winner = this.game.board.winner();
        var $winningTiles = $("li:contains('" + winner + "')");
        $winningTiles.addClass("winning");
        var $loser = $("li").not(".winning").removeClass("unclicked").addClass("losing");
        this.$el.append("<h2>You win, " + playerMark + "!</h2>");
      }
    } catch (e) {
      alert("Invalid Move!");
    };

  };

  View.prototype.setupBoard = function () {
    var $ul = $("<ul></ul>").addClass("ttt-grid group");
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        var $li = $("<li></li>").addClass("unclicked");
        $li.data("pos", [i, j]);
        $ul.append($li);
      };
    };

    this.$el.append($ul);
  };
})();
