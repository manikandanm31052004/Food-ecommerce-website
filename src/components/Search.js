import React, { useEffect, useState } from 'react';
import Fooddata from './FoodData';
import "./Style.css";
import Form from 'react-bootstrap/Form';
import Cards from './Cards';
import Set from './Set';
import Sidebar from './Sidebar';

const Search = () => {
    const [fdata, setFdata] = useState(Fooddata);
    const [copydata, setCopyData] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");

    const changeData = (value) => {
        let searchText = value.toLowerCase();

        if (searchText === "") {
            setCopyData(fdata);
        } else {
            let filtered = fdata.filter((ele) =>
                ele.rname.toLowerCase().includes(searchText)
            );
            setCopyData(filtered);
        }
    };

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedItem(value);

        if (value === "") {
            setCopyData(fdata);
        } else {
            const filtered = fdata.filter((ele) =>
                ele.rname.toLowerCase() === value.toLowerCase()
            );
            setCopyData(filtered);
        }
    };

    const logo = "images/GrabFood – Logo.jpeg";

    useEffect(() => {
        setTimeout(() => {
            setCopyData(Fooddata);
        }, 1000);
    }, []);

    return (
        <div style={{ display: "flex" }}>
            {/* LEFT SIDEBAR */}
            <Sidebar />

            {/* MAIN CONTENT */}
            <div style={{ marginLeft: "20px", width: "100%" }}>
                <div className="container d-flex justify-content-between align-items-center">
                    <img src={logo} style={{ width: "5rem", cursor: "pointer" }} alt="" />
                    <div style={{ color: "#1b1464", cursor: "pointer" }} className="mt-3 d-flex gap-3">
                        <button style={{ backgroundColor: "#f5f7f2", color: "black", border: "none", fontSize: "20px", cursor: "pointer" }}>Shops</button>
                        <button style={{ backgroundColor: "#f5f7f2", color: "black", border: "none", fontSize: "20px", cursor: "pointer" }}>Offers</button>
                        <button style={{ backgroundColor: "#f5f7f2", color: "black", border: "none", fontSize: "20px", cursor: "pointer" }}>Contact</button>
                         
                    </div>
                </div>

                {/* SEARCH BOX */}
                <Form className='d-flex justify-content-center align-items-center mt-3'>
                    <Form.Group className="mx-2 col-lg-4" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            onChange={(e) => changeData(e.target.value)}
                            placeholder="Search your product from here"
                        />
                    </Form.Group>
                    <button className='btn text-light col-lg-1' style={{ background: "#ed4c67" }}>
                        Search
                    </button>
                </Form>

                {/* CARDS SECTION */}
                <section className='title'>
                    <h2 className='px-4' style={{ fontWeight: 600, textAlign: "center"}}>
                        Groceries Delivered in 90 Minutes
                    </h2>
                    <p style={{ textAlign: "center" }}>
                        Get your healthy foods & snacks delivered at your doorsteps all day everyday
                    </p>

                    <div className="row mt-2 d-flex justify-content-around align-items-center">
                        {copydata && copydata.length > 0
                            ? <Cards data={copydata} />
                            : <Set sdata={fdata} />}
                    </div>
                </section>
                
            </div>
        </div>
    );
}

export default Search;
