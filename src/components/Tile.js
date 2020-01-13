import React from 'react';
import {Component} from 'react';
import Card from 'react-bootstrap/Card';




class Tile extends Component {
    render() { 
        var styles = (this.props.isLongTile) ? "longTile" : "tile";
        
        styles += " tile" + this.props.weatherDes + " commonTileClass";

        return ( 
            <Card className={styles} border="dark">
                <Card.Body>
                    <Card.Title><p>{Math.round(this.props.weatherData)} &#8451;</p></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.date}</Card.Subtitle>
                    <Card.Text className='tileText'>
                        {this.props.weatherDes} 
                    </Card.Text>
                </Card.Body>
            </Card>
            );
    }
}
 
export default Tile;