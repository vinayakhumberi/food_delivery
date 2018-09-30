import React from 'react';
import { connect } from 'react-redux';
import AccountComponent from '../components/AccountComponent';
import { fetchMenu } from '../actions/HomeActions';
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
});



export default connect(mapStateToProps, {
  fetchMenu,
})(AccountContainer);
