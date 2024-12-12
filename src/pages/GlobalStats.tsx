import { Container, Divider, Paper, Text, Title } from '@mantine/core';
import { MatchStat } from '../utils/types';
import { useEffect, useState } from 'react';
import { BarChart } from '@mantine/charts';

interface FactionStats {
    Faction: string;
    Victoires: number;
    Defaites: number;
}

interface WinrateToolTipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

const WinrateToolTip: React.FC<WinrateToolTipProps> = ({ label, payload }) => {
    if(!payload) return null;
    const sum: number = payload.map((item: any) => (item.value)).reduce((acc, num) => acc + num, 0);
    return(
        <Paper px = "md" py = "sm" withBorder shadow = "md" radius = "md" >
            <Text fw={500} mb={5}>
                {label}
            </Text>
            { payload.map((item: any) => (
                    <Text key={item.name} c={item.color} fz="sm">
                        {item.name}: {item.value}
                    </Text>
                ))
            }
            <Text key='matchs' c='grey' fz="sm">
                Matchs Totaux: {sum}
            </Text>
        </Paper >
    );
}

const GlobalStats: React.FC<{ matches: MatchStat[] }> = ({ matches }) => {

    const [data, setData] = useState<FactionStats[]>([
        { Faction: 'IMF', Victoires: 10, Defaites: 2 },
        { Faction: 'FRA', Victoires: 2, Defaites: 10 }
    ]);

    useEffect(() => {
        let sortedStats: { [key: string]: any } = {};

        matches.forEach(match => {
            if (!sortedStats[match.winnerFaction]) sortedStats[match.winnerFaction] = { faction: match.winnerFaction, Victoires: 0, Defaites: 0 };
            if (!sortedStats[match.loserFaction]) sortedStats[match.loserFaction] = { faction: match.loserFaction, Victoires: 0, Defaites: 0 };

            sortedStats[match.winnerFaction]['Victoires']++;
            sortedStats[match.loserFaction]['Defaites']++;
        });

        setData(
            Object.values(sortedStats)
        );
    }, [matches]);

    return (
        <Container size="xl" mt="lg" pb="2em">
            <Title>
                Win Rate des Factions
            </Title>

            <BarChart
                h={600}
                w={1000}
                data={data}
                dataKey="faction"
                type="stacked"
                tooltipProps={{
                    content: ({ label, payload }) => <WinrateToolTip label={label} payload={payload} />,
                }}
                series={[
                    { name: 'Victoires', color: 'blue.6' },
                    { name: 'Defaites', color: 'red.6' },
                ]}
                style={{
                    margin: '1em auto'
                }}
            />

            <Divider />
        </Container>
    );
};

export default GlobalStats;
