import React from 'react';
import Toggle from 'react-toggle';
import PropTypes from 'prop-types';
import 'react-toggle/style.css';
import './Legend.css';


function Legend({ handler, colorblind, visible }) {
  return (
    <div className={`legend${visible ? ' legend--visible' : ''}`}>
      <span className="legend-text">How are other targets affectected (negative or positive)?</span>
      <div className="right-color-legend" style={{ display: colorblind ? 'none' : null }}>
        <div className="legend-scale">
          <ul className="legend-labels">
            <li><span style={{ background: '#CC0000' }} />-100%</li>
            <li><span style={{ background: '#D44C00' }} /></li>
            <li><span style={{ background: '#DC9800' }} /></li>
            <li><span style={{ background: '#E5E500' }} />0</li>
            <li><span style={{ background: '#A1C708' }} /></li>
            <li><span style={{ background: '#5DA910' }} /></li>
            <li><span style={{ background: '#198C19' }} />100%</li>
          </ul>
        </div>
      </div>
      <div className="color-blind-legend" style={{ display: colorblind ? null : 'none' }}>
        <div className="legend-scale">
          <ul className="legend-labels">
            <li><span style={{ background: '#7F0000' }} />-100%</li>
            <li><span style={{ background: '#9C413B' }} /></li>
            <li><span style={{ background: '#BA8376' }} /></li>
            <li><span style={{ background: '#D8C5B2' }} />0</li>
            <li><span style={{ background: '#A79AB9' }} /></li>
            <li><span style={{ background: '#7670C0' }} /></li>
            <li><span style={{ background: '#4646C7' }} />100%</li>
          </ul>
        </div>
      </div>
      <div className="toggle-container">
        <label className="toggle-label" htmlFor="colorblind-toggle">
          <Toggle
            onChange={handler}
            id="colorblind-toggle"
          />
          <span className="toggle-label__text">Colorblind mode</span>
        </label>
      </div>
    </div>
  );
};

Legend.propTypes = {
  handler: PropTypes.func.isRequired,
  colorblind: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Legend;
