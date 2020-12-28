import React from 'react';
const Heading = (props) => {
    return ( 
        <h2 className={ props.purpose ? 'heading no-likes' : 'heading' }>
            {props.value}
        </h2>
     );
}
 
export default Heading;