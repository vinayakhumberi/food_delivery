import React from 'react';
import PropTypes from 'prop-types';
import { find, forEach, remove, countBy } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Zoom from '@material-ui/core/Zoom';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import grey from '@material-ui/core/colors/grey';

const styles = {
  body: {
    padding: '5rem 0.5rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '1rem',
  },
  pageTitle: {
    fontSize: '1.05rem',
    color: '#222222',
    padding: '0 0.5rem',
  },
  card: {
    maxWidth: '100%',
    margin: '10px',
    border: '1px solid #ddd',
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
  fake: {
    backgroundColor: grey[200],
    height: '1rem',
    margin: '0.25rem',
    // Selects every two elements among any group of siblings.
    // '&:nth-child(2n)': {
    //   marginRight: '3rem',
    // },
  },
  fakeImage: {
    backgroundColor: grey[200],
    height: '10rem',
  },
  fakeCounters: {
    fill: 'currentColor',
    width: '1.5rem',
    height: '1.5rem',
    display: 'inline-block',
    fontSize: '24px',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    userSelect: 'none',
    flexShrink: '0',
    borderRadius: '50%',
    background: grey[200],
    margin: '1rem',
  }
};

class HomeComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
    this.handleCartChanges = this.handleCartChanges.bind(this);
  }
  componentWillMount() {
    this.props.fetchMenu();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleCartChanges(event) {
    const available = parseInt(event.currentTarget.getAttribute('data-available'), 10);
    if (available) {
      const type = event.currentTarget.getAttribute('data-type');
      const foodId = event.currentTarget.getAttribute('data-id');
      const foodName = event.currentTarget.getAttribute('data-name');
      const itemPrice = parseInt(event.currentTarget.getAttribute('data-price'), 10);
      const cart = this.props.cart.slice(0);
      const cartItem = find(cart, ['foodId', foodId]);
      let handBag = this.props.handBag;
      if (type === 'add') {
        if (cartItem) {
          forEach(cart, function(item) {
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
        handBag.push(foodId);
      } else {
        if (cartItem) {
          forEach(cart, function(item) {
            if (item.foodId === foodId) {
              item.quantity = item.quantity - 1;
              item.price = item.quantity * itemPrice;
            }
          });
        }
        remove(cart, {
          quantity: 0,
        });
        const index = this.props.handBag.indexOf(foodId);
        if (index > -1) {
          handBag.splice(index, 1);
        }
      }
      this.props.updateHandBag(handBag);
      this.props.updateCart(cart);
    }
  }
  render() {
    const { classes } = this.props;
    const handBag = countBy(this.props.handBag);
    const fake = <div className={classes.fake} />;
    const fakeImage = <div className={classes.fakeImage} />;
    const fakeCounters = <div className={classes.fakeCounters} />;
    const buildMenuCards = (menu) => {
      const crudeHtml = menu.map((menuItem) => {
        return (
          <Card key={menuItem.id} className={`${classes.card} ${menuItem.available ? '' : classes.disable}`} elevation={0}>
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
              <Typography color="primary" component="div">
                ₹ {menuItem.price}
                <strike>
                  <Typography variant="caption" gutterBottom align="left">
                    ₹ {menuItem.strikePrice}
                  </Typography>
                </strike>
              </Typography>
              <div className={classes.btnHolder}>
                <IconButton
                  color="primary"
                  className={classes.button}
                  aria-label="Add to shopping cart"
                  onClick={this.handleCartChanges}
                  data-id={menuItem.id}
                  data-price={menuItem.price}
                  data-name={menuItem.localName}
                  data-available={menuItem.available}
                  data-type="remove"
                >
                  <RemoveIcon />
                </IconButton>
                <div className={classes.counter}>
                  {handBag[menuItem.id] || 0}
                </div>
                <IconButton
                  color="primary"
                  className={classes.button}
                  aria-label="Add to shopping cart"
                  onClick={this.handleCartChanges}
                  data-id={menuItem.id}
                  data-price={menuItem.price}
                  data-name={menuItem.localName}
                  data-available={menuItem.available}
                  data-type="add"
                >
                  <AddIcon />
                </IconButton>
              </div>
            </CardActions>
          </Card>
        );
      });
      return crudeHtml;
    }
    const buildMenuSkeletalCards = () => {
      const crudeHtml = [0, 1].map((item) => {
        return (
          <Zoom in={this.state.show} key={item}>
            <Card className={`${classes.card}`} elevation={0}>
              {fakeImage}
              <CardContent>
                <Typography className={classes.cardTitle} gutterBottom variant="headline" component="h2">
                  {fake}
                </Typography>
                <Typography variant="caption" gutterBottom align="left">
                  {fake}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardFooter}>
                <Typography color="primary" component="div">
                  {fake}
                  <strike>
                    <Typography variant="caption" gutterBottom align="left">
                      {fake}
                    </Typography>
                  </strike>
                </Typography>
                <div className={classes.btnHolder}>
                  {fakeCounters}
                  {fake}
                  {fakeCounters}
                </div>
              </CardActions>
            </Card>
          </Zoom>
        );
      });
      return crudeHtml;
    }
    const cards = this.props.menuItems.status === 2 ? buildMenuCards(this.props.menuItems.data) : buildMenuSkeletalCards();
    return (
      <div className={classes.root}>
        <div className={classes.body}>
          <Typography className={classes.pageTitle} gutterBottom variant="headline" component="h1">
            Choose from our amzing text to impress customer
          </Typography>
          <div className={classes.content}>
            {cards}
          </div>
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
  updateHandBag: PropTypes.func.isRequired,
  handBag: PropTypes.array.isRequired,
};

export default withStyles(styles)(HomeComponent);
