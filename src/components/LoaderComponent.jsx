import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: '#2196f3',
    height: '100vh',
    justifyContent: 'center',
    alignItem: 'center',
    color: '#fff',
    textAlign: 'center'
  },
}
function LoaderComponent(props) {
  return (
    <div className={props.classes.root}>
      <img src="/img/puff.svg" alt="sa" />
      <br />
      <div>Loading...</div>
    </div>
  );
}

LoaderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(LoaderComponent);
