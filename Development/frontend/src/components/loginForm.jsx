import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'


class LoginForm extends Component {
    state = { 
        email:'',
        password:''
     }

     handleOnChange = (e)=>{
        //  console.log(e.target.name)
        const newState = {...this.state}
        const changed = e.target.name;
        const value = e.target.value;
        
        newState[changed] = value;
        this.setState(newState);
     }

     handleSubmit = async (e)=>{
         e.preventDefault();
         let { email, password } = this.state;

         try {
            const result = await axios({
                method:'POST',
                url:'/api/user/login',
                data:{
                    email,password
                }
            })
            // console.log(result)
            
            if(result.data.status === 'success'){
                email='';
                password='';
                const user = result.data.user.name;
                const jwt = result.data.token;
                Cookies.set('user',user,{expires:90});
                Cookies.set('jwt',jwt,{expires:90});
                this.setState({email,password})
                setTimeout(()=>{
                    this.props.history.push('/');
                },500)
            }

        } catch (error) {
            console.log(error)
        }

     }

    render() { 
        const { email, password } = this.state;
        return (
            <React.Fragment>
            <Link to='/' className="login__back"> <FontAwesomeIcon icon={faArrowCircleLeft} /></Link>
            <div className='login'>
                    <h2 className="heading login__heading">Login</h2>
                    <form onSubmit={(e)=>this.handleSubmit(e)} className="form">
                        <div className="form__group">
                            <input type="email" className="form__input" placeholder="E-mail*" id="email" name="email" onChange={(e)=>this.handleOnChange(e)} value={email} required/ >
                            <label htmlFor="email" className="form__label">E-Mail</label>
                        </div>
                        <div className="form__group">
                            <input type="password" className="form__input" placeholder="Password*" id="password" name="password" value={password} onChange={(e)=>this.handleOnChange(e)} required/>
                            <label htmlFor="password" className="form__label" >Password</label>
                        </div>
                        <button className="form__submit" type="submit">Login</button>
                    </form>
                    <p className="login__alternate">or <Link to='/signup' className="login__links">Signup</Link> ?</p>
            </div>
            </React.Fragment>
         );
    }
}
 
export default LoginForm;