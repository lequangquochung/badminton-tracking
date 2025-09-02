import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Calendar, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { MatchesDto } from "../dtos/matchDto";
import { IRequestMatch } from "../models/request.model";
import { getAll } from "../services/matches.service";
import { getPlayers } from "../services/players.service";
import { isWinner } from "./component/match-history";
import style from "./match-history.module.scss";

type MatchHistoryProps = {
    activeTab: string;
    onSendTotalMatch: (data: number) => void;
    onSendPlayerCount: (data: number) => void;
}

export default function MatchHistory({ activeTab, onSendTotalMatch, onSendPlayerCount }: MatchHistoryProps) {
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState<MatchesDto[]>([]);
    // search match
    const [searchTerm, setSearchTerm] = useState("");

    const getMatches = async () => {
        try {
            const payload: IRequestMatch = {}
            // loading spinner
            setLoading(true);
            const response = await getAll(payload);
            onSendTotalMatch(response?.length || 0);
            setMatches(response);
        } catch (error) { }
        finally {
            setLoading(false);
        }
    }

    // get players 
    const getAllPlayer = async () => {
        try {
            const result = await getPlayers();
            setLoading(true);
            onSendPlayerCount(result.length || 0);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllPlayer();
        if (activeTab === "history") {
            getMatches();
        }
    }, [activeTab])

    return (
        <>
            {loading ? <Spinner /> :
                <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle className="text-2xl">Match History</CardTitle>
                                <CardDescription>View and search through all matches</CardDescription>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                                <Input
                                    placeholder="Search matches..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full sm:w-80"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {matches.map((match) => (
                                <div
                                    key={match.id}
                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex-1">
                                        <div className="flex flex-col gap-3 mb-2">
                                            <div className="first-team flex items-center gap-8">
                                                <div className={`${style.playerName} flex-col`} >
                                                    <p
                                                        className={clsx(
                                                            "text-slate-900",   // class default
                                                            isWinner(match.firstScore) && "font-semibold" // adding when true 
                                                        )}
                                                    >
                                                        {match.firstPlayer}
                                                    </p>
                                                    <p className={`${isWinner(match.firstScore) ? "font-semibold" : ""} text-slate-900`}>{match.secPlayer}</p>
                                                </div>
                                                <div className="score">
                                                    <p className={`${isWinner(match.firstScore) ? "font-semibold" : ""} text-slate-900`}>{match.firstScore}</p>
                                                </div>
                                                <div className="status-result">
                                                    {isWinner(match.firstScore) ? <FontAwesomeIcon icon={["fas", "crown"]} style={{ color: "#fbd152" }} /> : ""}
                                                </div>
                                            </div>
                                            <div className="second-team flex items-center gap-8">
                                                <div className={`${style.playerName} flex-col`} >
                                                    <p className={`${isWinner(match.secScore) ? "font-semibold" : ""} text-slate-900`}>{match.thirdPlayer}</p>
                                                    <p className={`${isWinner(match.secScore) ? "font-semibold" : ""} text-slate-900`}>{match.fourthPlayer}</p>
                                                </div>
                                                <div className="score">
                                                    <p className={`${isWinner(match.secScore) ? "font-semibold" : ""} text-slate-900`}>{match.secScore}</p>
                                                </div>
                                                <div className="status-result">
                                                    {isWinner(match.secScore) ? <FontAwesomeIcon icon={["fas", "crown"]} style={{ color: "#fbd152" }} /> : ""}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex items-center gap-4 text-sm text-slate-600 mt-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(match.matchDay).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            }
        </>
    )
}

