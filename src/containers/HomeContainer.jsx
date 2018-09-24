import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import HomeComponent from '../components/HomeComponent';
import { testAction } from '../actions/HomeActions';
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
  testInfo: state.home.testInfo,
});



export default connect(mapStateToProps, {
  testAction,
})(HomeContainer);
