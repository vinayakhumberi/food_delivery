import React from 'react';
import { connect } from 'react-redux';
import AccountComponent from '../components/AccountComponent';
import { fetchMenu } from '../actions/HomeActions';
import { fetchTaxesAndDiscounts } from '../actions/CartActions';
import { createNewUser, checkUserPresent } from '../actions/AccountActions';
import BottomNav from '../components/BottomNav';
import NavBar from '../components/NavBar';


const AccountContainer = props => (
	<div>
		<NavBar {...props} />
		<AccountComponent {...props} />
		<BottomNav {...props} />
	</div>
);


const mapStateToProps = state => ({
	menuItems: state.home.menuItems,
	cart: state.cart.cart,
	taxesAndDiscounts: state.cart.taxesAndDiscounts,
	isUserPresent: state.account.isUserPresent,
});



export default connect(mapStateToProps, {
  fetchMenu,
	fetchTaxesAndDiscounts,
	createNewUser,
	checkUserPresent,
})(AccountContainer);
