import React from 'react';
import { connect } from 'react-redux';
import CartComponent from '../components/CartComponent';
import { testAction } from '../actions/HomeActions';
import BottomNav from '../components/BottomNav';


const CartContainer = props => (
	<div>
	<CartComponent {...props} />
	<BottomNav {...props} />
	</div>
);


const mapStateToProps = state => ({
  testInfo: state.home.testInfo,
});



export default connect(mapStateToProps, {
  testAction,
})(CartContainer);
