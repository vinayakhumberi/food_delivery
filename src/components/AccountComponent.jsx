import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

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
});
class AccountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
    this.handleChange = this.handleChange.bind(this);
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
  render () {
    const { classes } = this.props;
    return(
      <div className={classes.body}>
        <Typography className={classes.pageTitle} gutterBottom variant="headline" component="h1">
          Your Profile:    
        </Typography>
        <div className={classes.content}>
          <ExpansionPanel
            expanded={this.state.expanded === 'panel1'}
            onChange={this.handleChange}
            data-panel="panel1"
            elevation={0}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Name</Typography>
              <Typography className={classes.secondaryHeading}>Bob Dylan</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                id="outlined-name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleNameChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={this.state.expanded === 'panel2'}
            onChange={this.handleChange}
            data-panel="panel2"
            elevation={0}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Phone no.</Typography>
              <Typography className={classes.secondaryHeading}>
                9591608973
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                id="outlined-name"
                label="Mobile no."
                type="tel"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleNameChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={this.state.expanded === 'panel3'}
            onChange={this.handleChange}
            data-panel="panel3"
            elevation={0}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Address</Typography>
              <Typography className={classes.secondaryHeading}>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl...
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                id="outlined-name"
                label="Address"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleNameChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

AccountComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AccountComponent);