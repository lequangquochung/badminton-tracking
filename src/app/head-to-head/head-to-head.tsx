import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import players from "../players/players";
type HeadToHeadProps = {
    activeTab: string;
}
export default function HeadToHead({ activeTab }: HeadToHeadProps) {
    return (
        <Card className="bg-white shadow-lg border-0">
            <CardHeader>
                <CardTitle className="text-2xl">Head to Head Comparison</CardTitle>
                <CardDescription>Compare performance between two players</CardDescription>
            </CardHeader>
            <CardContent>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <Label htmlFor="player1-select">Player 1</Label>
                        <Select value={selectedPlayer1} onValueChange={setSelectedPlayer1}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select first player" />
                            </SelectTrigger>
                            <SelectContent>
                                {players.map(player => (
                                    <SelectItem key={player.id} value={player.name}>{player.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="player2-select">Player 2</Label>
                        <Select value={selectedPlayer2} onValueChange={setSelectedPlayer2}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select second player" />
                            </SelectTrigger>
                            <SelectContent>
                                {players.filter(p => p.name !== selectedPlayer1).map(player => (
                                    <SelectItem key={player.id} value={player.name}>{player.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {selectedPlayer1 && selectedPlayer2 && (
                    <div className="space-y-6">
                        {(() => {
                            const stats = getHeadToHeadStats(selectedPlayer1, selectedPlayer2);
                            const player1Data = players.find(p => p.name === selectedPlayer1);
                            const player2Data = players.find(p => p.name === selectedPlayer2);

                            return (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <Card className="text-center border-blue-200 bg-blue-50">
                                            <CardContent className="pt-6">
                                                <div className="text-3xl font-bold text-blue-600">{stats.player1Wins}</div>
                                                <p className="text-sm text-slate-600">{selectedPlayer1} Wins</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="text-center border-slate-200">
                                            <CardContent className="pt-6">
                                                <div className="text-3xl font-bold text-slate-600">{stats.totalMatches}</div>
                                                <p className="text-sm text-slate-600">Total Matches</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="text-center border-orange-200 bg-orange-50">
                                            <CardContent className="pt-6">
                                                <div className="text-3xl font-bold text-orange-600">{stats.player2Wins}</div>
                                                <p className="text-sm text-slate-600">{selectedPlayer2} Wins</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>{selectedPlayer1}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span>Overall Win Rate</span>
                                                        <span className="font-semibold">{player1Data?.winRate.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Total Wins</span>
                                                        <span className="font-semibold">{player1Data?.wins}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Total Matches</span>
                                                        <span className="font-semibold">{player1Data?.totalMatches}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle>{selectedPlayer2}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span>Overall Win Rate</span>
                                                        <span className="font-semibold">{player2Data?.winRate.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Total Wins</span>
                                                        <span className="font-semibold">{player2Data?.wins}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Total Matches</span>
                                                        <span className="font-semibold">{player2Data?.totalMatches}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                )} */}
            </CardContent>
        </Card>
    )
}