import { Container, Divider, Paper, Text, Title } from '@mantine/core';
import { MatchStat } from '../utils/types';
import { useEffect, useState } from 'react';
import { BarChart } from '@mantine/charts';

interface FactionStats {
    Faction: string;
    Victoires: number;
    Defaites: number;
    Picks: number;
}

interface BarGraphToolTipProps {
    label: string;
    type: "winrate"|"pickrate";
    payload: Record<string, any>[] | undefined;
}

const BarChartToolTip: React.FC<BarGraphToolTipProps> = ({ label, payload, type }) => {
    if(!payload) return null;
    const sum: number = payload.map((item: any) => (item.value)).reduce((acc, num) => acc + num, 0);
    return(
        <Paper px = "md" py = "sm" withBorder shadow = "md" radius = "md" >
            <Text fw={500} mb={5}>
                {label}
            </Text>
            { payload.map((item: any) => (
                    <Text key={item.name} c={type === 'winrate' ? item.color : undefined} fz="sm">
                        {type === 'pickrate' ? "Pick Rate:" : item.name}: {item.value}{type === 'pickrate' ? '%' : ''}
                    </Text>
                ))
            }
            {
                type === 'winrate' && (<Text key='matchs' c='grey' fz="sm">
                    Matchs Totaux: {sum}
                </Text>)
            }
        </Paper >
    );
}

const GlobalStats: React.FC<{ matches: MatchStat[] }> = ({ matches }) => {

    const [data, setData] = useState<FactionStats[]>([
        { Faction: 'IMF', Victoires: 10, Defaites: 2, Picks: 12 },
        { Faction: 'FRA', Victoires: 2, Defaites: 10, Picks: 12 }
    ]);

    useEffect(() => {
        let sortedStats: { [key: string]: any } = {};

        matches.forEach(match => {
            if (!sortedStats[match.winnerFaction]) sortedStats[match.winnerFaction] = { faction: match.winnerFaction, Victoires: 0, Defaites: 0, Picks: 0 };
            if (!sortedStats[match.loserFaction]) sortedStats[match.loserFaction] = { faction: match.loserFaction, Victoires: 0, Defaites: 0, Picks: 0 };

            sortedStats[match.winnerFaction]['Victoires']++;
            sortedStats[match.loserFaction]['Defaites']++;

            sortedStats[match.winnerFaction]['Picks']++;
            sortedStats[match.loserFaction]['Picks']++;
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
                    content: ({ label, payload }) => <BarChartToolTip label={label} payload={payload} type="winrate" />
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
            
            <BarChart
                h={600}
                w={1000}
                data={data.map(item => ({...item, Picks: Math.round(item.Picks / matches.length * 10000) / 100}))}
                dataKey="faction"
                tooltipProps={{
                    content: ({ label, payload }) => <BarChartToolTip label={label} payload={payload} type="pickrate" />
                }}
                getBarColor={(value) => (value <= 10 ? 'red.8' : 'teal.8')}
                series={[{ name: 'Picks', color: 'blue' }]}
                style={{
                    margin: '1em auto'
                }}
            />
        </Container>
    );
};

export default GlobalStats;
