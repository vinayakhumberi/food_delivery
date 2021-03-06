import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import LoaderComponent from './components/LoaderComponent';
import Loadable from 'react-loadable';

const Home = Loadable({
  loader: () =>
    import ('./containers/HomeContainer'),
  loading: LoaderComponent
});

const Cart = Loadable({
  loader: () =>
    import ('./containers/CartContainer'),
  loading: LoaderComponent
});

const Account = Loadable({
  loader: () =>
    import ('./containers/AccountContainer'),
  loading: LoaderComponent
});

const Order = Loadable({
  loader: () =>
    import('./containers/OrdersContainer'),
  loading: LoaderComponent
});


export default () => {
 return (
   <BrowserRouter>
   	<div>
     <Switch>
       <Route exact path='/' component={Home}/>
       <Route path='/home' component={Home}/>
       <Route path='/cart' component={Cart}/>
       <Route path='/account' component={Account}/>
       <Route path='/exclusive' component={Home}/>
       <Route path='/order-list' component={Order}/>
       </Switch>
  	</div>
   </BrowserRouter>
 )
}
