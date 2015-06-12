'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {dog: {name: "", breed: ""}};
  },
  saveDog: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var breed = React.findDOMNode(this.refs.breed).value.trim();
    if (!name || !breed) { return; }
    //Update State
    this.props.save({name: name, breed: breed});
    //Clear values
    React.findDOMNode(this.refs.name).value = "";
    React.findDOMNode(this.refs.breed).value = "";
  },
  render: function() {
    return (
      <form onSubmit={this.saveDog}>
        <input type="text" placeholder="Dog Name" ref="name" /><br/>
        <input type="text" placeholder="Dog Breed" ref="breed" /><br/>
        <input type="submit" value="Save Dog" />
      </form>
    )
  }
});
