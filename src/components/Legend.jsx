import React, { Component } from 'react';
import Toggle from 'react-toggle';
import PropTypes from 'prop-types';
import 'react-toggle/style.css';
import './Legend.css';


class Legend extends Component {
  render() {
    return (
      <div className="legend">
        <div className="right-color-legend" style={{ display: this.props.colorblind ? 'none' : null }}>
          <div className="legend-scale">
            <ul className="legend-labels">
              <li><span style={{ background: '#CC0000' }} />-3</li>
              <li><span style={{ background: '#D44C00' }} />-2</li>
              <li><span style={{ background: '#DC9800' }} />-1</li>
              <li><span style={{ background: '#E5E500' }} />0</li>
              <li><span style={{ background: '#A1C708' }} />1</li>
              <li><span style={{ background: '#5DA910' }} />2</li>
              <li><span style={{ background: '#198C19' }} />3</li>
            </ul>
          </div>
        </div>
        <div className="color-blind-legend" style={{ display: this.props.colorblind ? null : 'none' }}>
          <div className="legend-scale">
            <ul className="legend-labels">
              <li><span style={{ background: '#7F0000' }} />-3</li>
              <li><span style={{ background: '#9C413B' }} />-2</li>
              <li><span style={{ background: '#BA8376' }} />-1</li>
              <li><span style={{ background: '#D8C5B2' }} />0</li>
              <li><span style={{ background: '#A79AB9' }} />1</li>
              <li><span style={{ background: '#7670C0' }} />2</li>
              <li><span style={{ background: '#4646C7' }} />3</li>
            </ul>
          </div>
        </div>
        <div className="toggle-container">
          <label className="toggle-label" htmlFor="colorblind-toggle">
            <Toggle
              //defaultChecked={this.state.baconIsReady}
              onChange={this.props.handler}
              id="colorblind-toggle"
            />
            <span className="toggle-label__text">Colorblind mode</span>
          </label>
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  handler: PropTypes.func.isRequired,
  colorblind: PropTypes.bool.isRequired,
};

export default Legend;
