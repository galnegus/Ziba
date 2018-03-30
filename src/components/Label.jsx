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
        <img src={this.props.icon} alt="Goal 2 icon" className={"label__icon grayedout_" + this.props.hoveredOver} />
        <span className={"label__order grayedout_" + this.props.hoveredOver}>{this.props.order}</span>
        <span className={"label__title grayedout_" + this.props.hoveredOver}>{this.props.title}</span>
        <div className={"label__buttons grayedout_" + this.props.hoveredOver}>
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
