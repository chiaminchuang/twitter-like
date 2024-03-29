'use strict'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import auth from '../../utils/auth'
import axios from 'axios'
import { NewTweetModal } from './'
import { openTweetModal } from '../../actions/modalActions'
import { logout } from '../../actions/userActions'
import { URL_HOME } from '../../constants/url'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      showModal: false
    }
  }

  // componentWillReceiveProps(props){
  //   console.log('componentWillReceiveProps Header')
  //   this.setState({user: props.user})
  // }

  componentWillMount() {
    // console.log('componentWillMount Header')
  }

  componentDidMount() {
    // console.log('componentDidMount Header')
  }

  renderNav = () => {
    const self = auth.getUser()
    const nav = self ? (
      <ul id="links">
        <li>
          <a href={`${URL_HOME}/${self._id}`}>Hi, {self.name}</a>
        </li>
        <li>
          <span onClick={this.props.openTweetModal}>
            <i className="fas fa-user-edit" />
          </span>
        </li>
        <li>
          <span onClick={this.onLogout}>
            <i className="fas fa-sign-out-alt" />
          </span>
        </li>
      </ul>
    ) : (
      ''
    )

    return nav
  }

  onLogout = () => {
    if (!confirm('確定要登出嗎？')) return

    this.props.logout()
  }

  render() {
    console.log('Header render')
    return (
      <nav id="nav-container">
        <div id="nav-top">
          <div id="logo">
            <i className="fab fa-twitter" />
            <span>Twitter-like</span>
          </div>
          <div id="menu-btn">
            <div className="bar1" />
            <div className="bar2" />
            <div className="bar3" />
          </div>
        </div>
        {this.renderNav()}
        <NewTweetModal visibility={false} />
      </nav>
    )
  }
}

function mapStateToProps(state) {
  // console.log('mapStateToProps Header')
  return {
    // self: state.user.user,
    // visibility: state.modal.tweetModalVisibility
  }
}

function mapDispatchToProps(dispatch) {
  // console.log('mapDispatchToProps Header')

  return bindActionCreators(
    {
      openTweetModal: openTweetModal,
      logout: logout
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
