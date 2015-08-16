var Wad = require('wad');

var sounds = require('./data/sounds.json');


module.exports = {

  playSound: function(buffer, soundId, staticRoot) {
    if (buffer.hasOwnProperty(soundId)) {
      buffer[soundId].wrapper.play();
    }
    else {
      var sound = sounds[soundId];
      var audio = new Wad({
        source: staticRoot + sound.file,
        loop: true,
        env: {
          hold: 10000 // arbitrarily high number to prevent audio from cutting off
        },
      });
      var wrapper = new Wad.Poly({volume: 0.5});
      wrapper.add(audio);
      buffer[soundId] = {};
      buffer[soundId].audio = audio;
      buffer[soundId].wrapper = wrapper;
      audio.play();
    }
  },

  stopSound: function(buffer, soundId) {
    buffer[soundId].wrapper.stop();
  },

  setVolume: function(buffer, soundId, value) {
    buffer[soundId].wrapper.setVolume(parseFloat(value));
  },

  setPanning: function(buffer, soundId, value) {
    buffer[soundId].audio.setPanning(parseFloat(value));
  }



};
