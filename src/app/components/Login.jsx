import React from 'react'
import {connect} from 'react-redux'

const LoginComponent = () => (
  <div>
    Log In Here!
  </div>
)

const mapStateToProps = state => state

export const ConnectedLogin = connect(mapStateToProps)(LoginComponent)