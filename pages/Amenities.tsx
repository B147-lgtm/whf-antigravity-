
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Amenities: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/estate', { replace: true });
  }, [navigate]);
  return null;
};

export default Amenities;
