"use strict"
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { auth } from '../../utils/auth'
import axios from 'axios'
import { NewPostModal } from './'
import { show } from '../../actions/modalActions'

class Header extends React.Component{

  constructor(){
    super()
    this.state = {
      user: null,
      showModal: false
    }

    this.onLogout  = this.onLogout.bind(this) 
    this.renderNav = this.renderNav.bind(this)   
  }

  componentWillReceiveProps(props){
    this.setState({user: props.user})
  }

  renderNav(){
    let user = this.state.user
    let nav  = user === null ? '' : (
      <ul id="links">
        <li><a href="/home">Hi, {user.name}</a></li>
        <li><span onClick={this.props.show}>New Post</span></li>
        <li><span onClick={this.onLogout}><i className="fas fa-sign-out-alt"/></span></li>
      </ul>
    )

    return nav
  }

  onLogout(){
    if(!confirm('確定要登出嗎？'))
        return 
    axios.get('logout')
      .then((res) => {
        // console.log(res)
        delete sessionStorage._id
        window.location = '/start'
      })
      .catch((err) => {
        // console.log(err.response)
      })
  }

  render(){
    console.log('Header', this.props)
    return(
      <nav id="nav-container">
        <div id="nav-top">
          <div id="logo">
            <i className="fab fa-twitter"/>
            <span>Twitter-like</span>
          </div>
          <div id="menu-btn">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
        {this.renderNav()}
        <NewPostModal visibility={false}/>
      </nav>
    )
    

  }

}

function mapStateToProps(state){
  console.log('mapStateToProps Header')
  return {
    visibility: state.modal.visibility
  }
}

function mapDispatchToProps(dispatch){
  console.log('mapDispatchToProps Header')
  
  return bindActionCreators({
    show: show
  }, dispatch)
}


export default connect(null, mapDispatchToProps)(Header)
