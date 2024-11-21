const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

async function updateMatchData() {
    const API_KEY = process.env.FTC_API_KEY;
    const TEAM_NUMBER = "24358";
    const SEASON = "2024";
    const LEAGUE = "USIA";
    const REGION = "COR";

    try {
        const headers = {
            Authorization: `Basic ${API_KEY}`,
            Accept: "application/json",
        };

        const response = await fetch(
            `https://ftc-api.firstinspires.org/v2.0/${SEASON}/leagues/rankings/${LEAGUE}/${REGION}`,
            { headers }
        );

        if (!response.ok) {
            console.error(`Failed to fetch data: HTTP ${response.status}`);
            console.error("Response headers:", response.headers);
            const errorBody = await response.text();
            console.error("Response body:", errorBody);
            throw new Error(
                `HTTP error! status: ${response.status}, body: ${errorBody}`
            );
        }

        const data = await response.json();

        // Find our team's data
        const teamData = data.rankings.find(
            (team) => team.teamNumber.toString() === TEAM_NUMBER
        );
        if (!teamData) {
            throw new Error("Team not found in rankings");
        }

        // Format the data
        const formattedData = {
            eventName: "Iowa League Rankings",
            startDate: "2024-09-01", // Start of the season
            venue: "Central Iowa League",
            rank: teamData.rank,
            totalTeams: data.rankings.length,
            wins: teamData.wins,
            losses: teamData.losses,
            ties: teamData.ties,
            rankings: data.rankings.map((team) => ({
                rank: team.rank,
                teamNumber: team.teamNumber.toString(),
                teamName: team.teamName,
                record: `${team.wins}-${team.losses}-${team.ties}`,
                matchesPlayed: team.matchesPlayed,
                autoScore: team.sortOrder1,
                driverScore: team.sortOrder2,
                endScore: team.sortOrder3,
                totalPoints: team.sortOrder4,
            })),
        };

        // Ensure data directory exists
        const dataDir = path.join(process.cwd(), "data");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }

        // Write to JSON file
        fs.writeFileSync(
            path.join(dataDir, "match-results.json"),
            JSON.stringify(formattedData, null, 2)
        );

        console.log("Successfully updated match data");
    } catch (error) {
        console.error("Error updating match data:", error);
        process.exit(1);
    }
}

updateMatchData();
