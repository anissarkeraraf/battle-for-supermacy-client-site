import  { useState, useEffect } from "react";
import useUpazila from "../../Hooks/useUpazila";
import { districts } from "../../DistricsAndUpazila/DistricsAndUpazila";

const DonorSearch = () => {
    const [donors, setDonors] = useState([]);
    const [searchParams, setSearchParams] = useState({
        bloodGroup: 'A+',
        district: '',
        upazila: ''
    });
    const upazilas = useUpazila(searchParams.district);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevParams) => ({
            ...prevParams,
            [name]: value
        }));
    };

    useEffect(() => {
        if (searchParams.district) {
            setSearchParams((prevParams) => ({
                ...prevParams,
                upazila: ''
            }));
        }
    }, [searchParams.district]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/searchDonors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchParams)
        });
        const data = await response.json();
        setDonors(data);
    };

    return (
        <div className="bg-gray-200">
            <h1>Search for Blood Donors</h1>
            <form className="search-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="bloodGroup">
                        <span>Blood Group:</span>
                    </label>
                    <select onChange={handleChange} required value={searchParams.bloodGroup} id="bloodGroup" name="bloodGroup" className="select select-bordered w-full max-w-xs">
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="district">
                        <span>District:</span>
                    </label>
                    <select id="district" name="district" value={searchParams.district} onChange={handleChange} required className="select select-bordered w-full max-w-xs">
                        <option value="">Select District</option>
                        {districts.map((district, index) => (
                            <option key={index} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="upazila">
                        <span>Upazila:</span>
                    </label>
                    <select id="upazila" name="upazila" value={searchParams.upazila} onChange={handleChange} required className="select select-bordered w-full max-w-xs">
                        <option value="">Select Upazila</option>
                        {upazilas.map((upazila, index) => (
                            <option key={index} value={upazila}>{upazila}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-[#EF3D32] p-3 bg-opacity-80">Search</button>
            </form>

            <div className="results" style={{ display: donors.length > 0 ? 'block' : 'none' }}>
                <h2>Donor Results</h2>
                <ul>
                    {donors.map((donor, index) => (
                        <li key={index}>{donor.name} - {donor.bloodGroup} - {donor.district} - {donor.upazila}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DonorSearch;
