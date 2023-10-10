import React from 'react';
import { useState, useEffect } from 'react';

const Layout = (props) => {
    const [usSum, setUsSum] = useState(0);
    const [euSum, setEuSum] = useState(0);
    const [caSum, setCaSum] = useState(0);

    const [currentRegion, setCurrentRegion] = useState("");

    useEffect(() => {
        props.data.forEach((car) => {
            switch (car.region) {
                case 'US':
                    setUsSum(usSum + car.sales);
                    break;
                case 'EU':
                    setEuSum(euSum + car.sales);
                    break;
                case 'CA':
                    setCaSum(caSum + car.sales);
                    break;
                default:
                    break;
            }
        });
    }, [props.data]);

    return (
        <div className="database_box">
            CAR DATABASE
            <div>
                <div className='database_section'>
                    <p className="database_piece">Region</p>
                    <p className="database_piece">Model</p>
                    <p className="database_piece">Sales</p>
                </div>
            </div>
            <div>
                {props.data.map((car, index) => {
                    return (
                        <div key={index}>
                            <div className='database_section'>
                                <p className="database_piece">{car.region}</p>
                                <p className="database_piece">{car.model}</p>
                                <p className="database_piece">{car.sales}</p>
                            </div>
                        </div>
                    );
                })}
                <div className="database_section">
                    <p className="database_piece">US</p>
                    <p className="database_piece">sum</p>
                    <p className="database_piece">{usSum}</p>
                </div>
                <div className="database_section">
                    <p className="database_piece">EU</p>
                    <p className="database_piece">sum</p>
                    <p className="database_piece">{euSum}</p>
                </div>
                <div className="database_section">
                    <p className="database_piece">CA</p>
                    <p className="database_piece">sum</p>
                    <p className="database_piece">{caSum}</p>
                </div>
            </div>
        </div>
    );
};

export default Layout;
