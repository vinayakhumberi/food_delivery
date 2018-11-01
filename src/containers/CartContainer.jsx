import React from 'react';
import { connect } from 'react-redux';
import CartComponent from '../components/CartComponent';
import { fetchMenu } from '../actions/HomeActions';
import { fetchTaxesAndDiscounts } from '../actions/CartActions';
import BottomNav from '../components/BottomNav';
import NavBar from '../components/NavBar';


const CartContainer = props => (
	<div>
		<NavBar {...props} />
		<CartComponent {...props} />
		<BottomNav {...props} />
	</div>
);


const mapStateToProps = state => ({
	menuItems: state.home.menuItems,
	cart: state.cart.cart,
	taxesAndDiscounts: state.cart.taxesAndDiscounts,
	userInfo: state.account.userInfo
});



export default connect(mapStateToProps, {
  fetchMenu,
	fetchTaxesAndDiscounts,
})(CartContainer);
