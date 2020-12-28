import React, {Component} from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import logo from '../images/logo.png';

class Navbar extends Component {
    // jwt = Cookies.get('jwt')
    // jwt = document.cookie;
    wholeUser = Cookies.get('user')
    user = this.wholeUser ? this.wholeUser[0] : undefined
    isLoggedIn = this.user ? true : false
    
    state = { 
        isLoggedIn:this.isLoggedIn,
        user:this.user
     }

    render() {
        const { isLoggedIn, user } = this.state;
        let placeholder = `search for ${this.props.active}` 
        return ( 
            <nav className="navbar">
                <img src={logo} alt="" className="navbar__logo"/>
                <form onSubmit={(e)=>this.props.onFormSubmit(e)} className="navbar__form">
                    <input type="text" className="navbar__search" placeholder={placeholder} value={this.props.inputValue} onChange={(e)=>this.props.onInputChange(e)} required={true}/>
                    <button className="navbar__btn"><FontAwesomeIcon icon={faSearch} /></button>
                </form>
                { isLoggedIn ? 
                <div className="navbar__linksDiv">
                    <button onClick={(e)=> this.props.onLogout(e)} className="navbar__links logout-btn">Logout</button>
                    <Link to='/me' className="navbar__links navbar__links--me">{user}</Link>
                </div> :
                <div className="navbar__linksDiv">
                    <Link to='/login' className="navbar__links">Login</Link>
                    <Link to='/signup' className="navbar__links">Signup</Link>
                </div>
            }                            
            </nav>
         );
    }
}
 
export default Navbar;