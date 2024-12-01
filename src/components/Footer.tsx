import { Container, Flex, Text } from "@mantine/core"
import { IconCopyright } from "@tabler/icons-react";

const Footer = () => {
    return (<>
        <Container fluid bg="var(--mantine-color-gray-light)" style={{padding: '1em 0'}}>
            <Flex gap="0.5em" style={{margin: '0 auto', width: 'fit-content'}}>
                <IconCopyright/>
                <Text fs="italic" style={{textAlign: 'center'}}>
                    <Text component="a" href="https://github.com/Maximus7474" target="_blank">Maximus Prime</Text> - 2024
                </Text>
            </Flex>
        </Container>
    </>)
};

export default Footer;