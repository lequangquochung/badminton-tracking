import { PlayerDto } from "../dtos/playerDto";
import { IPlayer } from "../models/player.model";

export async function getPlayers(): Promise<PlayerDto[]> {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players`);
        if (!result.ok) {
            throw new Error(`API call failed with status: ${result.status}`);
        }
        const responseData = await result.json();

        return responseData.data.data.map((player: IPlayer) => ({
            id: player._id,
            name: player.name,
            winRate: player.winRate,
            score: player.score,
            matchesPlayed: player.matchesPlayed,
            matchesWon: player.matchesWon,
            matchesLost: player.matchesLost,
            partnerInfo: player.partnerInfo
        }) as PlayerDto);
    } catch (error) {
        console.error("Error fetching matches:", error);
        return {} as PlayerDto[];
    }
}