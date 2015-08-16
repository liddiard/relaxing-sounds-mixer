var React = require('react');

var SoundsList = require('./SoundsList.jsx');
var utils = require('../utils.js');
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
      sounds: sounds, // holds metadata about each sound
      buffer: {}, // holds Wad audio object for each sound
      mute: false
    };
  },

  handleSoundChange: function(soundId, event) {
    var input = event.target;
    var fieldName = input.name.split('_')[0]; // remove unique id
    var value = input.type === "checkbox" ? input.checked : input.value;
    var sounds = this.state.sounds;
    var sound = sounds[soundId];

    sound[fieldName] = value;
    this.setState({sounds: sounds},
                  this.updateMix.bind(null, soundId, fieldName, value));
  },

  updateMix: function(soundId, fieldName, value) {
    switch(fieldName) {
      case "enabled":
        if (value)
          utils.playSound(this.state.buffer, soundId, this.props.staticRoot);
        else
          utils.stopSound(this.state.buffer, soundId);
        break;
      case "vol":
        utils.setVolume(this.state.buffer, soundId, value);
        break;
      case "pan":
        utils.setPanning(this.state.buffer, soundId, value);
        break;
      case "pass":
      case "passFreq":
      default:
        console.error("uncrecognized field name: " + fieldName);
    }
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
