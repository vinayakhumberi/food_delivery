import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  body: {
    backgroundColor: '#F5F5F5',
    minHeight: '100vh',
    padding: '25% 0.5rem',
  },
  cell: {
    padding: '1rem',
  },
  textFieldContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2rem 0',
  },
  textField: {
    margin: '2rem 1rem',
  },
  button: {
    margin: '2rem 0',
    width: '100%',
    padding: '1rem',
  },
});
class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: '',
    };
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleCommentChange(event){
    this.setState({
      comments: event.target.value,
    });
  };
  render () {
    const { classes } = this.props;
    const cartTotal = _.reduce(this.props.cart, (sum, item) => {
			return sum + (item.price || 0);
		}, 0);
    return(
      <div className={classes.body}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell} >Item</TableCell>
                <TableCell className={classes.cell} numeric>(Qty)</TableCell>
                <TableCell className={classes.cell} numeric>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.cart.map(row => {
                return (
                  <TableRow key={row.foodId}>
                    <TableCell className={classes.cell}>
                      {row.foodName}
                    </TableCell>
                    <TableCell className={classes.cell} numeric>{row.quantity}</TableCell>
                    <TableCell className={classes.cell} numeric>{row.price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  CGST
                </TableCell>
                <TableCell numeric>Rs. 20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  SGST
                </TableCell>
                <TableCell numeric>Rs. 20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  TOTAL
                </TableCell>
                <TableCell numeric>Rs. {cartTotal}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <div className={classes.textFieldContainer}>
          <TextField
            id="outlined-full-width"
            label="Add instructions!"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            color={'#222222'}
            value={this.state.comments}
            onChange={this.handleCommentChange}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" className={classes.button}>
            Place order
          </Button>
        </div>
      </div>
    );
  }
}

CartComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CartComponent);