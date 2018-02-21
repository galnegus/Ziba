var React = require('react');
var createReactClass = require('create-react-class');

export const Donut = createReactClass({
    getInitialState() {
        return {
            data: null,
            keys: null,
        }
    },

    componentWillMount(){
        this.componentWillReceiveProps(this.props);
    },

    componentWillReceiveProps(nextProps){
        this.setState({data: nextProps.data, keys:nextProps.keys});
    },

	componentDidMount(){
		this.drawDonut();
	},

	drawDonut(){
		console.log("drawDonut");
	},

	render() {
		console.log("[13.1][9.4]= ", this.state.data[this.state.keys["13.1"]][this.state.keys["9.4"]])
		return (
			<div className="Donut">
				Donut
			</div>
		);
	}
});