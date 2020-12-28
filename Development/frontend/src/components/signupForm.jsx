import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';


class SignupForm extends Component {
    state = {
        name:'', 
        email:'',
        password:'',
        confirmedPassword:'',
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
        let { name, email, password, confirmedPassword } = this.state
        // console.log(name, email, password, confirmedPassword);

        if(password.length < 8){
            alert('Password must have 8 characters');
            return
        }
        if(password !== confirmedPassword){
            alert('Password and Confirm Password does not match, please try again!!');
            return
        }

        try {
            const result = await axios({
                method:'POST',
                url:'/api/user/sign-up',
                data:{
                    name,email,password,confirmedPassword
                }
            })
            // console.log(result)
            
            if(result.data.status === 'success'){
                name='';
                email='';
                password='';
                confirmedPassword='';
                const user = result.data.user.name[0];
                const jwt = result.data.token;
                Cookies.set('user',user,{expires:90});
                Cookies.set('jwt',jwt,{expires:90});
                this.setState({name,email,password,confirmedPassword})
                setTimeout(()=>{
                    this.props.history.push('/');
                },500)
            }

        } catch (error) {
            console.log(error)
        }        

     }

    render() { 
        const { name, email, password, confirmedPassword} = this.state;
        return (
            <React.Fragment>
            {/* {alert ? <Alert type={'success'} message={'Signed-In-in successfully!!'}/> : null }   */}
            <Link to='/' className="login__back"> <FontAwesomeIcon icon={faArrowCircleLeft} /></Link>
            <div className='login'>
                    <h2 className="heading login__heading">SignUp</h2>
                    <form onSubmit={(e) => this.handleSubmit(e)} className="form">
                        <div className="form__group">
                            <input type="text" className="form__input" placeholder="Name*" id="name" name="name" onChange={(e)=>this.handleOnChange(e)} value={name} required/ >
                            <label htmlFor="name" className="form__label">Name</label>
                        </div>
                        <div className="form__group">
                            <input type="email" className="form__input" placeholder="E-mail*" id="email" name="email" onChange={(e)=>this.handleOnChange(e)} value={email} required/ >
                            <label htmlFor="email" className="form__label">E-Mail</label>
                        </div>
                        <div className="form__group">
                            <input type="password" className="form__input" placeholder="Password*" id="password" name="password" value={password} onChange={(e)=>this.handleOnChange(e)} required/>
                            <label htmlFor="password" className="form__label" >Password</label>
                        </div>
                        <div className="form__group">
                            <input type="password" className="form__input" placeholder="confirmedPassword*" id="confirmedPassword" name="confirmedPassword" value={confirmedPassword} onChange={(e)=>this.handleOnChange(e)} required/>
                            <label htmlFor="confirmedPassword" className="form__label" >confirmedPassword</label>
                        </div>
                        <button className="form__submit" type="submit">Signup</button>
                    </form>
                    <p className="login__alternate">or <Link to='/login' className="login__links">Login</Link> ?</p>
            </div>
            </React.Fragment>
         );
    }
}
 
export default SignupForm;