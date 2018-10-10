import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PhoneReg from './PhoneReg';

const styles = theme => ({
  body: {
    padding: '25% 0.5rem',
  },
  pageTitle: {
    fontSize: '1.05rem',
    color: '#888888',
    padding: '0rem 0rem 0.5rem 0.5rem',
  },
  content: {
    padding: '0 0.5rem',
  },
  heading: {
    fontSize: '1rem',
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: '0.8rem',
    color: '#888888',
  },
  button: {
    width: '100%',
    margin: '1rem 0',
  },
});
class AccountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      openPhoneReg: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileSave = this.handleProfileSave.bind(this);
    this.togglePhoneRegDrawer = this.togglePhoneRegDrawer.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleChange(event){
    const panel = event.currentTarget.parentElement.getAttribute('data-panel');
    this.setState({
      expanded: this.state.expanded !== panel ? panel : false,
    });
  };
  handleProfileSave() {
    const params = {
      id: '9591608975',
      name: 'Vinayak',
      location: '',
      mobile: '9591608975',
      mobileVerified: 0,
      email: 'vinay.humberi@gmail.com',
      emailVerified: 0,
      addressLine1: '#138, Madhura chetana colony',
      addressLine2: 'Kusugal Road',
      city: 'Hubli',
    };
    this.props.setUserInfo(params);
  }
  togglePhoneRegDrawer() {
    this.setState({
      openPhoneReg: !this.state.openPhoneReg,
    });
  }
  render () {
    const { classes } = this.props;
    return(
      <div className={classes.body}>
        <Typography className={classes.pageTitle} gutterBottom variant="headline" component="h1">
          Your Profile:    
        </Typography>
        <div className={classes.content}>
          <div>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={()=>{
                this.setState({
                  openPhoneReg: !this.state.openPhoneReg,
                });
              }}
            >
              Phone Reg
          </Button>
          </div>
          <PhoneReg
            togglePhoneRegDrawer={this.togglePhoneRegDrawer}
            openPhoneReg={this.state.openPhoneReg}
          />
        </div>
      </div>
    );
  }
}

AccountComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired,
};
export default withStyles(styles)(AccountComponent);