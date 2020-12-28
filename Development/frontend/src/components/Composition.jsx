import React, {Component} from 'react';
import axios from 'axios';
import LoadingSpinner from './spinner';
import Cookies from 'js-cookie';
import Reviews from './reviews';
import CompositionSearch from './../models/compositionService';
import defaultPoster from '../images/default-poster.png';
import defaultProfile from '../images/default-person-profile.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { reduceWriteUp } from './../utils/limitWriteUp';

class Composition extends Component {
    category = this.props.match.params.category;
    id = this.props.match.params.id;
    user = Cookies.get('user');
    
    state = { 
        category:this.category,
        id:this.id,
        result:{},
        loading:false,
        composition:true,
        liked:false,
     }

    async componentDidMount(){
        const { category, id } = this.state 
        let composition = new CompositionSearch(id, category);
        this.setState({loading:true, composition:false});
        try {
            let result = await composition.getDetails();
            // console.log(result)
            this.setState({result})
            this.isLiked();
        } catch (error) {
            console.log(error)
        } finally{
            this.setState({loading:false,composition:true})
        }
    }

    isLiked = async ()=>{
        let user = this.user
        let category = this.category;
        if(!user){
            return
        }
        let currentItem = this.state.result
        try {
            const results = await axios({
                method:'POST',
                url:'/api/like/get-liked',
                data:{
                    user,
                    category
                }
            })
            let likedItems = results.data.likedItems
            likedItems.forEach((liked)=>{
                if(JSON.stringify(liked.item) === JSON.stringify(currentItem)){
                    // console.log(liked.item)
                    this.setState({liked:true})
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    getImgSrc = (result) =>{
        const {category} = this.state;
        if(category === 'movie' || category === 'tv'){
            if(result.poster_path) return `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`;
            else return defaultPoster;
        } else{
            if(result.profile_path) return `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.profile_path}`;
            else return defaultProfile;
        }
    }

    getGenres = (genreArr)=>{
        let result = genreArr.map(genre=>genre.name)

        return result.join(', ');
    }

    handleLike = async ()=>{
        // console.log('liked')
        const {liked} = this.state;

        // check if the user exists
        if(!this.user) {
            alert('Please Log-In to add this into favorites!')
            return
        }

        if(!liked){
            try {
                const result = await axios({
                    method:'POST',
                    url:'/api/like/add-liked',
                    data:{
                        user:this.user,
                        category:this.state.category,
                        item:this.state.result
                    }
                })
                // console.log(result)
                if(result.data.status === 'success'){
                    alert('Item added to favorites successfully!')
                }
                this.setState({liked:true})
            } catch (error) {
                console.log(error)
            }
        } else{
            try {
                const result = await axios({
                    method:'POST',
                    url:'/api/like/delete-liked',
                    data:{
                        user:this.user,
                        category:this.state.category,
                        item:this.state.result
                    }
                })
                // console.log(result)
                if(result.data.status === 'success'){
                    alert('Item deleted from favorites successfully!')
                }
                this.setState({liked:false})
            } catch (error) {
                console.log(error)
            }
        }       
         
    }
    
    render() { 
        const { result,loading,composition,category, liked,id } = this.state
        if(category === 'movie'){
            return (
                <React.Fragment>
                    <Link to='/' className="composition__back"> <FontAwesomeIcon icon={faArrowCircleLeft} /></Link>
                    {loading ? <LoadingSpinner visible={true}/> : <LoadingSpinner visible={false}/>} 
                    {composition ? <div className="composition">
                        <img src={this.getImgSrc(result)} alt={result.title} className="composition__img"/>
                        <div className="composition__info">
                            {liked ? <FontAwesomeIcon icon={faHeart} onClick={this.handleLike} className='composition__like'/> :<FontAwesomeIcon icon={farHeart} onClick={this.handleLike} className='composition__like'/> }
                            {/* <FontAwesomeIcon icon={faHeart} /> */}
                            <h3 className="composition__title">{result.title}</h3>
                            <h6 className="composition__tagline">{result.tagline}</h6>
                            <h4 className="composition__date">{result.release_date}</h4>
                            <span className="composition__rating">{`IMDB ${result.vote_average}`}</span>
                            <span className="composition__runtime">{`${result.runtime} min`}</span>
                            {/* <span className="composition__genres">{this.getGenres(result['production_companies'])}</span> */}
                            <p className="composition__overview">{reduceWriteUp(result.overview,500)}</p>
                        </div>              
                    </div> : null }
                    <Reviews category={category} id={id} />
                </React.Fragment>
             );
        } else if(category === 'tv'){
            return(
                <React.Fragment>
                    <Link to='/' className="composition__back"> <FontAwesomeIcon icon={faArrowCircleLeft} /></Link>
                    {loading ? <LoadingSpinner visible={true}/> : <LoadingSpinner visible={false}/>} 
                    {composition ? <div className="composition">
                        <img src={this.getImgSrc(result)} alt={result.name} className="composition__img"/>
                        <div className="composition__info">
                        {liked ? <FontAwesomeIcon icon={faHeart} onClick={this.handleLike} className='composition__like'/> :<FontAwesomeIcon icon={farHeart} onClick={this.handleLike} className='composition__like'/> }
                            <h3 className="composition__title">{result.name}</h3>
                            <h6 className="composition__tagline">{result.tagline}</h6>
                            <h4 className="composition__date">{result.first_air_date}</h4>
                            <span className="composition__rating">{`IMDB ${result.vote_average}`}</span>
                            <span className="composition__runtime">{`${result.number_of_episodes} episodes`}</span>
                            {/* <span className="composition__genres">{this.getGenres(result['production_companies'])}</span> */}
                            <p className="composition__overview">{reduceWriteUp(result.overview,500)}</p>
                        </div>              
                    </div> : null }
                    <Reviews category={category} id={id} />
                </React.Fragment>
            )
        } else{
            return (
                <React.Fragment>
                    <Link to='/' className="composition__back"> <FontAwesomeIcon icon={faArrowCircleLeft} /></Link>
                    {loading ? <LoadingSpinner visible={true}/> : <LoadingSpinner visible={false}/>} 
                    {composition ? <div className="composition">
                        <img src={this.getImgSrc(result)} alt={result.name} className="composition__img"/>
                        <div className="composition__info">
                        {liked ? <FontAwesomeIcon icon={faHeart} onClick={this.handleLike} className='composition__like'/> :<FontAwesomeIcon icon={farHeart} onClick={this.handleLike} className='composition__like'/> }
                            <h3 className="composition__title">{result.name}</h3>
                            <h6 className="composition__tagline">{`Place of birth:- ${result.place_of_birth}`}</h6>
                            <h4 className="composition__date">{result.birthday}</h4>
                            <span className="composition__rating">{`Popularity:- ${result.popularity}`}</span>
                            <span className="composition__runtime">{`${result.known_for_department}`}</span>
                            {/* <span className="composition__genres">{this.getGenres(result['production_companies'])}</span> */}
                            <p className="composition__overview">{result.biography}</p>
                        </div>              
                    </div> : null }
                </React.Fragment>
            )
        }
        
    }
}

 
export default Composition;