import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';

const styles = {
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
};

const selectNav = (path) => {
	let value = 1;
	switch (path) {
		case '/exclusive':
			value = 0;
			break;
		case '/home':
			value = 1;
			break;
		case '/cart':
			value = 2;
			break;
		case '/account':
			value = 3;
			break;
		default:
			value = 1;
	}
	return value;
};
class BottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }
  componentWillMount() {
  	const selected = selectNav(this.props.match.path);
	this.setState({
		selected,
	});
  }
  componentDidUpdate(prevProps) {
	  // Typical usage (don't forget to compare props):
	  if (this.props.match.path !== prevProps.match.path) {
	    const selected = selectNav(this.props.match.path);
		this.setState({
			selected,
		});
	  }
	}
	render() {
		const { classes } = this.props;
		return(
			<BottomNavigation
	          value={this.state.selected}
	          onChange={this.handleChange}
	          showLabels
	          className={classes.stickToBottom}
	        >
	          <BottomNavigationAction
	          	label="Exclusive"
	          	icon={<StarIcon />}
	          	onClick={() => {
	          		this.props.history.push('/exclusive');
	          	}}
	          />
	          <BottomNavigationAction
	            label="Menu"
	            icon={<SearchIcon />}
	            onClick={() => {
	          		this.props.history.push('/home');
	          	}}
	          />
						<BottomNavigationAction
							label="Cart"
							icon={<Badge badgeContent={0} color="primary" classes={{ badge: classes.badge }}><ShoppingCartIcon /></Badge>}
							onClick={() => {
								this.props.history.push('/cart');
							}}
						/>
	          <BottomNavigationAction
	          	label="Account"
	          	icon={<AccountCircleIcon />}
	          	onClick={() => {
	          		this.props.history.push('/account');
	          	}}
	          />
	        </BottomNavigation>
		);
	}
}

export default withStyles(styles)(BottomNav);