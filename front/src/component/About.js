import React, { Component } from 'react';
import backgroundImage from './homebk.jpg'; 
import '../style/About.css'; 
import { Input, Space } from 'antd';

const { Search } = Input;
class About extends Component {
    render() {
        return (
           
            <div style={{ backgroundImage: `url(${backgroundImage})`, height: '100vh', backgroundSize: 'cover',
             backgroundPosition: 'center', textAlign: 'center', paddingTop: '100px' }}>
                <p>Welcome to the about page</p>
            </div>
         
        );
    }
}

export default About;
