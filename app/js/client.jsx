'use strict';

var React = require('react');
var request = require('superagent');

//Components
var DogList = require('./components/dog_list.jsx');
var DogInput = require('./components/dog_input.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {title: 'Dogs!', dogs: []};
  },
  componentDidMount: function() {
    request
      .get('/api/dogs')
      .end(function(err, res) {
        if (err) return console.log(err);
        this.setState({dogs: res.body});
      }.bind(this));
  },
  saveDog: function(dog) {
    this.state.dogs.push(dog);
    this.forceUpdate();
    request
      .post('/api/dogs')
      .send(dog)
      .end(function(err, res) {
        if (err) return console.log(err);
        this.state.dogs.splice(this.state.dogs.indexOf(dog), 1, res.body);
      }.bind(this));
  },
  render: function() {
    return (
      <article>
        <h1>{this.state.title}</h1>
        <DogInput save={this.saveDog} />
        <DogList data={this.state.dogs} />
      </article>
    );
  }
});

React.render(<App />, document.getElementsByTagName('main')[0]);
