import React from 'react';

let imgSrc = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2`
let pageLink = "https://www.imdb.com/title/"


function GenreList(props) {
        let genres
        if (props.data.genres) {
            genres = props.data.genres.map((d)=> 
                //console.log(genre.name)
                <li key={d.id}>
                    {d.name}
                </li>
            )   
        }
        return (
            <div>
                Genre
                <ul>{genres }</ul>
            </div>
        )
}

class DisplayData extends React.Component {

    constructor (props) {
        super(props);
    }

    render() {
         
        
        var imdb = this.props.data
        //console.log(genres)
        //console.log(imdb)

        return (
            <div>
                <div>
                    <h2> {this.props.value.title} {this.props.value.year}</h2>
                    <a href={pageLink + this.props.value.imdb_id} target="_blank">IMDB LINK</a>
                </div>
            </div>
        )
    }
}

export default DisplayData;