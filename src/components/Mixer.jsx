var React = require('react');
var Wad = require('wad');

var SoundsList = require('./SoundsList.jsx');
var sounds = require('../data/sounds.json');


var Mixer = React.createClass({

  propTypes: {
    staticRoot: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      staticRoot: '//relaxing-sounds-mixer.s3.amazonaws.com/sounds/'
    };
  },

  getInitialState: function() {
    // add default property keys to json
    for (var key in sounds) {
      var sound = sounds[key];
      sound.enabled = false;
      sound.vol = "0.5";
      sound.pan = "0";
      sound.pass = 'none';
      sound.passFreq = "0.5";
    }
    return {
      sounds: sounds,
      mute: false
    };
  },

  componentDidMount: function() {
    // var sound = new Wad({
    //   source : this.props.staticRoot + 'windycanyon.mp3',
    //   loop: true,
    //   env: {
    //     hold: 10000
    //   },
    //   filter: {
    //     type      : 'lowpass', // What type of filter is applied.
    //     frequency : 600,       // The frequency, in hertz, to which the filter is applied.
    //     q         : 1,         // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
    //   }
    // });
    // sound.play();
  },

  handleSoundChange: function(soundId, event) {
    var input = event.target;
    var fieldName = input.name.split('_')[0]; // remove unique id
    var value = input.type === "checkbox" ? input.checked : input.value;
    var sounds = this.state.sounds;
    var sound = sounds[soundId];

    sound[fieldName] = value;
    console.log(sounds);
    this.setState({sounds: sounds});
  },

  render: function() {
    return (
      <div>
        <p>We mixin here</p>
        <SoundsList handleSoundChange={this.handleSoundChange} />
      </div>
    );
  }

});

module.exports = Mixer;
