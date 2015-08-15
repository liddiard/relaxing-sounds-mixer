  var React = require('react');

require('./app.scss');

var Header = require('./components/Header.jsx');
var Mixer = require('./components/Mixer.jsx');

var App = React.createClass({

  render: function() {
    return (
      <div id="app">
        <Header />
        <Mixer />
      </div>
    )
  }

});


React.render(<App />, document.body);
