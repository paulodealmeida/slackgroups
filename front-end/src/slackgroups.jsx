import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './header';
import MainBody from './main_body';
import injectTapEventPlugin from 'react-tap-event-plugin';

class Slackgroups extends React.Component {
  render() {

		return (
			<MuiThemeProvider>
				<div>
					<Header /> 
					<MainBody />
				</div>
			</MuiThemeProvider>
		)
  }
}

injectTapEventPlugin();
export default Slackgroups;