export interface MatchStat {
    id: number;
    level: string;
    mode: string;
    endTime: string;
    ticketDifference: number;
    winnerFaction: string;
    winnerFactionType: string;
    loserFaction: string;
    loserFactionType: string;
}

export interface Tickrates {
    tickrate: number;
    players: number;
    time: string;
    match: number;
}