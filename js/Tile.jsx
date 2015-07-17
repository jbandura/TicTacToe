/** @jsx React.DOM */
'use strict'
var React = require('react')

module.exports = React.createClass({
  
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
