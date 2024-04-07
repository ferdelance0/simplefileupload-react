import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useAuthentication() {
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const email = localStorage.getItem("email");
    const isAuthenticated = uid && email;

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);
}

export default useAuthentication;
