import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Vans() {
    const [vans, setVans] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const typeFilter = searchParams.get("type");

    useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans));
    }, []);

    const displayVans = typeFilter
        ? vans.filter(van => van.type === typeFilter) : vans;

    const VanElements = displayVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link 
                to={`/vans/${van.id}`} 
                aria-label={`View details ${van.name} priced at $${van.price} per day`}
            >
                <img src={van.imageUrl} alt={`Image of ${van.name}`} />
                <div className="van-info">
                    <p className="van-name">{van.name}</p>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ));

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <Link to="?type=simple" className="van-type simple">simple</Link>
                <Link to="?type=luxury" className="van-type luxury">luxury</Link>
                <Link to="?type=rugged" className="van-type rugged">rugged</Link>
                <Link to="." className="van-type clear-filters">clear filter</Link>
            </div>
            <div className="van-list">
                {VanElements}
            </div>
        </div>
    );
}