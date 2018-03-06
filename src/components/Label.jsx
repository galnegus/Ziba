import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Label extends Component {
  render() {
    const buttons = [];
    this.props.buttons.forEach((buttonLabel) => {
      buttons.push((
        <button
          className="label__button"
          onClick={this.props.handler}
          key={buttonLabel}
        >
          {buttonLabel}
        </button>
      ));
    });

    return (
      <li className="label">
        <img src={this.props.icon} alt="Goal 2 icon" className="label__icon" />
        <span className="label__order">{this.props.order}</span>
        <span className="label__title">{this.props.title}</span>
        <div className="label__buttons">
          {buttons}
        </div>
      </li>
    );
  }
}

Label.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  icon: PropTypes.string.isRequired,
  order: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default Label;
