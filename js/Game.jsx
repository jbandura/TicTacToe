/** @jsx React.DOM */
'use strict'

var React = require('react');
var MovesWatcher = require('./MovesWatcher');

var movesWatcher = new MovesWatcher();

var Tile = React.createClass({
  
  getInitialState: function() {
    return {
      isActivated: false 
    };
  },
  
  handleClick: function() {
    if(!this.props.activated) {
      this.setState({
        isActivated: true
      });
      this.props.activated = true;
      this.props.content = movesWatcher.getNextSymbol(this.props.field);
      this.props.tileClicked(this.props.field)
    }
  },
  
  render: function() {
    return <div className="tile" onClick={this.handleClick}>{this.props.content}</div>
  }
});

module.exports = React.createClass({
  
  fields: [
    "A1", "B1", "C1",
    "A2", "B2", "C2",
    "A3", "B3", "C3"
  ],
  
  getInitialState: function() {
    return {
      newGame: false
    } 
  },
  
  tileClicked: function(field) {
    var gameResult = movesWatcher.checkBoardState(),
        player;
    
    if(gameResult === 'draw') {
      movesWatcher.displayResult("Draw!");
    }
    else if(gameResult !== null) {
      player = gameResult === 'o' ? 'Player 2' : 'Player 1';
      movesWatcher.displayResult(player + ' won!');
    }
  },
  
  restartGame: function() {
    movesWatcher.restartGame();
    this.setState({
      newGame: true
    });
  },
  
  render: function() {
      var _this = this,
          fields = [];
    
      this.fields.forEach(function(fieldName){
        fields.push (<Tile field={fieldName} tileClicked={_this.tileClicked} content="" activated={false} />);
      });
        
      return (
        <div>
          {fields}
          <div className="restart-game">
            <button className="btn btn-primary btn-lg restart-game__btn" onClick={this.restartGame}>Restart game</button>
          </div>
        </div>
      );
  }
});
