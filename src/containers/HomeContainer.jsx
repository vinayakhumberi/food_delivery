import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import HomeComponent from '../components/HomeComponent';
import { fetchMenu } from '../actions/HomeActions';
import { updateCart } from '../actions/CartActions';
import BottomNav from '../components/BottomNav';
import NavBar from '../components/NavBar';


const HomeContainer = props => (
	<div>
		<NavBar {...props} />
		<HomeComponent {...props} />
		<BottomNav {...props} />
	</div>
);


const mapStateToProps = state => ({
	menuItems: state.home.menuItems,
	cart: state.cart.cart,
});



export default connect(mapStateToProps, {
	fetchMenu,
	updateCart,
})(HomeContainer);
