import { Center, Box, Alert } from "@mantine/core";
import { IconAlertSquareRounded } from "@tabler/icons-react";

const ErrorElement:React.FC<{message: string}> = ({message}) => {
    return (
        <Center mt="xl">
            <Box>
                <Alert variant="light" color="red" radius="md" title="Alert title" icon={<IconAlertSquareRounded />}>
                    {message}
                </Alert>
            </Box>
        </Center>
    );
}

export default ErrorElement;