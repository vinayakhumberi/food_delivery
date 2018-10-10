import React from 'react';
import PropTypes from 'prop-types';
import { reduce } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { calculateTaxesAndDiscount } from '../utils/TaxesAndDiscount';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  pageTitle: {
    fontSize: '1.05rem',
    color: '#888888',
    padding: '0 0.5rem',
  },
  content: {
    padding: '0 0.5rem',
  },
  body: {
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
  emptyCart: {
    padding: '2rem 1rem',
    textAlign: 'center',
  },
  emptyImage: {
    margin: '2rem 0',
  }
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
    const { classes, taxesAndDiscounts } = this.props;
    let taxAndDis = null;
    const cartTotal = reduce(this.props.cart, (sum, item) => {
			return sum + (item.price || 0);
		}, 0);
    if (this.props.taxesAndDiscounts.status === 2) {
      taxAndDis = calculateTaxesAndDiscount(this.props.taxesAndDiscounts.data, cartTotal);
    }
    const taxesHtml = taxAndDis && taxAndDis.taxes.map((tax) =>
      (
        <TableRow key={tax.id}>
          <TableCell component="th" scope="row">
            {tax.waive ? <strike>{tax.name}</strike> : tax.name}
          </TableCell>
          <TableCell numeric>
            ₹ {tax.waive ? <strike>{tax.calPrice || tax.value}</strike> : tax.calPrice || tax.value}
          </TableCell>
        </TableRow>
      )
    );
    const serviceChargeHtml = taxAndDis && taxAndDis.service_charge.map((tax) =>
      (
        <TableRow key={tax.id}>
          <TableCell component="th" scope="row">
            {tax.waive ? <strike>{tax.name}</strike> : tax.name}
          </TableCell>
          <TableCell numeric>
            ₹ {tax.waive ? <strike>{tax.calPrice || tax.value}</strike> : tax.calPrice || tax.value}
          </TableCell>
        </TableRow>
      )
    );
    return(
      <div className={classes.body}>
        {cartTotal === 0 ? <div className={classes.emptyCart}>
          <div className={classes.emptyImage}>
            <img src="/img/carrot.png" alt="carrot" />
          </div>
          <Typography gutterBottom variant="subheading" component="p">
            Sorry, you dont have anything in your cart. Have a carrot and choose your food!
          </Typography>
        </div> :
        <div>
          <Typography className={classes.pageTitle} gutterBottom variant="headline" component="h1">
            Cart Summary:
          </Typography>
          <div className={classes.content}>
          <Paper className={classes.root} elevation={0}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell} >Item</TableCell>
                  <TableCell className={classes.cell} numeric>Qty</TableCell>
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
                      <TableCell className={classes.cell} numeric>x {row.quantity}</TableCell>
                      <TableCell className={classes.cell} numeric>{row.price}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
            <Table className={classes.table}>
              <TableBody>
                  {taxesHtml}
                  {serviceChargeHtml}
              </TableBody>
            </Table>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    TOTAL
                  </TableCell>
                      <TableCell numeric>₹ {taxAndDis && taxAndDis.finalPayable}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          </div>
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
        </div> }
      </div>
    );
  }
}

CartComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  taxesAndDiscounts: PropTypes.shape().isRequired,
};
export default withStyles(styles)(CartComponent);
