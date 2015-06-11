'use strict';

var React = require('react');
var request = require('superagent');
var DogList = require('./components/dog_list.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {title: 'Dogs!', dogs: []};
  },
  componentDidMount: function() {
    request
      .get('./api/dogs')
      .end(function(err, res) {
        if (err) return console.log(err);
        console.log(res.body);
        this.setState({dogs: res.body});
      }.bind(this));
  },
  render: function() {
    return (
      <article>
        <h1>{this.state.title}</h1>
        <DogList data={this.state.dogs} />
      </article>
    );
  }
});

React.render(<App />, document.getElementsByTagName('main')[0]);
