import { Container, Divider, Title } from '@mantine/core';
import { MatchStat } from '../utils/types';
import { useEffect, useState } from 'react';
import { BarChart } from '@mantine/charts';

interface FactionStats {
    Faction: string;
    Victoires: number;
    Defaites: number;
}

const GlobalStats: React.FC<{matches: MatchStat[]}> = ({matches}) => {

    const [data, setData] = useState<FactionStats[]>([
        { Faction: 'IMF', Victoires: 10, Defaites: 2},
        { Faction: 'FRA', Victoires: 2, Defaites: 10}
    ]);

    useEffect(() => {
        let sortedStats: {[key: string]: any} = {};

        matches.forEach(match => {
            if (!sortedStats[match.winnerFaction]) sortedStats[match.winnerFaction] = { faction: match.winnerFaction, Victoires: 0, Defaites: 0 };
            if (!sortedStats[match.loserFaction]) sortedStats[match.loserFaction] = { faction: match.loserFaction, Victoires: 0, Defaites: 0 };

            sortedStats[match.winnerFaction]['Victoires'] ++;
            sortedStats[match.loserFaction]['Defaites'] ++;
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
