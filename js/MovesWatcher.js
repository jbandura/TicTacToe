
'use strict'

module.exports = (function() {
  function MovesWatcher() {
    this.lastSymbol = null;
    this.boardState = [
      "", "", "",
      "", "", "",
      "", "", ""
    ];
  };
  
  MovesWatcher.prototype.getNextSymbol = function(fieldName) {
    var nextSymbol = this.lastSymbol === 'x' ? 'o' : 'x'; 
    
    this.lastSymbol = nextSymbol;
    this.markMoveOnBoard(fieldName, nextSymbol);
    
    return nextSymbol;
  };
  
  MovesWatcher.prototype.setLastSymbol = function(symbol) {
    this.lastSymbol = symbol;
  };
  
  MovesWatcher.prototype.checkBoardState = function() {
    var bs = this.boardState;
    //horizontal
    if(this.checkRow(bs[0], bs[1], bs[2])) return bs[0]; 
    if(this.checkRow(bs[3], bs[4], bs[5])) return bs[3]; 
    if(this.checkRow(bs[6], bs[7], bs[8])) return bs[6]; 
    //vertical
    if(this.checkRow(bs[0], bs[3], bs[6])) return bs[0]; 
    if(this.checkRow(bs[1], bs[4], bs[7])) return bs[1]; 
    if(this.checkRow(bs[2], bs[5], bs[8])) return bs[2]; 
    //diagonal
    if(this.checkRow(bs[0], bs[4], bs[8])) return bs[0]; 
    if(this.checkRow(bs[2], bs[4], bs[6])) return bs[2]; 
    //draw
    if($.inArray("", bs) === -1) return "draw";
    
    return null;
  };
  
  MovesWatcher.prototype.checkRow = function(fst, snd, third) {
    var row = (fst + snd + third);
    return row === 'xxx' || row === 'ooo';
  };
  
  MovesWatcher.prototype.markMoveOnBoard = function(fieldName, move) {
    var pos = this.calculatePositionBasedOnField(fieldName);
    this.boardState[pos] = move;
  }
  
  MovesWatcher.prototype.calculatePositionBasedOnField = function(field) {
    var fieldsToPositions = {
      "A1": 0,
      "A2": 3,
      "A3": 6,
      "B1": 1,
      "B2": 4,
      "B3": 7,
      "C1": 2,
      "C2": 5,
      "C3": 8
    };
    return fieldsToPositions[field];
  };
  
  MovesWatcher.prototype.displayResult = function(message) {
    $('.backdrop').text(message);
    $('.backdrop').removeClass('hide'); 
  };
  
  MovesWatcher.prototype.restartGame = function() {
    this.boardState = [
      "","","",
      "","","",
      "","",""
    ];
    this.setLastSymbol(null);
    $('.backdrop').addClass('hide');
  };
  
  return MovesWatcher;
})();
