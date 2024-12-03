import { Button, Title, Text, Center, Image, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    const { colorScheme } = useMantineColorScheme()

    return (
        <Center style={{ flexDirection: 'column', padding: '2em', margin: 'auto 0' }}>
            <Title order={1} style={{ fontSize: '3rem' }}>
                404 - Page Not Found
            </Title>
            <Text size="lg" style={{ marginBottom: '1.5em' }}>
                Tu es sorti de ta zone d'Opération !
            </Text>

            <Image
                src={
                    colorScheme === "dark" ? (
                        "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-6/465838591_1574655246642742_8385942779888689708_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YSsOUQVuU7MQ7kNvgEsFFfw&_nc_zt=23&_nc_ht=scontent-mrs2-1.xx&_nc_gid=A96i1LAp_cI-tC7DwBiqIy8&oh=00_AYB-t1K_qcaBKuzBVTcjfs9qD3rno2QNoDb3p0Znx-JrjA&oe=6752A08F"
                    ) : (
                        "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-6/467781223_1584680685640198_3554006445875152581_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rYkexVa57DIQ7kNvgHDcFUA&_nc_zt=23&_nc_ht=scontent-mrs2-1.xx&_nc_gid=AyApCrPNXDURHoZu-WIzCIr&oh=00_AYCpwlCEp5qCNmLSQGnGb5N99veHBwAf2KSOKs33JKg7Bw&oe=6752BF1A"
                    )}
                alt="404 Image"
                radius="lg"
                style={{ maxWidth: '40%' }}
            />
            <Text size="sm" fs="italic" style={{marginBottom: '1.5em'}}>
                Credit to:{' '}
                <Text component='a' href="https://www.facebook.com/JoinSquad" target='_blank' fs="underline" td="underline" c="blue">
                    Squad
                </Text> on Facebook</Text>
            <Button component={Link} to="/" variant="outline" size="md">
                Retour en zone sure
            </Button>
        </Center>
    );
};

export default NotFoundPage;
