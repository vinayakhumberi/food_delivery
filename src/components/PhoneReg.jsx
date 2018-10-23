import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, MobileStepper, Button, TextField, Typography } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { PHONE_REGEX } from '../config/constants.js';
import { throws } from 'assert';

const propTypes = {
  openPhoneReg: PropTypes.bool.isRequired,
  togglePhoneRegDrawer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleProfileSave: PropTypes.func.isRequired,
  checkUserPresent: PropTypes.func.isRequired,
  isUserPresent: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
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
    width: '74%',
    margin: '0 13%'
  }
});

class PhoneReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPhoneReg: props.openPhoneReg,
      userInfo: props.userInfo,
      activeStep: 0,
      mobile: '',
      otp: '',
      error: '',
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userInfo.status === 2 && nextProps.userInfo.status !== prevState.userInfo.status) {
      return { openPhoneReg: false, userInfo: nextProps.userInfo };
    }
    if (nextProps.openPhoneReg !== prevState.openPhoneReg) {
      return { openPhoneReg: nextProps.openPhoneReg }
    }
    else return null;
  }
  handleNext() {
    if (this.state.activeStep < 1) { 
      if (this.state.mobile.length === 10) {
        this.setState(prevState => ({
          activeStep: prevState.activeStep + 1,
          error: '',
        }));
        this.props.checkUserPresent(this.state.mobile);
      } else {
        this.setState({
          error: 'Please enter your number'
        });
      }
    } else if (this.state.activeStep === 1) {
      //check if otp is correct
      if (this.state.otp === '1234') {
        // create a new userand log in
        let params = Object.assign({}, this.props.isUserPresent.data);
        params.mobile = this.state.mobile;
        params.otp = this.state.otp;
        params.newLogin = this.props.isUserPresent.status === 2 && Object.keys(this.props.isUserPresent.data).length === 0;
        this.props.handleProfileSave(params);
        console.log('login');
      } else {
        this.setState({
          error: 'Incorrect Otp'
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
    return(
      <div>
        <Drawer
          anchor="bottom"
          open={this.state.openPhoneReg}
          onClose={() => {
            this.props.togglePhoneRegDrawer('bottom', false)
          }}
        >
          <div className={classes.capsule}>
            {this.state.activeStep === 0 && <div className={'slide-1'}>
              <Typography className={classes.cardTitle} variant="body2" gutterBottom>
                Where can we call you?
              </Typography>
              <TextField
                id="outlined-number"
                label="Mobile"
                onChange={(e) => {
                  const mobile = e.target.value;
                  if (PHONE_REGEX.test(mobile)){
                    this.setState({
                      mobile,
                      error: '',
                    });
                  }
                }}
                value={this.state.mobile}
                type="phno"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>}
            {this.state.activeStep === 1 && <div className={'slide-2'}>
              <Typography className={classes.cardTitle} variant="body2" gutterBottom>
                Enter the otp:
              </Typography>
              <TextField
                id="outlined-number"
                label="OTP"
                onChange={(e) => {
                  const otp = e.target.value;
                  if (otp.length <= 4) {
                    this.setState({
                      otp,
                      error: ''
                    });
                  }
                }}
                value={this.state.otp}
                type="phno"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>}
            <Typography className={classes.error} variant="caption" gutterBottom>
              {this.state.error || <br />}
            </Typography>
            <img className={classes.loginImg} src="/img/login.jpg" alt="login" />
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

PhoneReg.propTypes = propTypes;

export default withStyles(styles)(PhoneReg);
