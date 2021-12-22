import React from 'react';
import Imdb from './Imdb'
import Stream from './Stream'
import ImdbInfo from './ImdbInfo'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { RotateSpinLoader } from 'react-css-loaders';

//const apiKey = '361c5360d12fe6b74f04ebd76dfd7c4b' timdb key
//const apiKey = 'nPkwzsC8PrwHhxzzZvhOFt6OU4rGNVuTFq1UQ7nS' dr
const apiKey = 'hZwUqU4GPUbgMFlwhFn1ZNfFZE18RExQzlS1okuu'

//generate random number
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};

async function getAllMovie() {
    var page = getRandom(0, 104);
    let movieList = [];

    let listUrl = `https://secure-hamlet-28039.herokuapp.com/https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&regions=GB&page=${page}`
    var res = await fetch(listUrl);
    var dat = await res.json();
    //console.log(dat)
    movieList.push(dat)
    
    return movieList;
}

async function getSource() {
    let url = `https://secure-hamlet-28039.herokuapp.com/https://api.watchmode.com/v1/sources/?apiKey=${apiKey}&regions=GB`
    var res = await fetch(url)
    var dat = await res.json()
    return dat;
}


class Pick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            movie: {},
            imdb_data: {},
            source: [],
            genres: [],
            selectedGenre: ''
        }
        this.handlePick = this.handlePick.bind(this);
        this.handleIMDBchange = this.handleIMDBchange.bind(this);
    }

    handleIMDBchange (data) {
        this.setState({
            imdb_data: data
        })
        //console.log('Called')
    }

    handlePick() {
        //console.log(this.state.dataList[0].titles)
        var elm = getRandom(0, this.state.dataList[0].titles.length)
        var movie = this.state.dataList[0].titles[elm]
        //console.log(movie)
        this.setState({
            movie: movie
        })
    }
    
    componentDidMount () {
        getAllMovie().then( data =>
            this.setState({
                dataList: data
            })
        )
        .then(()=>this.handlePick())

        getSource().then(res => 
            this.setState({
                source: res
            })
        )
    }

    render () {
        return (
            <div >
                <div className='d-flex p-3 mx-auto flex-column'>
                    <h1 className='cover-heading text-center'>Pick a movie for you</h1>
                    <Container>
                        <Row>
                            <Col className='cover'>
                                <Imdb value={this.state.movie}  onIMDBchange={this.handleIMDBchange}/>
                            </Col>
                            <Col className='info'>
                                <ImdbInfo value={this.state.imdb_data} className='detail'/>
                                <Stream value={this.state.movie} data={this.state.source}/>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className='align-items-center'>
                    <Button className="btn btn-lg btn-secondary" onClick={this.handlePick}>Get me another one</Button>
                </div>                
                
                
                <footer className="mastfoot mt-auto text-center">
                    <div className="inner">
                        <p>Supported regeions: GB</p>
                      <p>
                      <a href="https://www.watchmode.com/" target="_blank" rel="noreferrer" > Streaming data powered by Watchmode.com </a>
                      </p>
                    </div>
                </footer>
            </div>
            
        )
    }
}

export default Pick