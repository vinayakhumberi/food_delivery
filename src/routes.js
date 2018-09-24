import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import CartContainer from './containers/CartContainer';

export default () => {
 return (
   <BrowserRouter>
   	<div>
   <Switch>
   <Route exact path='/' component={HomeContainer}/>
   <Route path='/home' component={HomeContainer}/>
   <Route path='/cart' component={CartContainer}/>
   <Route path='/account' component={HomeContainer}/>
   <Route path='/exclusive' component={HomeContainer}/>
   </Switch>
	</div>
   </BrowserRouter>
 )
}