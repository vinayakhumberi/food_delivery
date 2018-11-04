import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../actions/OrderActions';
import OrderComponent from '../components/OrderComponent';


const OrdersContainer = props => (
  <div>
    <OrderComponent {...props} />
  </div>
);


const mapStateToProps = state => ({
  orderItems: state.orders.orderItems
});



export default connect(mapStateToProps, {
  fetchOrders
})(OrdersContainer);
