import React from 'react';
import Loader from 'react-loader-spinner';

const LoadingSpinner = (props) => {
    return ( 
        <Loader
        className='spinner'
        visible={props.visible}
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100} 
      />
     );
}
 
export default LoadingSpinner;