var React = require('react');

var Sound = require('./Sound.jsx');
var sounds = require('../data/sounds.json');


var SoundsList = React.createClass({

  render: function() {
    var soundComponents = [];
    var sound;
    for (var key in sounds) {
      if (sounds.hasOwnProperty(key)) {
        sound = sounds[key];
        soundComponents.push(
          <Sound name={sound.name} file={sound.file} description={sound.description}
                 attribution={sound.attribution} key={key} id={key}
                 vol={sound.vol} pan={sound.pan} pass={sound.pass}
                 passFreq={sound.passFreq} enabled={sound.enabled}
                 handleSoundChange={this.props.handleSoundChange} />
        );
      }
    }

    return (
      <div>
        {soundComponents}
      </div>
    );
  }

});


module.exports = SoundsList;
