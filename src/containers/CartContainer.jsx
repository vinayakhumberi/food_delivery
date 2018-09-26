import React from 'react';
import { connect } from 'react-redux';
import CartComponent from '../components/CartComponent';
import { fetchMenu } from '../actions/HomeActions';
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
});



export default connect(mapStateToProps, {
  fetchMenu,
})(CartContainer);
