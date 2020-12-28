import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import Selection from './selection';
import Card from './Card';
import Heading from './heading';
import LoadingSpinner from './spinner';
import Error from './error';
import Pagination from './pagination';
import Trending from '../models/trendingService';
import { paginate } from '../utils/pagination';
import Search from './../models/searchService';



class Main extends Component {
    state = { 
        active:'movies',
        results:[],
        loading:false,
        card:true,
        error:false,
        pageSize: 10,
        currentPage: 1,
        searchQuery:'',
        heading:'trending today',
     }
    //  categories = ['movies','tvshows','persons']

     getQuery = (category)=>{
        if(category === 'movies'){
            return 'movie'
        } else if(category === 'TV shows'){
            return 'tv'
        } else{
            return 'person'
        }
     }


     handleChangeCategory = async (category) =>{
        
        let query = this.getQuery(category)

        // console.log(query)
        let trending = new Trending(query);
        this.setState({loading:true, card:false, heading:'trending today',currentPage:1, error:false});
        try {
            let results = await trending.getTrending();
            // this.setState({loading:true})
            this.setState({active:category,results})
            
            // console.log(results)
        } catch (error) {
            console.log(error)
        } finally{
            this.setState({loading:false, card:true})
        }
     }

     handlePageChange = page =>{
        // console.log(page);
        this.setState({currentPage:page})
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
      }

     async componentDidMount(){
        let trending = new Trending('movie');
        this.setState({loading:true, card:false});
        try {
            let results = await trending.getTrending();
            
            this.setState({results});
            // console.log(results)
        } catch (error) {
            console.log(error.status)
        } finally{
            this.setState({loading:false, card:true});
        }
     }

     handleOnChangeInputField = (e) =>{
        let searchQuery = e.target.value;
        this.setState({searchQuery})
     }
    

    handleFormSubmit = async (e) => {
        e.preventDefault()
        const query = this.state.searchQuery
        const category = this.getQuery(this.state.active)
        // console.log(`submitted ${searchInput} ${query}`);
        let searched = new Search(query,category);
        this.setState({loading:true, card:false, searchQuery:'', heading:query, error:false});
        try {
            let results = await searched.getResults();
            results.length === 0 ? this.setState({results, error:true}) : this.setState({results});
            // console.log(results)
        } catch (error) {
            console.log(error)
        } finally{
            this.setState({loading:false, card:true});
        }
        
     }

     handleOnLogout = async (e)=>{
        //  e.preventDefault();
        // console.log('Logout button is clicked');
         
        Cookies.remove('user');
                // window.location.assign('/');
        this.props.history.push('/');
     }


    render() { 
        const { active, results, loading, pageSize, currentPage,card, searchQuery, heading, error} = this.state
        let newResults = results;
        if(results.length > pageSize) newResults = paginate(results,pageSize,currentPage)
        
        return ( 
        <div className="main">
            <Navbar active={active} onFormSubmit = {this.handleFormSubmit} inputValue={searchQuery} onInputChange={this.handleOnChangeInputField} onLogout={this.handleOnLogout} />
            <Heading value={heading}/>
            <Selection onCategoryChange={this.handleChangeCategory} active={active}/>
            {loading ? <LoadingSpinner visible={true}/> : <LoadingSpinner visible={false}/>}
            {card && results.length > 0 ? <Card active={active} results={newResults} />: null}
            {error ? <Error/> : null}
            {card && results.length > pageSize? <Pagination resultCount={results.length} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage}/>: null}
        </div>
         );
    } 
}
 
export default Main;