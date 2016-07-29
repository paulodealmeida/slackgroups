import React from 'react';
import AppBar from 'material-ui/AppBar';
import {blue900} from 'material-ui/styles/colors';

class Header extends React.Component {

	render() {

		const AppBarStyle = {
			backgroundColor: blue900
		};

		return (
			<AppBar title="Title" style={AppBarStyle} showMenuIconButton={false} />
		)
	}
};

export default Header;