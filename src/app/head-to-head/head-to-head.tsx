import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger } from "@/components/ui/shadcn-io/combobox";
import Spinner from "@/components/ui/spinner";
import { Label } from "@radix-ui/react-label";
import { FormEvent, useState } from "react";
import toast from 'react-hot-toast';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { PlayerDto } from "../dtos/playerDto";
import { IHeadToHead } from "../models/match.model";
import { IRequestHeadToHead } from "../models/request.model";
import { getPairRate } from "../services/matches.service";
import { E_STATUS_CODE } from "../utils/utils";
import style from "./head-to-head.module.scss";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


type HeadToHeadProps = {
    activeTab: string;
    players: PlayerDto[];
}
export default function HeadToHead({ activeTab, players }: HeadToHeadProps) {
    const [headToHeadMatches, setHeadToHeadMatches] = useState<IHeadToHead>({
        historyByTeam: {
            matchesPlayed: 0,
            firstTeamPairWins: 0,
            secTeamPairWins: 0,
            winRateFirstTeamPair: "",
            winRateSecTeamPair: ""
        }
    });

    const [playerSelected, setPlayerSelected] = useState({
        firstPlayer: "",
        secPlayer: "",
        thirdPlayer: "",
        fourthPlayer: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        firstPlayer: "",
        secPlayer: "",
        thirdPlayer: "",
        fourthPlayer: "",
    });

    const checkRequire = () => {
        if (!formData.firstPlayer ||
            !formData.secPlayer ||
            !formData.thirdPlayer ||
            !formData.fourthPlayer
        ) {
            return true;
        }
    }

    const getAvailablePlayers = (currentValue: string) => {
        const selectedValues = Object.values(formData).filter(Boolean); // tất cả player đã chọn
        return players.filter(
            (p) => !selectedValues.includes(p.name) || p.name === currentValue
        ).map((player) => {
            return {
                value: player.name,
                label: player.name
            }
        });
    }

    const handleSelect = (key: keyof typeof formData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const payload: IRequestHeadToHead = {
            firstTeam: [formData.firstPlayer, formData.secPlayer],
            secTeam: [formData.thirdPlayer, formData.fourthPlayer]
        }
        const result = await getPairRate(payload);
        if (result?.statusCode === E_STATUS_CODE.OK) {
            setHeadToHeadMatches(result.data);
            setPlayerSelected(formData)
            setIsLoading(false);
            toast.success("Completed");
        } else {
            toast.error("Failed");
        }
    }

    const [open, setOpen] = useState(false);

    return (
        <>
            <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                    <CardTitle className="text-2xl">Head to Head Comparison</CardTitle>
                    <CardDescription>
                        Compare performance between four players
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {/* first team */}
                        <div className={`${style.firstTeam} grid gap-4 items-end grid-cols-2 pb-5 mb-3`}>
                            {/* Player 1 */}
                            <div className="gird gap-2 flex flex-col">
                                <Label htmlFor="player1">Player 1</Label>
                                <Combobox
                                    data={getAvailablePlayers(formData.firstPlayer)}
                                    onOpenChange={setOpen}
                                    onValueChange={
                                        (val) => handleSelect("firstPlayer", val)
                                    }

                                    type="player"
                                    value={formData.firstPlayer}
                                >
                                    <ComboboxTrigger className="w-full sm:w-[300px]" />
                                    <ComboboxContent>
                                        <ComboboxInput />
                                        <ComboboxEmpty />
                                        <ComboboxList>
                                            <ComboboxGroup>
                                                {getAvailablePlayers(formData.firstPlayer).map((player) => (
                                                    <ComboboxItem key={player.value} value={player.value}>
                                                        {player.label}
                                                    </ComboboxItem>
                                                ))}
                                            </ComboboxGroup>
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>

                            <div className="gird gap-2 flex flex-col">
                                <Label htmlFor="player2">Player 2</Label>
                                <Combobox
                                    data={getAvailablePlayers(formData.secPlayer)}
                                    onOpenChange={setOpen}
                                    onValueChange={
                                        (val) => handleSelect("secPlayer", val)
                                    }

                                    type="player"
                                    value={formData.secPlayer}
                                >
                                    <ComboboxTrigger className="w-full sm:w-[300px]" />
                                    <ComboboxContent>
                                        <ComboboxInput />
                                        <ComboboxEmpty />
                                        <ComboboxList>
                                            <ComboboxGroup>
                                                {getAvailablePlayers(formData.secPlayer).map((player) => (
                                                    <ComboboxItem key={player.value} value={player.value}>
                                                        {player.label}
                                                    </ComboboxItem>
                                                ))}
                                            </ComboboxGroup>
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                        </div>
                        {/* second team */}
                        <div className={`${style.secTeam} grid gap-4 items-end grid-cols-2 pb-5 mb-5`}>
                            {/* Player 3 */}
                            <div className="gird gap-2 flex flex-col">
                                <Label htmlFor="player1">Player 3</Label>
                                <Combobox
                                    data={getAvailablePlayers(formData.thirdPlayer)}
                                    onOpenChange={setOpen}
                                    onValueChange={
                                        (val) => handleSelect("thirdPlayer", val)
                                    }

                                    type="player"
                                    value={formData.thirdPlayer}
                                >
                                    <ComboboxTrigger className="w-full sm:w-[300px]" />
                                    <ComboboxContent>
                                        <ComboboxInput />
                                        <ComboboxEmpty />
                                        <ComboboxList>
                                            <ComboboxGroup>
                                                {getAvailablePlayers(formData.thirdPlayer).map((player) => (
                                                    <ComboboxItem key={player.value} value={player.value}>
                                                        {player.label}
                                                    </ComboboxItem>
                                                ))}
                                            </ComboboxGroup>
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                            {/* Player 4 */}
                            <div className="gird gap-2 flex flex-col">
                                <Label htmlFor="player2">Player 4</Label>
                                <Combobox
                                    data={getAvailablePlayers(formData.fourthPlayer)}
                                    onOpenChange={setOpen}
                                    onValueChange={
                                        (val) => handleSelect("fourthPlayer", val)
                                    }

                                    type="player"
                                    value={formData.fourthPlayer}
                                >
                                    <ComboboxTrigger className="w-full sm:w-[300px]" />
                                    <ComboboxContent>
                                        <ComboboxInput />
                                        <ComboboxEmpty />
                                        <ComboboxList>
                                            <ComboboxGroup>
                                                {getAvailablePlayers(formData.fourthPlayer).map((player) => (
                                                    <ComboboxItem key={player.value} value={player.value}>
                                                        {player.label}
                                                    </ComboboxItem>
                                                ))}
                                            </ComboboxGroup>
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                disabled={checkRequire()}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                            >
                                {isLoading ? <Spinner /> : "Search"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {
                isLoading ? <Spinner /> :
                    <Card className="bg-white shadow-lg border-0">
                        {headToHeadMatches.historyByTeam.matchesPlayed === 0 ?
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">No results</CardTitle>
                            </CardHeader> :
                            <CardContent>
                                <div className="flex">
                                    <div className={`flex flex-col pb-5 flex-1 justify-around`}>
                                        <div className={`py-4 flex items-center`}>
                                            <Avatar className="size-16 mr-5">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div className="">
                                                <Label className="text-2xl"> {playerSelected.firstPlayer}</Label>
                                            </div>
                                        </div>

                                        <div className={`${style.playerInfo} py-4 flex items-center`}>
                                            <Avatar className="size-16 mr-5">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div className="">
                                                <Label className="text-2xl"> {playerSelected.secPlayer}</Label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`flex flex-col content pb-5 flex-1 justify-around `}>
                                        <div className={`py-4 flex items-center flex-row-reverse`}>
                                            <Avatar className="size-16 ml-5">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <Label className="text-2xl"> {playerSelected.thirdPlayer}</Label>
                                            </div>
                                        </div>

                                        <div className={`${style.playerInfo} py-4 flex items-center flex-row-reverse`}>
                                            <Avatar className="size-16 ml-5">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <Label className="text-2xl"> {playerSelected.fourthPlayer}</Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`content`}>
                                    <div className={`text-center py-3 ${style.matchesPlayerTitle} `}>
                                        <Label className={`${style.textGray} px-5 font-mono text-xl font-semibold`}>Matches PLayed</Label>
                                        <p className={`m-auto text-center ${style.matchesTitle} flex justify-center item-center`}>{headToHeadMatches.historyByTeam.matchesPlayed}</p>
                                    </div>
                                    <div className={`${style.titleMatches} py-3 text-center flex justify-evenly`}>
                                        <p className={`text-xl font-semibold ${headToHeadMatches.historyByTeam.firstTeamPairWins > headToHeadMatches.historyByTeam.secTeamPairWins ? style.textGreen : style.textRed}`}>{headToHeadMatches.historyByTeam.firstTeamPairWins}</p>
                                        <Label className={`${style.textGray} px-5 font-mono text-xl font-semibold`}>Win</Label>
                                        <p className={`text-xl font-semibold ${headToHeadMatches.historyByTeam.firstTeamPairWins < headToHeadMatches.historyByTeam.secTeamPairWins ? style.textGreen : style.textRed}`}>{headToHeadMatches.historyByTeam.secTeamPairWins}</p>
                                    </div>

                                    <div className={`${style.titleMatches} py-3 text-center flex justify-evenly`}>
                                        <p className={`${headToHeadMatches.historyByTeam.winRateFirstTeamPair > headToHeadMatches.historyByTeam.winRateSecTeamPair ? style.textGreen : style.textRed} text-xl font-semibold`} >{`${headToHeadMatches.historyByTeam.winRateFirstTeamPair}%`}</p>
                                        <Label className={`${style.textGray} px-5 font-mono text-xl font-semibold`}>Win Rate</Label>
                                        <p className={`${headToHeadMatches.historyByTeam.winRateFirstTeamPair < headToHeadMatches.historyByTeam.winRateSecTeamPair ? style.textGreen : style.textRed} text-xl font-semibold`} >{`${headToHeadMatches.historyByTeam.winRateSecTeamPair}%`}</p>
                                    </div>

                                </div>

                            </CardContent>
                        }
                    </Card>
            }
        </>

    )
}