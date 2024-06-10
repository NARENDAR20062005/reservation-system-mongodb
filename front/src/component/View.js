import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import '../style/style.css';
import backgroundImage from './homebk.jpg'; 
const { Search } = Input;


function View() {
    const [bookings, setBookings] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/view");
            setBookings(response.data.vehicle);
            setFilteredData(response.data.vehicle);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setFilteredData(
            bookings.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.vName.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, bookings]);

    const onSearch = (value) => {
        setSearch(value);
    };

    return (
        <>
            <div className='searchbar'>
                <Search placeholder="Search..." allowClear onSearch={onSearch} style={{ width: 300 }} />
            </div>
            <div className='bodybk' style={{ backgroundImage: `url(${backgroundImage})`, height: '100%', backgroundSize: 'cover', 
            paddingTop: '20px' }}>
            <div className="play_back">
                <div className="w-75">
                    {filteredData.map((booking) => (
                        <div key={booking.id} className="card mb-3">
                            <div className="card-body">
                                <div className="m-2">Name: {booking.name}</div>
                                <div className='m-2'>Phone: {booking.phone}</div>
                                <div className='m-2'>Vehicle: {booking.vName}</div>
                                <div className='m-2'>Count: {booking.count}</div>
                                <div className='m-2'>Days: {booking.noDays}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
              </div>
            
        </>
    );
}

export default View;
