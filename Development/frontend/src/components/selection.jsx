import React, { Component } from 'react';

class Selection extends Component {
    categories = ['movies','TV shows','persons']
    render() { 
        return ( 
            <div className="selection">
                {this.categories.map(category => (
                    <button  key={category} onClick={() => this.props.onCategoryChange(category)} className={category === this.props.active ? 'selection__btn selection__btn--active' : 'selection__btn'}>{category}</button>
                ))}
            </div>
         );
    }
}
 
export default Selection;