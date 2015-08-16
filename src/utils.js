var Wad = require('wad');

var sounds = require('./data/sounds.json');


module.exports = {

  playSound: function(buffer, soundId, staticRoot, filter) {
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
        filter: filter
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
  },

  setFilter: function(buffer, soundId, staticRoot, low, high) {
    var filter = [
      {type: 'lowpass', frequency: this.calculateFreqFactor(low)},
      {type: 'highpass', frequency: this.calculateFreqFactor(high)},
    ];
    try {
      buffer[soundId].wrapper.stop();
    } catch(e) {}
    delete buffer[soundId];
    this.playSound(buffer, soundId, staticRoot, filter);
  },

  calculateFreqFactor: function(value) {
    // http://stackoverflow.com/a/846249

    // position will be between 0 and 1
    var minp = 0;
    var maxp = 1;

    // The result should be between 20 and 20000
    var minv = Math.log(20);
    var maxv = Math.log(20000);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);
    return Math.exp(minv + scale * (value - minp));
  }

};
