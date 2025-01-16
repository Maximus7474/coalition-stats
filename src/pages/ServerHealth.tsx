import { LineChart } from '@mantine/charts';
import { Title } from '@mantine/core';
import { Tickrates } from "../utils/types";

const ServerHealth: React.FC<{tickrates: Tickrates[]}> = ({ tickrates }) => {
    console.log(tickrates);
    return (<>
        <Title>Évolution du tickrate et des joueurs</Title>

        <LineChart
            h="70vh"
            w="80vw"
            data={tickrates}
            dataKey="time"
            withLegend
            series={[
                { name: 'tickrate', label: 'Tickrate', color: 'indigo.6' },
                { name: 'players', label: 'Joueurs', color: 'blue.6' },
            ]}
        />
    </>)
};

export default ServerHealth;
