import { useState } from 'react';
import { Table, Container, Text, Center, ScrollArea, Title, Box, Flex, Alert, LoadingOverlay } from '@mantine/core';
import { IconArrowUp, IconArrowDown, IconArrowsSort, IconAlertSquareRounded } from '@tabler/icons-react';
import { MatchStat } from '../utils/types';

const translations: { [key: string]: string } = {
    endTime: 'date',
    level: 'map',
    mode: 'mode',
    ticketDifference: 'différence de ticket',
    winnerFaction: 'faction gagnante',
    winnerFactionType: 'type de faction',
    loserFaction: 'faction perdante',
    loserFactionType: 'type de faction',
};

const LastMatches: React.FC<{matches: any[]}> = ({matches}) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof MatchStat; direction: 'asc' | 'desc' } | null>({key: 'id', direction: 'desc'});


    const sortedStats = () => {
        if (!sortConfig) return matches;
        return [...matches].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const handleSort = (key: keyof MatchStat) => {
        setSortConfig((prevConfig) => {
            if (prevConfig && prevConfig.key === key) {
                return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    return (
        <Container size="xl" mt="lg" pb="2em">
            <Title mb="md" style={{ textAlign: 'center' }}>
                Dernier {matches.length} Matchs
            </Title>
            <ScrollArea h="80vh" scrollbarSize={4} scrollHideDelay={500}>
                <Table highlightOnHover stickyHeader verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            {Object.keys(translations).map((key) => (
                                <Table.Th
                                    key={key}
                                    onClick={() => handleSort(key as keyof MatchStat)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Flex align="center">
                                        <Text mr={5}>{translations[key]}</Text>
                                        {sortConfig?.key === key ? (
                                            sortConfig.direction === 'asc' ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />
                                        ) : (
                                            <IconArrowsSort size={14} />
                                        )}
                                    </Flex>
                                </Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {sortedStats().map((match) => (
                            <Table.Tr key={match.id}>
                                <Table.Td>{new Date(match.endTime).toLocaleString()}</Table.Td>
                                <Table.Td>{match.level}</Table.Td>
                                <Table.Td style={{textAlign: 'center'}}>{match.mode}</Table.Td>
                                <Table.Td style={{textAlign: 'center'}}>{match.ticketDifference}</Table.Td>
                                <Table.Td style={{textAlign: 'center'}}>{match.winnerFaction}</Table.Td>
                                <Table.Td>{match.winnerFactionType}</Table.Td>
                                <Table.Td style={{textAlign: 'center'}}>{match.loserFaction}</Table.Td>
                                <Table.Td>{match.loserFactionType}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </Container>
    );
};

export default LastMatches;
