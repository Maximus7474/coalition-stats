import { Text, Menu, Flex, Avatar, Image } from '@mantine/core';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import CoalImage from '../assets/coalition.webp';
import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { IoIosLogIn } from 'react-icons/io';

export interface UserProps {
    avatar: string;
    id: string;
    steamid: string|null;
    username: string;
    global_name: string;
}

const Navbar = () => {
    const [user, setUser] = useState<UserProps|null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('userData');
        if (data === null) return;
        try {
            setUser(JSON.parse(data));
        } catch (err) {

        }
    }, []);

    const logout = () => {
        localStorage.removeItem('userData');
        setUser(null);
    }

    return (
        <Flex direction="row" justify="space-between" align="center" style={{ padding: '1em 2em' }}>
            <Image src={CoalImage} style={{ height: '4em', borderRadius: '50%' }} />
            <Text size="xl" fw={700}>Coaltion Statistiques</Text>

            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Flex align="center" gap="xs" style={{ cursor: 'pointer' }}>
                        <Flex direction='column'>
                            <Text>{user?.global_name || "Déconnecté"}</Text>
                        </Flex>
                        <Avatar
                            src={user?.avatar && user?.id ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp` : "https://cdn-icons-png.flaticon.com/512/4945/4945973.png"}
                            radius="xl"
                        />
                    </Flex>
                </Menu.Target>

                <Menu.Dropdown>
                    {
                        user?.id &&
                        <>
                            <Menu.Label>Navigation</Menu.Label>
                            <Menu.Item onClick={() => navigate('/dashboard')} leftSection={<HiOutlineDesktopComputer />}>
                                Dashboard
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Item color="red" onClick={logout} leftSection={<FiLogOut style={{ fontWeight: 'bold' }} />}>
                                Logout
                            </Menu.Item>
                        </>
                    }
                    {
                        !(user?.id) &&
                        <>
                            <Menu.Item color="green" onClick={() => {window.location.href = '/api/auth/login'}} leftSection={<IoIosLogIn />}>
                                Se Connecter
                            </Menu.Item>
                        </>
                    }

                </Menu.Dropdown>
            </Menu>
        </Flex>
    );
};

export default Navbar;
