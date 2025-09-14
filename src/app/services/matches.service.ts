import { MatchesDto } from "../dtos/matchDto";
import { IHeadToHead, IMatch } from "../models/match.model";
import { IRequestHeadToHead, IRequestMatch } from "../models/request.model";
import { MatchResponse } from "../models/response.model";

export async function getAll(payload: IRequestMatch): Promise<MatchesDto[]> {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/history`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!result.ok) {
            throw new Error(`API call failed with status: ${result.status}`);
        }
        const responseData = await result.json();

        return responseData.data.data.map((match: IMatch) => ({
            id: match._id,
            firstPlayer: match.firstPlayer,
            secPlayer: match.secPlayer,
            thirdPlayer: match.thirdPlayer,
            fourthPlayer: match.fourthPlayer,
            firstScore: match.firstScore,
            secScore: match.secScore,
            winner: match.winner,
            matchDay: new Date(match.matchDay ?? new Date())
        }) as MatchesDto);
    } catch (error) {
        console.error("Error fetching matches:", error);
        return {} as MatchesDto[];
    }
}

export async function createMatch(payload: IMatch) {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        if (!result.ok) {
            throw new Error("Failed to create match");
        }

        return await result.json();
    } catch (error) {
        console.error("Failed to create match:", error);
    }
}

export async function getPairRate(payload: IRequestHeadToHead): Promise<MatchResponse<IHeadToHead>> {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/pair-win-rate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        if (!result.ok) {
            throw new Error("Failed to get win pair");
        }

        return await result.json();
    } catch (error) {
        console.error("Failed to get win pair:", error);
        return {} as MatchResponse<IHeadToHead>;
    }
}