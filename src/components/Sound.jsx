var React = require('react');


var Sound = React.createClass({

  propTypes: {
    id: React.PropTypes.string.isRequired,
    enabled: React.PropTypes.bool.isRequired,

    // file info
    name: React.PropTypes.string.isRequired,
    file: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    attribution: React.PropTypes.object,

    // filters
    vol: React.PropTypes.string.isRequired,
    pan: React.PropTypes.string.isRequired,
    pass: React.PropTypes.string.isRequired, // low, high, or none
    passFreq: React.PropTypes.string.isRequired
  },

  render: function() {
    var attribution;
    if (this.props.hasOwnProperty('attribution')) {
      attribution = (
        <div className="attribution">
          sound by <a href={this.props.attribution.link}>{this.props.attribution.text}</a>
        </div>
      );
    }
    var frequencyBands = ['none', 'low', 'high'];
    var frequencyInputs = [];
    frequencyBands.forEach(function(band, index){
      var id = ['pass', band, this.props.id].join('_');
      frequencyInputs.push(
        <div className="frequency-band-selection" key={index}>
          <input name={"pass_" + this.props.id} type="radio" value={band}
                 id={id} defaultChecked={this.props.pass == band}
                 onChange={this.props.handleSoundChange.bind(null, this.props.id)} />
          <label htmlFor={id}>{band}</label>
        </div>
      );
    }.bind(this));

    return (
      <div className="sound">
        <input name="enabled" type="checkbox" defaultChecked={this.props.enabled}
               onChange={this.props.handleSoundChange.bind(null, this.props.id)} />

        <h2>{this.props.name}</h2>
        <p className="description">{this.props.description}</p>
        {attribution}

        <div className="basic-controls">
          <div className="slider">
            <label className="range">volume</label>
            <input name="vol" type="range" min="0" max="1" step="0.1"
                   defaultValue={this.props.vol}
                   onChange={this.props.handleSoundChange.bind(null, this.props.id)} />
            <span className="input-value">{this.props.vol}</span>
          </div>
          <div className="slider">
            <label className="range">pan</label>
            <input name="pan" type="range" min="-1" max="1" step="0.2"
                   defaultValue={this.props.pan}
                   onChange={this.props.handleSoundChange.bind(null, this.props.id)} />
            <span className="input-value">{this.props.pan}</span>
          </div>
        </div>

        <div className="advanced-controls">
          <h3>Frequency filter</h3>
          {frequencyInputs}
          <label className="range">frequency</label>
          <input name="passFreq" type="range" min="0" max="1" step="0.05"
                 defaultValue={this.props.passFreq}
                 onChange={this.props.handleSoundChange.bind(null, this.props.id)} />
          <span className="input-value">{this.props.passFreq}</span>
        </div>

      </div>
    );
  }

});


module.exports = Sound;
