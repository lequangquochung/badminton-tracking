"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import MatchHistory from '../match-history/match-history';
import Players from '../players/players';
import HeadToHead from '../head-to-head/head-to-head';
import { IMatch } from '../models/match.model';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { setDate } from 'date-fns';
import { format } from "date-fns";
import { Plus, Trophy, Users } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

export default function Dashboard() {

  // init
  const [activeTab, setActiveTab] = useState("history");
  // get total match
  const [totalMatch, setTotalMatch] = useState<number>();
  const [date, setDate] = useState<Date>()
  // create match
  const [formData, setFormData] = useState<IMatch>({
    firstPlayer: "",
    secPlayer: "",
    thirdPlayer: "",
    fourthPlayer: "",
    firstScore: 0,
    secScore: 0,
    matchDay: new Date(),
    winner: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "firstScore" || name === "secScore"
          ? Number(value)
          : value,
    })
    );
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // maxlength 2 only number
    if (/^\d{0,2}$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    }
  };


  // submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("formData:", formData.get("winner"));
  };

  // const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer1, setSelectedPlayer1] = useState('');
  const [selectedPlayer2, setSelectedPlayer2] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleDataFromChild = (data: number) => {
    console.log("Data từ Child:", data);
    setTotalMatch(data);
  };

  const [playerCount, setPlayerCount] = useState(0);
  const getCountPlayer = (countPlayer: number) => {
    setPlayerCount(countPlayer);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Match Tracker</h1>
              <p className="text-slate-600 text-lg">Track matches, analyze performance, and compare players</p>
            </div>
            {/* create new match */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="mr-2 h-5 w-5" />
                  New Match
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Create New Match</DialogTitle>
                  <DialogDescription>
                    Add a new match between two players. Fill in the details below.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} >
                  <p className="pt-4">Team 1</p>
                  <hr />
                  <div className="grid gap-4 grid-cols-2 pt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="player1">Player 1</Label>
                      <Select value={formData.firstPlayer} onValueChange={(val) =>
                        setFormData((prev) => ({ ...prev, firstPlayer: val }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select player 1" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* {players.map(player => (
                          <SelectItem key={player.id} value={player.name}>{player.name}</SelectItem>
                        ))} */}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="player1">Player 2</Label>
                      <Select value={formData.secPlayer} onValueChange={(val) => {
                        setFormData((prev) => ({ ...prev, secPlayer: val }))
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select player 2" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* {players.map(player => (
                          <SelectItem key={player.id} value={player.name}>{player.name}</SelectItem>
                        ))} */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="pt-4">Team 2</p>
                  <hr />
                  <div className="grid gap-4 pt-4 grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="player2">Player 3</Label>
                      <Select value={formData.thirdPlayer} onValueChange={(val) => {
                        setFormData((prev) => ({ ...prev, thirdPlayer: val }))
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select player 2" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* {players.filter(p => p.name !== newMatch.player1).map(player => (
                          <SelectItem key={player.id} value={player.name}>{player.name}</SelectItem>
                        ))} */}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="player2">Player 4</Label>
                      <Select value={formData.fourthPlayer} onValueChange={(val) => {
                        setFormData((prev) => ({ ...prev, fourthPlayer: val }))
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select player 2" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* {players.filter(p => p.name !== newMatch.player1).map(player => (
                          <SelectItem key={player.id} value={player.name}>{player.name}</SelectItem>
                        ))} */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 py-4 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="score1">Score 1</Label>
                      <Input
                        id="firstScore"
                        type="number"
                        name="firstScore"
                        value={formData.firstScore}
                        onChange={handleNumberChange}
                        min={0}
                        max={99}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="score2">Score 2</Label>
                      <Input
                        id="score2"
                        type="number"
                        name="secScore"
                        value={formData.secScore}
                        onChange={handleNumberChange}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {formData.matchDay ? (
                            format(formData.matchDay, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Calendar
                          mode="single"
                          selected={formData.matchDay}
                          onSelect={(date) =>
                            setFormData((prev) => ({ ...prev, matchDate: date }))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <Input
                      id="date"
                      type="date"
                      value={formData.matchDay}
                      onChange={handleChange}
                    /> */}
                  </div>
                  <Button
                    // onClick={handleCreateMatch}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"

                  >
                    Create Match
                  </Button>
                </form>

              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Matches</CardTitle>
              <Trophy className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{totalMatch}</div>
              <p className="text-xs text-slate-500">All time matches</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Players</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{playerCount}</div>
              <p className="text-xs text-slate-500">Active players</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="matches" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg border-0 rounded-lg p-1">
            {/* Match History */}
            <TabsTrigger value="matches" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md transition-all">
              Match History
            </TabsTrigger>
            {/* Players */}
            <TabsTrigger value="players" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md transition-all">
              Players
            </TabsTrigger>
            {/* Head to Head */}
            <TabsTrigger value="head-to-head" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md transition-all">
              Head to Head
            </TabsTrigger>
          </TabsList>

          <TabsContent value={"matches"} className="space-y-6">
            <MatchHistory onSendTotalMatch={handleDataFromChild} onSendPlayerCount={getCountPlayer} activeTab={"history"} />
          </TabsContent>

          <TabsContent value={"players"} className="space-y-6">
            <Players activeTab={"players"}></Players>
          </TabsContent>

          <TabsContent value="head-to-head" className="space-y-6">
            <HeadToHead activeTab={"headToHead"}></HeadToHead>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}