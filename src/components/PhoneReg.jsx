import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, MobileStepper, Button, TextField, Typography } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const propTypes = {
  openPhoneReg: PropTypes.bool.isRequired,
  togglePhoneRegDrawer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
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
});

class PhoneReg extends React.Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  handleNext() {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack() {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };
  render() {
    const { classes } = this.props;
    return(
      <div>
        <Drawer
          anchor="bottom"
          open={this.props.openPhoneReg}
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                type="phno"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>}
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
