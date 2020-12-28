import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Selection from './selection';
import Card from './Card';
import Heading from './heading';
import LoadingSpinner from './spinner';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

class Me extends Component {
    user = Cookies.get('user');
    state = { 
        active:'movies',
        loading:false,
        results:[],
        card:true,
        items:true
     }

     getQuery = (category)=>{
        if(category === 'movies'){
            return 'movie'
        } else if(category === 'TV shows'){
            return 'tv'
        } else{
            return 'person'
        }
     }

     simplifyItems = (items) =>{
        items.forEach((item)=>{
            for(var i in item){
                // console.log(i)
                if(i === '_id' || i === 'user' || i === 'category' || i === '__v'){
                    delete item[i]
                }
            }
        })
        let newItems = [];
        items.forEach((item)=>{
            newItems.push(item.item)
        })
        // console.log(newItems)

        this.setState({results:newItems, loading:false, card:true, items:true});
     }

     handleChangeCategory = async (category) =>{
        
        let query = this.getQuery(category)

        this.setState({active:category,loading:true,card:false, items:true});

        try {
            const result = await axios({
                method:'POST',
                url:'/api/like/get-liked',
                data:{
                    user:this.user,
                    category: query
                }
            })
            // console.log(result)
            let items = result.data.likedItems;
            if(items.length === 0){
                this.setState({items:false, loading:false})
                return
            }
            this.simplifyItems(items)
            // console.log(items)
            
        } catch (error) {
            console.log(error)
        }
        
     }

    async componentDidMount(){
        this.setState({loading:true,card:false})
        try {
            const result = await axios({
                method:'POST',
                url:'/api/like/get-liked',
                data:{
                    user:this.user,
                    category:'movie'
                }
            })
            // console.log(result)
            let items = result.data.likedItems;
            if(items.length === 0){
                this.setState({items:false, loading:false})
                return
            }
            this.simplifyItems(items)
            // console.log(items)
            
        } catch (error) {
            console.log(error)
        }
    }
    

    render() { 
        const { active, loading, results,card, items }= this.state
        return (
            <React.Fragment>
                <Link to='/' className="login__back"> <FontAwesomeIcon icon={faArrowCircleLeft} /></Link>
                <Heading value='Your Favourite'/>
                <Selection onCategoryChange={this.handleChangeCategory} active={active}/>
                {loading ? <LoadingSpinner visible={true}/> : <LoadingSpinner visible={false}/>}
                {card && results.length > 0 ? <Card active={active} liked={true} results={results} />: null }
                {!items ? <Heading purpose={'no-likes'} value={`You have no favourite ${active}`}/> : null}
            </React.Fragment> 
         );
    }
}
 
export default Me;