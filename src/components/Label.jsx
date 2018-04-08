import React from 'react';
import PropTypes from 'prop-types';

function Label({
  buttons, icon, order, title, handler, hoveredOver,
}) {
  const buttonList = [];
  buttons.forEach((buttonLabel) => {
    let hoveredClass = '';
    if (buttonLabel === hoveredOver) hoveredClass = ' target-label__button--hovered';
    buttonList.push((
      <button
        className={`target-label__button${hoveredClass}`}
        onClick={handler}
        key={buttonLabel}
      >
        {buttonLabel}
      </button>
    ));
  });

  return (
    <li className={`target-label grayedout_${hoveredOver}`}>
      <img src={icon} alt="Goal 2 icon" className="target-label__icon" />
      <span className="target-label__order grayedout_">{order}</span>
      <span className="target-label__title grayedout_">{title}</span>
      <div className="target-label__buttons grayedout_">
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
