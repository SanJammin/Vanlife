import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
    const { van } = useOutletContext();

    return (
        <img src={van.imageUrl} alt={`Image of ${van.name}`} className="host-van-detail-image" />
    );
}