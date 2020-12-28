import React, {Component} from 'react';

class Form extends Component {
    // state = {  }
    
    renderInput(name, label, type, value, placeholder){
        return <input name={name} type={type} className='form__input' placeholder={placeholder} value={value} required={true}></input>
    }

    renderSubmit(label){
        return <button type='submit' className='form__btn'>{label}</button>
    }
}
 
export default Form;