'use strict';

var React = require('react');

module.exports = React.createClass({
  renderDogs: function() {
    return this.props.data.map(function(dog) {
      return (
        <li>
          {dog.name}<br/>
          {dog.breed}
        </li>
      );
    });
  },
  render: function() {
    return (
      <ul>
        {this.renderDogs()}<br/>
      </ul>
    );
  }
});
