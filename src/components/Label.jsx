import React from 'react';
import PropTypes from 'prop-types';

function Label({
  buttons, icon, order, title, handler, hoveredOver,
}) {
  const buttonList = [];
  buttons.forEach((buttonLabel) => {
    let hoveredClass = '';
    if (buttonLabel === hoveredOver) hoveredClass = ' label__button--hovered';
    buttonList.push((
      <button
        className={`label__button${hoveredClass}`}
        onClick={handler}
        key={buttonLabel}
      >
        {buttonLabel}
      </button>
    ));
  });

  return (
    <li className={`label grayedout_${hoveredOver}`}>
      <img src={icon} alt="Goal 2 icon" className="label__icon" />
      <span className="label__order grayedout_">{order}</span>
      <span className="label__title grayedout_">{title}</span>
      <div className="label__buttons grayedout_">
        {buttonList}
      </div>
    </li>
  );
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
  hoveredOver: PropTypes.string.isRequired,
};

export default Label;
