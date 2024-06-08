import { useEffect, useState } from 'react';
import useAuth from './useAuth'; 
import useDonors from './useDonors';

const useVolunteer = () => {
  const { user } = useAuth();
  const [dornor] = useDonors();
  const [isVolunteer, setIsVolunteer] = useState(false);

  useEffect(() => {
    if (dornor) {
      setIsVolunteer(dornor[0]?.role === 'volunteer');
    }
  }, [dornor]);

  return [isVolunteer];
};

export default useVolunteer;
