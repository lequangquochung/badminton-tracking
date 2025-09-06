import { E_WINNER } from "@/app/utils/utils";

export function isWinner(team1: number, team2: number): E_WINNER {
    // max point là 30 → ai đạt trước là thắng
    if (team1 === 30) return E_WINNER.FIRST_TEAM;
    if (team2 === 30) return E_WINNER.SEC_TEAM;

    // nếu >=21 và hơn 2 điểm → thắng
    if (team1 >= 21 || team2 >= 21) {
        return team1 > team2 ? E_WINNER.FIRST_TEAM : E_WINNER.SEC_TEAM;
    }

    return team1 > team2 ? E_WINNER.FIRST_TEAM : E_WINNER.SEC_TEAM;
}