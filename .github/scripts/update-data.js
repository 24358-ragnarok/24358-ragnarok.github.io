const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

async function updateMatchData() {
    const API_KEY = process.env.FTC_API_KEY;
    const TEAM_NUMBER = "24358";
    const SEASON = "2024";

    try {
        const headers = {
            Authorization: `Basic ${Buffer.from(`:${API_KEY}`).toString(
                "base64"
            )}`,
            Accept: "application/json",
        };

        const response = await fetch(
            `https://ftc-api.firstinspires.org/v2.0/${SEASON}/teams/${TEAM_NUMBER}/events`,
            { headers }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Process the data into our desired format
        const latestEvent = data.events[data.events.length - 1];

        // Get match details for the latest event
        const matchesResponse = await fetch(
            `https://ftc-api.firstinspires.org/v2.0/${SEASON}/events/${latestEvent.code}/matches`,
            { headers }
        );

        const matchesData = await matchesResponse.json();

        // Format the data
        const formattedData = {
            eventName: latestEvent.name,
            startDate: latestEvent.startDate,
            venue: latestEvent.venue,
            rank: latestEvent.teamRank || 0,
            totalTeams: latestEvent.teamCount || 0,
            wins: latestEvent.wins || 0,
            losses: latestEvent.losses || 0,
            ties: latestEvent.ties || 0,
            matches: matchesData.matches
                .filter((match) =>
                    match.teams.some(
                        (team) => team.teamNumber === parseInt(TEAM_NUMBER)
                    )
                )
                .map((match) => ({
                    matchNumber: match.matchNumber,
                    redScore: match.redScore,
                    blueScore: match.blueScore,
                    red1:
                        match.teams
                            .find((t) => t.station === "Red1")
                            ?.teamNumber.toString() || "",
                    red1Name:
                        match.teams.find((t) => t.station === "Red1")
                            ?.teamName || "",
                    red2:
                        match.teams
                            .find((t) => t.station === "Red2")
                            ?.teamNumber.toString() || "",
                    red2Name:
                        match.teams.find((t) => t.station === "Red2")
                            ?.teamName || "",
                    blue1:
                        match.teams
                            .find((t) => t.station === "Blue1")
                            ?.teamNumber.toString() || "",
                    blue1Name:
                        match.teams.find((t) => t.station === "Blue1")
                            ?.teamName || "",
                    blue2:
                        match.teams
                            .find((t) => t.station === "Blue2")
                            ?.teamNumber.toString() || "",
                    blue2Name:
                        match.teams.find((t) => t.station === "Blue2")
                            ?.teamName || "",
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
