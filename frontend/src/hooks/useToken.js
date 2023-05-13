import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';

const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    // token is not set in local storage
    return true;
  }

  const { exp } = jwt.decode(token);
  const currentTime = Math.floor(Date.now() / 1000); // convert to seconds

  return currentTime >= exp;
};

const useToken = () => {
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTokenExpired(isTokenExpired());
    }, 1000); // check token expiration every second

    return () => clearInterval(intervalId);
  }, []);

  return {
    isTokenExpired: tokenExpired,
  };
};

export default useToken;
