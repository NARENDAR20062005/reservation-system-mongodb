import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import '../style/style.css';
import { Input } from 'antd';
import backgroundImage from './homebk.jpg'; 

const { Search } = Input;

function Reserve() {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        vName: '',
        count: '',
        noDays: ''
    });
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredData(
            data.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.vName.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data]);

    const fetchData = async () => {
        try {
            const response = await axios.get("/view");
            setData(response.data.vehicle);
            setFilteredData(response.data.vehicle);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                const response = await axios.put(`/update/${formData._id}`, formData);
                setData(prevData => prevData.map(item => item._id === formData._id ? response.data.updatedBooking : item));
            } else {
                const response = await axios.post('/create', formData);
                setData(prevData => [...prevData, response.data.newBooking]);
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (value) => {
        setEditMode(true);
        setFormData(value);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/delete/${id}`);
            setData(prevData => prevData.filter(booking => booking._id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onSearch = (value) => {
        setSearch(value);
    };

    return (
        <>
            <div className='searchbar'>
                <Search
                    placeholder="Search.."
                    allowClear
                    onSearch={onSearch}
                    style={{ width: 300 }}
                />
            </div>
            
            <div className='bodybk' style={{ backgroundImage: `url(${backgroundImage})`, height: '100%', backgroundSize: 'cover', paddingTop: '20px' }}>
                <button
                    onClick={() => { setShowModal(true); setEditMode(false); setFormData({ name: '', phone: '', vName: '', count: '', noDays: '' }) }}
                    className="m-3 bt3"
                    style={{ width: '130px', fontSize: '18px' }}
                >
                    CREATE 
                </button>
                <div className="play_back">
                    <div className="w-75">
                        {filteredData.map((value) => (
                            <div key={value._id} className="card mb-3">
                                <div className="card-body">
                                    <div className="m-2"> Name: {value.name}</div>
                                    <div className='m-2'> Phone: {value.phone}</div>
                                    <div className='m-2'> Vehicle: {value.vName}</div>
                                    <div className='m-2'> Count: {value.count}</div>
                                    <div className='m-2'> Days: {value.noDays}</div>
                                    <div className='d-flex'>
                                        <div><button className='bt2 ms-2' onClick={() => handleEdit(value)}>Edit</button></div>
                                        <div><button className='bt2 ms-2' onClick={() => handleDelete(value._id)}>Delete</button></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit' : 'Vehicle Reservation'}</Modal.Title>
                </Modal.Header>
                <div>
                    <div className="modal_in m-3">
                        <label>Name</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="name"
                            style={{ width: '90%' }}
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>
                    <div className="modal_in m-3">
                        <label>Phone</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="phone"
                            style={{ width: '90%' }}
                            onChange={handleChange}
                            value={formData.phone}
                        />
                    </div>
                    <div className="modal_in m-3">
                        <label>Vehicle</label>
                        <select
                            className="mt-1 p-1 inp"
                            name="vName"
                            style={{ width: '90%' }}
                            onChange={handleChange}
                            value={formData.vName}
                        >
                            <option value="bike">Bike</option>
                            <option value="scooter">Scooter</option>
                            <option value="car">Car</option>
                        </select>
                    </div>
                    <div className="modal_in m-3">
                        <label>Count of Vehicle</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="count"
                            type="text"
                            min={1}
                            max={100}
                            style={{ width: '90%' }}
                            onChange={handleChange}
                            value={formData.count}
                        />
                    </div>
                    <div className="modal_in m-3">
                        <label>Days</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="noDays"
                            type="text"
                            min={1}
                            max={100}
                            style={{ width: '90%' }}
                            onChange={handleChange}
                            value={formData.noDays}
                        />
                    </div>
                    <button
                        className="ms-3 mb-3 bt"
                        style={{ width: '100px', fontSize: '17px' }}
                        onClick={handleSubmit}
                    >
                        {editMode ? 'Update' : 'Book'}
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default Reserve;
