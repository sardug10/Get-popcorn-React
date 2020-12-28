import React from 'react';
import errorImg from '../images/error.png'

const Error = () => {
    return ( 
        <div className="error">
            <img src={errorImg} alt="error" className="error__img"/>
                <h3 className="error__text">Not found!! Try searching for something else.</h3>
        </div>
     );
}
 
export default Error;