import React from 'react';
import {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components.css'
import Navbar from 'react-bootstrap/Navbar';


class NavBar extends Component {
    render() { 
        return ( 
            <Navbar bg="dark" expand="lg" style={{color: "white"}}>
                <h4 >Today's Weather is</h4>
            </Navbar>
        );
    }
}
 
export default NavBar;