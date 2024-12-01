import { LoadingOverlay } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const data = params.get('data');

        if (data) {
            const userData = JSON.parse(decodeURIComponent(data));
            localStorage.setItem('userData', JSON.stringify({
                avatar: userData.avatar,
                id: userData.id,
                steamid: null,
                username: userData.username,
                global_name: userData.global_name,
            }));
            console.log('Logging In');
            setTimeout(() => {
                navigate('/');
            }, 500);
        }
    }, [location.search, navigate]);

    return <LoadingOverlay visible={true}/>;
};

export default AuthSuccess;
