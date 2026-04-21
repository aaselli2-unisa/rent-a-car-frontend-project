import { useState, useEffect, useRef } from 'react';
interface TokenModel {
  emailAddress: string;
  exp: number;
  firstname: string;
  iat: number;
  id: number;
  lastname: string;
  phoneNumber: string;
  role: string[];
  sub: string;
}

const useToken = () => {
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState<TokenModel | null>(null);


  const storedTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const syncFromStorage = () => {
      const storedToken = localStorage.getItem('token');
      storedTokenRef.current = storedToken ?? '';
      setToken(storedTokenRef.current);
      if (storedToken) {
        setDecodedToken(parseJwt(storedToken));
      } else {
        setDecodedToken(null);
      }
    };

    syncFromStorage();
    window.addEventListener('storage', syncFromStorage);
    return () => window.removeEventListener('storage', syncFromStorage);
  }, []);

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    storedTokenRef.current = newToken;
    setToken(newToken);

    if (newToken) {
      const decodedToken = parseJwt(newToken);
      setDecodedToken(decodedToken);
    }
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    storedTokenRef.current = '';
    setToken('');
    setDecodedToken(null);
  };

  const parseJwt = (token: string) => {
    if (!token) {
      console.error("Token is undefined.");
      return null;
    }
    const [header, payload, signature] = token.split('.');
    const decodedPayload: TokenModel = JSON.parse(atob(payload));
    return decodedPayload;
  };

  return { token, decodedToken, updateToken, clearToken };
};

export default useToken;
