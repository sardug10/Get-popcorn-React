import React from 'react';
import _ from 'lodash';
// import { Link } from 'react-router-dom';

const Pagination = (props) => {
    const {resultCount, pageSize, onPageChange, currentPage} = props
    // these props should have their specific type, which we should check with propTypes
    // console.log(currentPage)
    const noOfPages = resultCount / pageSize;

    if(noOfPages > 1){
        const pages = _.range(1,noOfPages + 1)
    
        return ( 
            <nav className='pagination'>
                <ul className="page">
                    {pages.map(page=>(
                        <li key={page} className={page === currentPage ? 'page__item page__item--active' : 'page__item'}><button className={page === currentPage ? 'page-link-active' : 'page-link'}  onClick = {()=> onPageChange(page)}>{page}</button></li>
                    ))}                
                </ul>
            </nav>
        );
    } else{
        return null
    }
}
 
export default Pagination;