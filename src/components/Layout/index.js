import React from 'react';
import { useState, useEffect } from 'react';
import { useCallback, useMemo, memo } from 'react';

const Layout = (props) => {
    const [usSum, setUsSum] = useState(0);
    const [euSum, setEuSum] = useState(0);
    const [caSum, setCaSum] = useState(0);

    const [regionFilter, setRegionFilter] = useState('All');
    const [modelFilter, setModelFilter] = useState('All');

    const regionsPrinted = [];

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
    }, [])

    const handleRegionFilter = (e) => {
        setRegionFilter(e.target.value);
    }

    const handleModelFilter = (e) => {
        setModelFilter(e.target.value);
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

    const PrintRegionSum = (region) => {
        let regionHasBeenPrinted = false;

        if (regionsPrinted.length !== 0) {
            for (let i = 0; i < regionsPrinted.length; i++) {
                if (regionsPrinted[i] === region) {
                    regionHasBeenPrinted = true
                }
            }
        }

        if (!regionHasBeenPrinted) {
            regionsPrinted.push(region);

            return (
                <div className="database_section">
                    <div className='database_piece'>{region}</div>
                    <div className='database_piece'>sum</div>
                    <div className='database_piece'>{
                        region === 'US' ? usSum :
                            region === 'EU' ? euSum :
                                caSum}</div>
                </div>
            )
        }
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
                    {props.data.map((car, index) => {
                        return (
                            <div key={index}>
                                {PrintRegionSum(car.region)}
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
                    {props.data.map((car, index) => {
                        return (
                            <div key={index}>
                                {regionFilter === 'All' && modelFilter === 'All' ?
                                    PrintCarData(car)
                                    : regionFilter === car.region && modelFilter === 'All' ?
                                        PrintCarData(car)
                                        : regionFilter === car.region && modelFilter === car.model ?
                                            PrintCarData(car)
                                            : regionFilter === 'All' && modelFilter === car.model ?
                                                PrintCarData(car)
                                                : null
                                }
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
