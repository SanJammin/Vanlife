import { useEffect, useState } from "react";
import { Link, Outlet, NavLink, useParams } from "react-router-dom";
import { getVan } from "../../../api";

export default function HostVanDetail() {
    const [van, setVan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getVan(id);
                setVan(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        loadVans();
    }, [id]);
    
    if (loading) {
        return <h1 aria-live="polite">Loading...</h1>
    }

    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>
    }
    
    const activeLink = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            {van && <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={van.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${van.type}`}
                        >
                            {van.type}
                        </i>
                        <h3>{van.name}</h3>
                        <h4>${van.price}/day</h4>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink 
                    to="."
                    end
                    style={({isActive}) => isActive ? activeLink : null}
                    >
                        Details
                    </NavLink>
                    <NavLink 
                        to="pricing"
                        style={({isActive}) => isActive ? activeLink : null}
                    >
                        Pricing
                    </NavLink>
                    <NavLink 
                        to="photos"
                        style={({isActive}) => isActive ? activeLink : null}
                    >
                        Photos
                    </NavLink>
                </nav>

                <Outlet context={{ van }}/>
            </div>}
        </section>
    );
}