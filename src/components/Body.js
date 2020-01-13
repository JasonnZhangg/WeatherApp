import React from 'react';
import {Component} from 'react';
import './components.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import Tile from './Tile';
import {constants} from './secrets.js';

class Body extends Component {
    constructor(props){
        super(props);
        this.state = {
            temp: [],
            weatherDescription: [],
            dates: []
        }
    }

    renderTile(num){
        var isLong = (num === 0) ? false : true;
        return (
            <Tile isLongTile={isLong} weatherData={Math.round(this.state.temp[num])} weatherDes={this.state.weatherDescription[num]} date={this.state.dates[num]}/>
        );
    }

    // get current user location
    getLocation(){ 
        if (navigator.geolocation) {
            // return location as in JSON
            return new Promise((res, rej) => {
                navigator.geolocation.getCurrentPosition(res, rej)
            });
        }
        return 'Toronto';
    }

    // api call function
    async componentDidMount() {
        const apiKey = constants.apiKey;
        var apiURL = 'https://api.openweathermap.org/data/2.5/forecast?'; 
        var location = await this.getLocation();
        
        apiURL += (location === 'Toronto') ? 'q=Toronto' : 'lat=' + location.coords.latitude + '&lon=' + location.coords.longitude;

        // get weather data from the api
        fetch( apiURL + '&units=metric&appid=' + apiKey)
    
        .then(res => res.json())
        .then((data) => {
            // TODO: make a list that contains all the weather data then set that to this.state.weather
            // var weatherList = [];
            // var list = data.list;
            
            // for (var i = 0; i < list.length; i++){
                // console.log(list[i]);
            //     var str = list[i].dt_txt;
            //     if (str.includes('12:00:00')){
            //         weatherList.push(list[i]);
            //     }
            // }

            var temp = [];
            var weatherDescription = [];
            var dates = [];

            // for (var x = 0; x < weatherList.length; x++){
            //     temp.push(weatherList[x].main.temp);
            //     weatherDescription.push(weatherList[x].weather[0].main);
            //     var dateStr = weatherList[x].dt_txt;
            //     dateStr = dateStr.substring(0,10);
            //     dates.push(dateStr);
            // }
            for (var i = 0; i < data.length; i++){
                temp.push(data[i].temp);
                weatherDescription.push(data[i].desc);
                dates.push(data[i].date);
            }

            console.log(temp);
            console.log(weatherDescription);
            console.log(dates);
            
            this.setState({
                temp: temp,
                weatherDescription: weatherDescription,
                dates: dates           
            });

        })
        .catch(console.log)
    }

    

    render() { 
        var styles = "body ";
        styles += (this.state.weatherDescription[0] === null) ? "na" : this.state.weatherDescription[0];
        styles += " commonBgdClass";
        console.log(styles);

        return (  
            <div className={styles}>
                <Container >
                    <Row >
                        <Col style={{textAlign: "center", paddingBottom: "3%"}}>
                            {this.renderTile(0)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.renderTile(1)}
                        </Col>
                        <Col>
                            {this.renderTile(2)}
                        </Col>
                   
                        <Col>
                            {this.renderTile(3)}
                        </Col>
                        <Col>
                            {this.renderTile(4)}
                        </Col>
                        <Col>
                            {this.renderTile(5)}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
 
export default Body;