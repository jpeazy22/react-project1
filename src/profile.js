var React = require('react');

var Profile = React.createClass({
	render: function(){
		return (
			<div>
			<h3>{this.props.name}</h3>
			<img src={this.props.imgURL} />
			</div>
		);
	}
});

module.exports = Profile;