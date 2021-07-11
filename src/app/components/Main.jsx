import React, { Component } from 'react'
import {Provider} from 'react-redux'
import { store } from '../store'
import { ConnectedDashboard } from './Dashboard'
import { ConnectedLogin } from './Login'
import {Router, Route} from 'react-router-dom'
import { history } from '../store/history'
import { ConnectedNavigation } from './Navigation'
import { ConnectTaskDetail } from './TaskDetail'
import { Redirect } from 'react-router'

const RouteGuard = Component => ({match}) => {
  console.info('route guard', match);
  if(!store.getState().session.authenticated) {
    // if NOT authenticated, reroute
    return (
    <Redirect to="/"/>   
    )

  }
  // if it is then return 
  return <Component match={match}/>
}

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>      
        {/* <ConnectedDashboard/> */}
        <ConnectedNavigation/>
        {/* in React router if render is used a function must be provided but if use component only the component needs to be provided*/}
        <Route exact path="/" component={ConnectedLogin}/>
        <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)}/>
        <Route exact path="/task/:id" render={RouteGuard(ConnectTaskDetail)}/>
      </div>
    </Provider>
  </Router>
)