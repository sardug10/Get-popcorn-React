import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { reduceWriteUp } from './../utils/limitWriteUp';
import defaultPoster from '../images/default-poster.png';
import defaultProfile from '../images/default-person-profile.jpg';



class Card extends Component {
    handleKnownFor(work){
        if(work.constructor !== Array){
            return 'None!'
        }
        let works = [];
        // console.log(work)
        works = work.map(el => {
            return el.original_title
        })
        return works.join(' , ');
    }

    getImgSrc = (result) =>{
        if(this.props.active === 'movies' || this.props.active === 'TV shows'){
            if(result.poster_path) return `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`;
            else return defaultPoster;
        } else{
            if(result.profile_path) return `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.profile_path}`;
            else return defaultProfile;
        }
    }

    render() {
        const { results, liked } = this.props
        
        if(this.props.active === 'movies'){
            return ( 
                <div className="section__cards">
                    {results.map(movie => (
                        <div className="card" key={movie.id}>
                            <img src={this.getImgSrc(movie)} alt={movie.title} className="card__img"/>
                            <div className="card__info">
                                <h3 className="card__title">{reduceWriteUp(movie.title,15)}</h3>
                                <h5 className="card__date">{movie.release_date}</h5>
                                <p className="card__description">{reduceWriteUp(movie.overview)}<Link className='card__link' to={`/movie/${movie.id}`} >read more</Link></p>
                                <span className="card__rating">{movie.vote_average}</span>
                            </div>
                        </div>
                    ))}
                </div>
             );
        } else if(this.props.active === 'TV shows'){
            return (
                <div className="section__cards">
                    {results.map(show => (
                        <div className="card" key={show.id}>
                            <img src={this.getImgSrc(show)} alt={show.name} className="card__img"/>
                            <div className="card__info">
                                <h3 className="card__title">{reduceWriteUp(show.name,15)}</h3>
                                <h5 className="card__date">{show.first_air_date}</h5>
                                <p className="card__description">{reduceWriteUp(show.overview)}<Link className='card__link' to={`/tv/${show.id}`}>read more</Link></p>
                                <span className="card__rating">{show.vote_average}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )
        } else{
            return (
                <div className="section__cards">
                    {results.map(person => (
                        <div className="card" key={person.id}>
                            <img src={this.getImgSrc(person)} alt={person.name} className="card__img"/>
                            <div className="card__info">
                                <h3 className="card__title">{reduceWriteUp(person.name,20)}</h3>
                                <h5 className="card__profession"><span className='card__profession card__profession--primary'>Profession:- </span> {person.known_for_department}</h5>
                                {!liked ? <p className="card__knownFor"><span className="card__knownFor--primary"> Known for:- </span>{reduceWriteUp(this.handleKnownFor(person.known_for),50)}</p> : <p className="card__knownFor"><span className="card__knownFor--primary"> Known for:- </span>{person.known_for_department}</p> } 
                                <span className="card__popularity">Popularity:- {person.popularity}</span>
                                <p className="card__description card__readMore"><Link className='card__link' to={`/person/${person.id}`}>read more</Link></p>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        
    }
}
 
export default Card;