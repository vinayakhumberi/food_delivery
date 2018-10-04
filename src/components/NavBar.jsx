import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
    padding: '0.5rem',
  },
  fullList: {
    width: 'auto',
  },
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
    };
  }
  componentWillMount() {
    this.props.fetchTaxesAndDiscounts();
  }
	render() {
		const { classes } = this.props;
    console.log(this.props.taxesAndDiscounts);
		return(
      <div>
        <AppBar position="fixed" color={'primary'}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon
                onClick={
                  () => {
                    this.setState({
                      openDrawer: !this.state.openDrawer,
                    });
                  }
                }
              />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Kamat
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.openDrawer}
          onClose={() => {
            this.setState({
              openDrawer: !this.state.openDrawer,
            });
          }}>
          <div
            tabIndex={0}
            role="button"
          >
            <div className={classes.list}>
               <List>
                <ListItem>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText primary="Bob Dylan" secondary="Jan 9, 2014" />
                </ListItem>
              </List>
              <Divider />
              <List component="nav">
                <ListItem button>
                  <ListItemText primary="Helpline number" />
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </div>
		);
	}
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchTaxesAndDiscounts: PropTypes.func.isRequired,
  taxesAndDiscounts: PropTypes.shape().isRequired,
};
export default withStyles(styles)(NavBar);
