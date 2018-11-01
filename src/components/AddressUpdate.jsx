import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, MobileStepper, Button, TextField, Typography } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { PHONE_REGEX } from '../config/constants.js';
import { throws } from 'assert';

const propTypes = {
  openAddressUpdate: PropTypes.bool.isRequired,
  toggleAddressUpdateDrawer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleProfileSave: PropTypes.func.isRequired,
  checkUserPresent: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  addressUpdate: PropTypes.bool.isRequired
};

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  capsule: {
    padding: '1rem',
  },
  textField: {
    width: '100%',
  },
  error: {
    color: 'red',
  },
  loginImg: {
    width: '50%',
    margin: '0 25%'
  }
});

class AddressUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddressUpdate: props.openAddressUpdate,
      userInfo: props.userInfo,
      activeStep: 0,
      address1: props.userInfo.data.address1 || '',
      address2: props.userInfo.data.address2 || '',
      address3: props.userInfo.data.address3 || '',
      name: props.userInfo.data.name || '',
      error: '',
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userInfo.status === 2 && nextProps.userInfo.status !== prevState.userInfo.status) {
      return { openAddressUpdate: false, userInfo: nextProps.userInfo };
    }
    if (nextProps.openAddressUpdate !== prevState.openAddressUpdate) {
      return { openAddressUpdate: nextProps.openAddressUpdate }
    }
    else return null;
  }
  handleNext() {
    if (this.state.activeStep < 1) {
      if (this.state.address1.length > 2 && this.state.address2.length > 2) {
        this.setState(prevState => ({
          activeStep: prevState.activeStep + 1,
          error: '',
        }));
      } else {
        this.setState({
          error: 'This is where your food gets deliverd!'
        });
      }
    } else if (this.state.activeStep === 1) {
      if (this.state.name.length >= 2) {
        // update address
        let params = Object.assign({}, this.props.userInfo.data);
        params.address1 = this.state.address1;
        params.address2 = this.state.address2;
        params.address3 = this.state.address3;
        params.name = this.state.name;
        params.addressUpdate = this.props.addressUpdate;
        this.props.handleProfileSave(params);
      } else {
        this.setState({
          error: 'Please enter a name'
        });
      }
    }
  };

  handleBack() {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
      error: '',
    }));
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Drawer
          anchor="bottom"
          open={this.state.openAddressUpdate}
          onClose={() => {
            this.props.toggleAddressUpdateDrawer('bottom', false)
          }}
        >
          <div className={classes.capsule}>
            {this.state.activeStep === 0 && <div className={'slide-1'}>
              <Typography className={classes.cardTitle} variant="body2" gutterBottom>
                Where to deliver?
              </Typography>
              <TextField
                id="address1"
                label="House no."
                onChange={(e) => {
                  const address1 = e.target.value;
                  this.setState({
                    address1,
                    error: '',
                  });
                }}
                value={this.state.address1}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="address2"
                label="Street name/ Locality name"
                onChange={(e) => {
                  const address2 = e.target.value;
                  this.setState({
                    address2,
                    error: '',
                  });
                }}
                value={this.state.address2}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="address3"
                label="Landmark"
                onChange={(e) => {
                  const address3 = e.target.value;
                  this.setState({
                    address3,
                    error: '',
                  });
                }}
                value={this.state.address3}
                type="phno"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>}
            {this.state.activeStep === 1 && <div className={'slide-2'}>
              <Typography className={classes.cardTitle} variant="body2" gutterBottom>
                Who is the order for?:
              </Typography>
              <TextField
                id="name"
                label="Name"
                onChange={(e) => {
                  const name = e.target.value;
                  this.setState({
                    name,
                    error: ''
                  });
                }}
                value={this.state.name}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>}
            <Typography className={classes.error} variant="caption" gutterBottom>
              {this.state.error || <br />}
            </Typography>
            <img className={classes.loginImg} src="/img/address.jpg" alt="login" />
          </div>
          <MobileStepper
            steps={2}
            position="static"
            activeStep={this.state.activeStep}
            className={classes.mobileStepper}
            nextButton={
              <Button size="small" onClick={this.handleNext}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                <KeyboardArrowLeft />
                Back
            </Button>
            }
          />
        </Drawer>
      </div>
    );
  }
}

AddressUpdate.propTypes = propTypes;

export default withStyles(styles)(AddressUpdate);
