import React from 'react'

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
        return (
            <div>
                <h2> {this.props.value.title} ({this.props.value.year})</h2>
                <img src={this.state.imdbData.Poster}></img>
            </div>
        )

    }
}

export default Imdb