import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from './Label';
import './Labels.css';
import legendGoal1 from '../assets/legend_goal_1.svg';
import legendGoal2 from '../assets/legend_goal_2.svg';
import legendGoal3 from '../assets/legend_goal_3.svg';
import legendGoal4 from '../assets/legend_goal_4.svg';
import legendGoal5 from '../assets/legend_goal_5.svg';
import legendGoal6 from '../assets/legend_goal_6.svg';
import legendGoal7 from '../assets/legend_goal_7.svg';
import legendGoal8 from '../assets/legend_goal_8.svg';
import legendGoal9 from '../assets/legend_goal_9.svg';
import legendGoal10 from '../assets/legend_goal_10.svg';
import legendGoal11 from '../assets/legend_goal_11.svg';
import legendGoal12 from '../assets/legend_goal_12.svg';
import legendGoal13 from '../assets/legend_goal_13.svg';
import legendGoal14 from '../assets/legend_goal_14.svg';
import legendGoal15 from '../assets/legend_goal_15.svg';
import legendGoal16 from '../assets/legend_goal_16.svg';
import legendGoal17 from '../assets/legend_goal_17.svg';

class Labels extends Component {
  render() {
    let h='0';
    if(this.props.hoveredOver){
      h = this.props.hoveredOver.match(/[^\.]*/)[0];
    }
    
    return (
      <div className="labels-container">
        <ul className="labels">
          <Label
            order="1"
            icon={legendGoal1}
            title="No poverty"
            buttons={['1.3', '1.5']}
            handler={this.props.handler}
            hoveredOver={h === "1" ? "on" : "off"}
          />
          <Label
            order="2"
            icon={legendGoal2}
            title="Zero hunger"
            buttons={['2.2', '2.4']}
            handler={this.props.handler}
            hoveredOver={h === "2" ? "on" : "off"}
          />
          <Label
            order="3"
            icon={legendGoal3}
            title="Good health and well-being"
            buttons={['3.4', '3.8']}
            handler={this.props.handler}
            hoveredOver={h === "3" ? "on" : "off"}
          />
          <Label
            order="4"
            icon={legendGoal4}
            title="Quality education"
            buttons={['4.1', '4.4']}
            handler={this.props.handler}
            hoveredOver={h === "4" ? "on" : "off"}
          />
          <Label
            order="5"
            icon={legendGoal5}
            title="Gender equality"
            buttons={['5.4', '5.5']}
            handler={this.props.handler}
            hoveredOver={h === "5" ? "on" : "off"}
          />
          <Label
            order="6"
            icon={legendGoal6}
            title="Clean water and sanitation"
            buttons={['6.5', '6.6']}
            handler={this.props.handler}
            hoveredOver={h === "6" ? "on" : "off"}
          />
          <Label
            order="7"
            icon={legendGoal7}
            title="Affordable and clean energy"
            buttons={['7.2', '7.3']}
            handler={this.props.handler}
            hoveredOver={h === "7" ? "on" : "off"}
          />
          <Label
            order="8"
            icon={legendGoal8}
            title="Decent work and economic growth"
            buttons={['8.4', '8.5']}
            handler={this.props.handler}
            hoveredOver={h === "8" ? "on" : "off"}
          />
          <Label
            order="9"
            icon={legendGoal9}
            title="Industry, innovation and infrastructure"
            buttons={['9.4', '9.5']}
            handler={this.props.handler}
            hoveredOver={h === "9" ? "on" : "off"}
          />
          <Label
            order="10"
            icon={legendGoal10}
            title="Reduced inequalities"
            buttons={['10.1', '10.7']}
            handler={this.props.handler}
            hoveredOver={h === "10" ? "on" : "off"}
          />
          <Label
            order="11"
            icon={legendGoal11}
            title="Sustainable cities and communities"
            buttons={['11.1', '11.2']}
            handler={this.props.handler}
            hoveredOver={h === "11" ? "on" : "off"}
          />
          <Label
            order="12"
            icon={legendGoal12}
            title="Responsible consumption and production"
            buttons={['12.1', '12.5']}
            handler={this.props.handler}
            hoveredOver={h === "12" ? "on" : "off"}
          />
          <Label
            order="13"
            icon={legendGoal13}
            title="Climate action"
            buttons={['13.1', '13.2']}
            handler={this.props.handler}
            hoveredOver={h === "13" ? "on" : "off"}
          />
          <Label
            order="14"
            icon={legendGoal14}
            title="Life below water"
            buttons={['14.1', '14.4']}
            handler={this.props.handler}
            hoveredOver={h === "14" ? "on" : "off"}
          />
          <Label
            order="15"
            icon={legendGoal15}
            title="Life on land"
            buttons={['15.2', '15.5']}
            handler={this.props.handler}
            hoveredOver={h === "15" ? "on" : "off"}
          />
          <Label
            order="16"
            icon={legendGoal16}
            title="Peace, justice and strong institutions"
            buttons={['16.4', '16.6']}
            handler={this.props.handler}
            hoveredOver={h === "16" ? "on" : "off"}
          />
          <Label
            order="17"
            icon={legendGoal17}
            title="Partnerships for the goals"
            buttons={['17.11', '17.13']}
            handler={this.props.handler}
            hoveredOver={h === "17" ? "on" : "off"}
          />
        </ul>
      </div>
    );
  }
}

Labels.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default Labels;
