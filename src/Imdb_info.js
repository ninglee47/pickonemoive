import React from 'react'

const pageLink = "https://www.imdb.com/title/"

class Imdb_info extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='detail'>
                <p>Genre: {this.props.value.Genre}</p>
                <p>Imdb Score: {this.props.value.imdbRating}</p>
                <p>Votes: {this.props.value.imdbVotes}</p>
                <a href={pageLink + this.props.value.imdbID} target="_blank">IMDB Page</a>
            </div>
        )

    }
}

export default Imdb_info