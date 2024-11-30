import { Button, useMantineColorScheme } from '@mantine/core';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { MdBrightnessAuto } from 'react-icons/md';

const ThemeButton = () => {
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const iconStyle = {
        width: '1.5em',
        height: '1.5em',
    };

    return (
        <Button
            onClick={() => {
                setColorScheme(
                    colorScheme === 'light' ? 'dark' : 'light'
                )
            }}
            style={{
                width: '3em',
                height: '3em',
                padding: '0',
                borderRadius: '1.5em',

                zIndex: '1000',
                position: 'fixed',
                bottom: '1em',
                right: '1em'
            }}
        >
            {
                colorScheme === 'auto' ? 
                    <MdBrightnessAuto style={iconStyle} /> :
                colorScheme === 'light' ?
                    <IoSunnyOutline style={iconStyle} /> :
                    <IoMoonOutline style={iconStyle} />

            }
        </Button>
    )
};

export default ThemeButton;