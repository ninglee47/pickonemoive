import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

//const apiKey = 'nPkwzsC8PrwHhxzzZvhOFt6OU4rGNVuTFq1UQ7nS' dr
const apiKey = 'hZwUqU4GPUbgMFlwhFn1ZNfFZE18RExQzlS1okuu '

async function getStreamData (movie_id) {
    let streams = await fetch(`https://api.watchmode.com/v1/title/${movie_id}/sources/?apiKey=${apiKey}&regions=GB`)
    .then(res => res.json())

    console.log(streams)

    return streams
}

function GenreList(props) {
    let genres
    
        genres = props.data.map((d, index)=> 
            //console.log(genre.name)
            <li key={index}>
                <a href={d.web_url} target='_blank'>{d.name}</a>
            </li>
        )   
    
    return (
        <div>
            <ul>{genres }</ul>
        </div>
    )
}

class Stream extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            stream: []
        }
    }

    componentDidUpdate(prevProps) {
        var id = this.props.value.id
        if (id !== prevProps.value.id) {
            getStreamData(id)
            .then(data => this.setState({
                stream: data
                })
            ).then(()=> {
                var arrayOne =  this.props.data;
                var arrayTwo = this.state.stream;
                
                const results = arrayOne.filter(({ id: id1 }) => arrayTwo.some(({ source_id: id2 }) => id2 === id1));

                console.log(results)
                //Add stream service name
                for (let index = 0; index < arrayTwo.length; index++) {
                    const element = arrayTwo[index];
                    for (let index = 0; index < results.length; index++) {
                        const id = results[index].id;
                        if (element.source_id == id) {
                            element.name = results[index].name
                        }    
                    }   
                }
                
                //filter duplicate data
                arrayTwo = arrayTwo.filter((thing, index, self) =>
                    index === self.findIndex((t) => (
                      t.source_id === thing.source_id && t.web_url === thing.web_url
                    ))
                )

                this.setState({
                    stream: arrayTwo
                })
            })
        }
    }

    render () {
        return (
            <div className='detail'>
                Avaialbe on:
                <GenreList  data={this.state.stream}/>
            </div>
        )
    }
}

export default Stream;