// useUpazila.js

import { useState, useEffect } from 'react';
import { upazilasByDistrict } from '../DistricsAndUpazila/DistricsAndUpazila';

const useUpazila = (district) => {
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        if (district) {
            setUpazilas(upazilasByDistrict[district] || []);
        } else {
            setUpazilas([]);
        }
    }, [district]);

    return upazilas;
};

export default useUpazila;
