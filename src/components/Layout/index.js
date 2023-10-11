import React from 'react';
import { useState, useEffect } from 'react';
import { useCallback, useMemo, memo } from 'react';

const Layout = (props) => {
    const carData = props.data;

    const [usSum, setUsSum] = useState(0);
    const [euSum, setEuSum] = useState(0);
    const [caSum, setCaSum] = useState(0);

    const [regionFilter, setRegionFilter] = useState('All');
    const [modelFilter, setModelFilter] = useState('All');

    const lengthCutOff = props.data.length + 3;

    useEffect(() => {
        let usFinSum = 0;
        let euFinSum = 0;
        let caFinSum = 0;

        props.data.forEach((car) => {
            switch (car.region) {
                case 'US':
                    usFinSum += Number(car.sales);
                    break;
                case 'EU':
                    euFinSum += Number(car.sales);
                    break;
                case 'CA':
                    caFinSum += Number(car.sales);
                    break;
                default:
                    break;
            }
        });

        setUsSum(usFinSum);
        setEuSum(euFinSum);
        setCaSum(caFinSum);

        if (carData.length < lengthCutOff) {
            carData.push(
                {
                    region: 'US',
                    model: 'sum',
                    sales: usFinSum,
                },
                {
                    region: 'EU',
                    model: 'sum',
                    sales: euFinSum,
                },
                {
                    region: 'CA',
                    model: 'sum',
                    sales: caFinSum,
                }
            );
        }
    }, [])

    const handleRegionFilter = (e) => {
        setRegionFilter(e.target.value);
        console.log(regionFilter);
    }

    const handleModelFilter = (e) => {
        setModelFilter(e.target.value);
        console.log(modelFilter);
    }

    const PrintDataNames = () => {
        return (
            <div className='database_section'>
                <p className="database_piece">Region</p>
                <p className="database_piece">Model</p>
                <p className="database_piece">Sales</p>
            </div>
        )
    }

    const PrintCarData = (car) => {
        return (
            <div className='database_section'>
                <p className="database_piece">{car.region}</p>
                <p className="database_piece">{car.model}</p>
                <p className="database_piece">{car.sales}</p>
            </div>
        )
    }

    const PrintDropDowns = () => {
        return (
            <div>
                Region Filter
                <select onChange={handleRegionFilter}>
                    <option value="All">All</option>
                    <option value="US">US</option>
                    <option value="EU">EU</option>
                    <option value="CA">CA</option>
                </select>

                Model Filter
                <select onChange={handleModelFilter}>
                    <option value="All">All</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>
        )
    }

    return (
        <div>
            <div className="database_box">
                CAR DATABASE #1
                {PrintDataNames()}
                <div>
                    {carData.map((car, index) => {
                        return (
                            <div key={index}>
                                {PrintCarData(car)}
                            </div>
                        )
                    }
                    )}
                </div>
            </div>

            <div className="database_box">
                CAR DATABASE #2
                {PrintDropDowns()}
                {PrintDataNames()}
                <div>
                    {carData.map((car, index) => {
                        return (
                            <div key={index}>
                                {regionFilter === car.region || modelFilter === car.model ?
                                    PrintCarData(car)
                                    : regionFilter === 'All' && modelFilter === 'All' ?
                                        PrintCarData(car)
                                        : null}
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    );
};

export default Layout;
