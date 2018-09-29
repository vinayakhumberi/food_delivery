import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Zoom from '@material-ui/core/Zoom';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  body: {
    backgroundColor: '#F5F5F5',
    minHeight: '100vh',
    padding: '25% 0.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1rem',
  },
  card: {
    maxWidth: '100%',
    margin: '10px',
  },
  cardTitle: {
    fontSize: '1.25rem',
  },
  cardActionArea: {
    width: '100%',
  },
  media: {
    height: 140,
  },
  avatar: {
    margin: 8,
  },
  button: {
    margin: '1rem',
    padding: 0,
    border: '1px solid #ddd',
  },
  counter: {
    margin: '1rem 0',
    padding: 0,
    lineHeight: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardFooter: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: '0 1rem',
  },
  tag: {
    position: 'absolute',
    top: '0.25rem',
    left: '0',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    fontSize: '0.85rem',
  },
  green: {
    backgroundColor: '#8bc34a',
  },
  black: {
    backgroundColor: '#222222',
  },
  disable: {
    opacity: 0.6,
    after: {
      content: 'sas',
    }
  },
  btnHolder: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    marginRight: 0,
  },
};

class HomeComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
      handBag: [],
    };
    this.handleCartChanges = this.handleCartChanges.bind(this);
  }
  componentWillMount() {
    this.props.fetchMenu();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.cart);
  }
  handleCartChanges(event) {
    const foodId = event.currentTarget.getAttribute('data-id');
    const foodName = event.currentTarget.getAttribute('data-name');
    const itemPrice = parseInt(event.currentTarget.getAttribute('data-price'), 10);
    const cart = this.props.cart.slice(0);
    const cartItem = _.find(cart, ['foodId', foodId]);
    if (cartItem) {
      _.forEach(cart, function(item) {
        if (item.foodId === foodId) {
          item.quantity = item.quantity + 1;
          item.price = item.quantity * itemPrice;
        }
      });
    } else {
      cart.push({
        foodId,
        foodName,
        quantity: 1,
        price: itemPrice,
      });
    }
    this.props.updateCart(cart);
  }
  render() {
    const { classes } = this.props;
    // console.log(this.props);
    const buildMenuCards = (menu) => {
      const crudeHtml = menu.map((menuItem) => {
        return (
          <Zoom in={this.state.show} key={menuItem.id}>
          <Card className={`${classes.card} ${menuItem.available ? '' : classes.disable}`}>
            {Object.keys(menuItem.tags).length && <div className={
                `${classes.tag}   ${menuItem.tags.promo === 'Exclusive' && classes.green} ${menuItem.tags.promo === 'Select' && classes.black}`
              }
            >
              {menuItem.tags.promo}
            </div>}
            <CardMedia
              className={classes.media}
              image={menuItem.img}
              title={menuItem.img}
            />
            <CardContent>
              <Typography className={classes.cardTitle} gutterBottom variant="headline" component="h2">
                {menuItem.localName}
              </Typography>
              <Typography variant="caption" gutterBottom align="left">
                {menuItem.category}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardFooter}>
              <Typography color="primary" component="p">
                ₹ {menuItem.price}
                <strike>
                  <Typography variant="caption" gutterBottom align="left">
                    ₹ {menuItem.strikePrice}
                  </Typography>
                </strike>
              </Typography>
              <div className={classes.btnHolder}>
                <IconButton color="primary" className={classes.button} aria-label="Add to shopping cart">
                  <RemoveIcon />
                </IconButton>
                <div className={classes.counter}>
                  0
                </div>
                <IconButton
                  color="primary"
                  className={classes.button}
                  aria-label="Add to shopping cart"
                  onClick={this.handleCartChanges}
                  data-id={menuItem.id}
                  data-price={menuItem.price}
                  data-name={menuItem.localName}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </CardActions>
          </Card>
        </Zoom>
        );
      });
      return crudeHtml;
    }
    const cards = this.props.menuItems.status === 2 ? buildMenuCards(this.props.menuItems.data) : null;
    return (
      <div className={classes.root}>
        <div className={classes.body}>
          {cards}
        </div>
      </div>
    );
  }
}

HomeComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchMenu: PropTypes.func.isRequired,
  menuItems: PropTypes.shape().isRequired,
  updateCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

export default withStyles(styles)(HomeComponent);
