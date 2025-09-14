import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { PlayerDto } from "../dtos/playerDto";
import { getPlayers } from "../services/players.service";
import style from "./players-ranking.module.scss";

type PlayersProps = {
    activeTab: string;
}

export default function Players({ activeTab }: PlayersProps) {
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState<PlayerDto[]>([]);

    // get players 
    const getAllPlayer = async () => {
        try {
            const result = await getPlayers();
            setLoading(true);
            setPlayers(result);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (activeTab === "players") {
            getAllPlayer();
        }
        getAllPlayer();
    }, [activeTab])

    return (
        <>
            {loading ? <Spinner /> :
                <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                        <CardTitle className="text-2xl">Player Rankings</CardTitle>
                        <CardDescription>Player statistics and performance overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {players.sort((a, b) => {
                                if (b.winRate !== a.winRate) {
                                    return parseFloat(b.winRate) - parseFloat(a.winRate);
                                }
                                return b.score - a.score;
                            })
                                .map((player, index) => (
                                    < div
                                        key={player.id}
                                        className={`${index === 0 ? style.topPlayer : ""} 
                                        ${index === 1 ? style.secPlayer : ""}
                                        ${index === 2 ? style.thirdPlayer : ""}
                                         flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                                                {index === 0 && <Crown className="h-5 w-5 text-yellow-600" />}
                                                {index !== 0 && <span className="font-bold text-blue-600">#{index + 1}</span>}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900">{player.name} - {player.score}</h3>
                                                <p className="text-sm text-slate-600">{player.matchesPlayed} matches played</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`${parseInt(player.winRate) < 30 ? style.lowWinRate : ""} 
                                            ${parseInt(player.winRate) >= 75 ? style.winRateAboveFiftyPercent : ""}
                                             text-2xl font-bold text-slate-900`}>{parseFloat(player.winRate).toFixed(2)}%</div>
                                            <div className="text-sm text-slate-600">
                                                {player.matchesWon}W - {player.matchesLost}L
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card >}
        </>
    )
}