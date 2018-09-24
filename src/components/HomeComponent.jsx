import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Zoom from '@material-ui/core/Zoom';

const styles = {
  body: {
    backgroundColor: '#F5F5F5',
    minHeight: '100vh',
    paddingTop: '25%',
    paddingBottom: '25%',
  },
  card: {
    maxWidth: '100%',
    margin: '10px',
  },
  media: {
    height: 140,
  },
  avatar: {
    margin: 8,
  },
};

class HomeComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }
  handleChange = (event, value) => {
    this.setState({ value });
  }
  componentWillMount() {
    this.props.testAction();
  }
  render() {
    const { classes } = this.props;
    // console.log(this.props);
    return (
      <div className={classes.root}>
        <div className={classes.body}>
          <Zoom in={this.state.show} >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="img/sample.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  Lizard
                </Typography>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
          </Zoom>
          <Zoom in={this.state.show} >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="img/sample.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  Lizard
                </Typography>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
          </Zoom>
          <Zoom in={this.state.show} >
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="img/sample.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  Lizard
                </Typography>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
          </Zoom>
        </div>
      </div>
    );
  }
}

HomeComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  testAction: PropTypes.func.isRequired,
  testInfo: PropTypes.shape().isRequired,
};

export default withStyles(styles)(HomeComponent);
