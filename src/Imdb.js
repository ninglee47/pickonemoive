import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner";

const omdb_key = '6163e7ca'


class Imdb extends React.Component {
    constructor(props) {
        super(props)
        this.state = {imdbData: {}}
    }

    componentDidUpdate(prevProps) {
        //console.log(this.props.value.imdb_id)
        var id = this.props.value.imdb_id
        if (id !== prevProps.value.imdb_id) {
            
            fetch(`https://secure-hamlet-28039.herokuapp.com/http://www.omdbapi.com/?i=${id}&apikey=${omdb_key}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                this.setState({
                    imdbData: data
                })
                this.props.onIMDBchange(this.state.imdbData)
            })
            .catch(err => {
            	console.error(err);
            })  
        }
    }


    render() {
        if (Object.keys(this.state.imdbData).length === 0) {
            return <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        }
        return (
            <div>
                <h2> {this.props.value.title} ({this.props.value.year})</h2>
                <img src={this.state.imdbData.Poster} alt="Poster"></img>
            </div>
        )

    }
}

export default Imdb