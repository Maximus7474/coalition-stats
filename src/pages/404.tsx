import { Button, Title, Text, Center, Image } from '@mantine/core';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Center style={{ flexDirection: 'column', padding: '2em', margin: 'auto 0' }}>
            <Title order={1} style={{ fontSize: '3rem' }}>
                404 - Page Not Found
            </Title>
            <Text size="lg" style={{ marginBottom: '1.5em' }}>
                Tu es sorti de ta zone d'Opération !
            </Text>

            <Image
                src="https://static.wikia.nocookie.net/squad_gamepedia/images/c/cd/Squad_US_Army_Wallpaper_1920x1080.png/revision/latest?cb=20180915174331"
                alt="404 Image"
                radius="lg"
                style={{ maxWidth: '40%' }}
            />
            <Text size="sm" fs="italic" style={{marginBottom: '1.5em'}}>
                Credit to:{' '}
                <Text component='a' href="https://www.joinsquad.com" target='_blank' fs="underline" td="underline" c="blue">
                    Squad
                </Text> on Facebook</Text>
            <Button component={Link} to="/" variant="outline" size="md">
                Retour en zone sure
            </Button>
        </Center>
    );
};

export default NotFoundPage;
