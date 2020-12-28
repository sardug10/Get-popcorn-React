import React from 'react';

const Alert = ({type, message}) => {
    return ( 
        <div className={`alert alert--${type}`}>
            <h3 className="alert__message">{message}</h3>
        </div>
     );
}
 
export default Alert;