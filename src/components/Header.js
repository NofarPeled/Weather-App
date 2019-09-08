//REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';

//ACTION
import { toggleIsFahrenheit } from '../store/actions/WeatherAction'

class Header extends Component {

    toggleIsFahrenheit = async () => {
        const { dispatch } = this.props
        dispatch(toggleIsFahrenheit())
    } 

    render () {
        const { isFahrenheit } = this.props
        return (
            <section className = "header-cmp flex">
                <div className = "right-div flex">
                    <img src = {require('../assets/logo.png')}  className = "logo-img" alt=""/>
                    <h1 className = "header-title">WeatherNow</h1>
                </div>
                <nav className = "header-navbar flex">
                    <NavLink exact to="/" className = "nav-link" activeClassName="active">Home</NavLink>
                    <NavLink to="/favorite-locations" activeClassName="active" className = "nav-link">Favorites</NavLink>
                    <button className = "temp-switch-btn" onClick = {this.toggleIsFahrenheit}>{isFahrenheit ? 'C°' : 'F°'}</button>
                </nav>
            </section>
        )
    }
}

const mapStateToProps = ({ WeatherReducer }) => {
    const { isFahrenheit } = WeatherReducer;
    return {
      isFahrenheit,
    }
}
  
export default connect(mapStateToProps)(Header)