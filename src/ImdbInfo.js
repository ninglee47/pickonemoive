import React from 'react'

const pageLink = "https://www.imdb.com/title/"

function ImdbInfo (props) {
    return (
        <div className='detail'>
            <p>Genre: {props.value.Genre}</p>
            <p>Imdb Score: {props.value.imdbRating}</p>
            <p>Votes: {props.value.imdbVotes}</p>
            <a href={pageLink + props.value.imdbID} target="_blank" rel="noreferrer">IMDB Page</a>
        </div>
    )
}

export default ImdbInfo
