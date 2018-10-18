import React from 'react';
import { connect } from 'react-redux';
import OrderComponent from '../components/OrderComponent';


const OrdersContainer = props => (
  <div>
    <OrderComponent {...props} />
  </div>
);


const mapStateToProps = state => ({
  menuItems: state.home.menuItems,
  cart: state.cart.cart,
  taxesAndDiscounts: state.cart.taxesAndDiscounts,
});



export default connect(mapStateToProps, {})(OrdersContainer);
