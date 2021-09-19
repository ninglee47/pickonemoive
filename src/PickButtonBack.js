import React from 'react';
import ReactDOM from 'react-dom';

const apiKey = '361c5360d12fe6b74f04ebd76dfd7c4b'
const min_movie_id = 2
let latestUrl = `https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}&language=en-US`


//generate random number
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};

async function getRamdonId() {
    var res = await fetch(latestUrl);
    var dat = await res.json();
    var latest_movie_id = dat.id;
    var random_movie_id = getRandom (min_movie_id, latest_movie_id);
    //console.log(latest_movie_id);
    //console.log(random_movie_id);
    return random_movie_id
}

class Pick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: "Let's see...",
            data: {}
        }
    }

    handlePick() {

        getRamdonId().then(value => {
            console.log(value)
            this.setState({
                movie: value
            });
        }).then( () => {
            var movie_id = this.state.movie
            let searchURl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`
            fetch(searchURl)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    data: data
                })
            })
        })
    }

    render () {
        return (
            <div>{this.state.movie} {this.state.data.id}
            <button onClick={()=>this.handlePick()}>Pick!</button>
            </div>
        )
    }
}

export default Pick