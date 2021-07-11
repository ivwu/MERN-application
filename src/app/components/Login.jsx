import React from 'react'
import {connect} from 'react-redux'

import * as mutations from '../store/mutations'

const LoginComponent = ({authenticateUser, authenticated}) => (
  <div className="card p-3 col-6">
    <h2>Please Log In</h2>
    <form onSubmit={authenticateUser}>
      <input type="text" placeholder="username" name="username" defaultValue="Dev" className="form-control mt-2"/>
      <input type="password" placeholder="password" name="password" defaultValue="TUPLES" className="form-control mt-2"/>
      {authenticated === mutations.NOT_AUTHENTICATED ? <p>Login Incorrect</p> : <></>}
      <button type="submit" className="form-control mt-2 btn btn-info">Log In</button>
    </form>
  </div>
)

const mapStateToProps = ({session}) => ({
  authenticated: session.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault()
    let username = e.target['username'].value
    let password = e.target['password'].value
    dispatch(mutations.requestAuthenticateUser(username, password))
  }
})

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)