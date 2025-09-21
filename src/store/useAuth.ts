import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authstore';

const DEFAULT_IMAGE = "/images/default-profile.png";

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, token, setUser, setToken, logout, setLoading } = useAuthStore();

  const fetchUserProfile = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/users/me`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (res.status === 401 || res.status === 403) {
        logout();
        navigate('/login');
        return;
      }

      if (!res.ok) throw new Error('Failed to fetch user data');

      const data = await res.json();
      const userData = data.user || data;

      setUser({
        ...userData,
        image: userData.image || DEFAULT_IMAGE,
      });

    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: any, authToken: string) => {
    setUser(userData);
    setToken(authToken);
  };

  return {
    user,
    token,
    isLoading: useAuthStore.getState().isLoading,
    login,
    logout,
    fetchUserProfile,
  };
};