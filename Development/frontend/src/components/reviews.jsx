import React, {Component} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

class Reviews extends Component {
    wholeUser = Cookies.get('user')
    user = this.wholeUser ? this.wholeUser[0] : undefined
    state = { 
        reviews:[],
        newReview:{
            user:this.user,
            category:this.props.category,
            id:this.props.id,
            text:''
        }
     }

    handleInputChange = (e)=>{
        if(!this.state.newReview.user){
            alert('Login to post a review')
            return
        }

        const reviewText = e.target.value;
        const tempNewReview = {...this.state.newReview};
        tempNewReview.text = reviewText;

        this.setState({newReview: tempNewReview});        
    }
    
    handleSubmit = async (e)=>{
        e.preventDefault();
        let {user, category, id, text} = this.state.newReview

        try {
            const result = await axios({
                method:'POST',
                url:'/api/review/post',
                data:{
                    user,
                    category,
                    id,
                    text
                }
            })
            // console.log(result);
            const newlyAddedReview = result.data.review;
            const {reviews} = this.state
            reviews.unshift(newlyAddedReview);
            let newReview = {
                user,
                category,
                id,
                text:''
            }
            this.setState({reviews, newReview})

        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount(){
        const { category, id, user } = this.state.newReview
        if(!user){
            return
        }
        // console.log(category, id);

        try {
            const result = await axios({
                method:'POST',
                url:'/api/review/get-reviews',
                data:{
                    category,
                    id
                }
            })
            // console.log(result);
            let reviews = result.data.reviews;
            this.setState({reviews})
        } catch (error) {
            console.log(error)
        }
        // const result = await axios({
        //     method:'POST',
        //     url:'/api/review/get-reviews',
        //     data:{
        //         category,
        //         id
        //     }
        // })
        // console.log(result);
    }

    render() {
        const { reviews, newReview } = this.state;
        if(newReview.user){
            return ( 
                <div className="review">
                    <h2 className="review__heading">Reviews</h2>
                    <div className="review__formDiv">
                        <span className="review__user">{this.user}</span>
                        <form className="review__form" onSubmit={(e)=>this.handleSubmit(e)}>
                            <input type="text" className="review__input" placeholder='Write a review' value={newReview.text} onChange={(e)=>this.handleInputChange(e)} required={true}/>
                            <button className="review__btn">Post</button>
                        </form>
                    </div>
                    {reviews.map(review => (
                        <div key={review._id} className="review__div">
                            <span className="review__user">{review.user}</span>
                            <p className="review__text">{review.text}</p>
                        </div>
                    ))}
                </div>
             );
        } else{
            return(
                <div className="review">
                    <h2 className="review__heading">Login to see and post reviews</h2>
                </div>
            )
            
        }
        
    }
}

export default Reviews;