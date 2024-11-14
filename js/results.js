class MatchData {
    constructor(teamNumber) {
        this.teamNumber = teamNumber;
    }

    async fetchTeamData() {
        try {
            const response = await fetch("/data/match-results.json");
            if (!response.ok) {
                throw new Error("Failed to fetch match data");
            }
            const data = await response.json();
            return this.parseMatchData(data);
        } catch (error) {
            console.error("Error fetching team data:", error);
            throw error;
        }
    }

    parseMatchData(data) {
        // Get the first team's data to determine total teams
        const totalTeams = data.rankings.length;

        // Find our team's data
        const ourTeam = data.rankings.find(
            (team) => team.teamNumber.toString() === this.teamNumber
        );

        // Extract event info from filename pattern "Coral_2024-11-09"
        const eventInfo = {
            name: "Coral_2024-11-09", // This should ideally come from your data
            date: "November 9, 2024", // This should ideally come from your data
            location: "Lakewood Elementary, Norwalk, IA, USA", // This should ideally come from your data
            ranking: `${ourTeam?.rank} place (quals)`,
            record: `${ourTeam?.wins}-${ourTeam?.losses}-${ourTeam?.ties}`,
            stats: {
                rp: "1.33", // These stats should come from your data
                npOPR: "13.96", // if available
                npAVG: "46.33",
            },
        };

        // Format rankings
        const rankings = data.rankings.map((team) => ({
            rank: team.rank,
            team: `${team.teamNumber} ${team.teamName}`,
            teamNumber: team.teamNumber,
            teamName: team.teamName,
            record: `${team.wins}-${team.losses}-${team.ties}`,
            matches: team.matchesPlayed,
            wins: team.wins,
            autoScore: team.sortOrder1.toFixed(1),
            driverScore: team.sortOrder2.toFixed(1),
            endScore: team.sortOrder3.toFixed(1),
            totalPoints: team.sortOrder4.toFixed(0),
            highlight: team.teamNumber === this.teamNumber.toString(),
        }));

        return { eventInfo, rankings };
    }
}

// Update rendering functions
function renderMatches(rankings) {
    const tbody = document.getElementById("matchResults");
    tbody.innerHTML = rankings
        .map((team) => {
            return `
            <tr>
                <td>${team.rank}</td>
                <td class="${team.highlight ? "darkblue" : ""}">${
                team.team
            }</td>
                <td>${team.record}</td>
                <td>${team.matches}</td>
                <td>
                    <div class="stats-cell">
                        <span class="stats-value">${team.autoScore}</span>
                        <span class="stats-label">Auto</span>
                    </div>
                </td>
                <td>
                    <div class="stats-cell">
                        <span class="stats-value">${team.driverScore}</span>
                        <span class="stats-label">Driver</span>
                    </div>
                </td>
                <td>
                    <div class="stats-cell">
                        <span class="stats-value">${team.endScore}</span>
                        <span class="stats-label">End</span>
                    </div>
                </td>
                <td>
                    <div class="stats-cell">
                        <span class="stats-value">${team.totalPoints}</span>
                        <span class="stats-label">Total</span>
                    </div>
                </td>
            </tr>
        `;
        })
        .join("");
}

// Add rendering function for the header
function renderHeader(eventInfo) {
    const header = document.getElementById("header");
    header.innerHTML = `
        <h2>${eventInfo.name}</h2>
        <p><i class="fa-solid fa-calendar-days"></i>${eventInfo.date}</p>
        <p><i class="fa-solid fa-location-dot"></i>${eventInfo.location}</p>
        <p><strong><i class="fa-solid fa-trophy"></i>${eventInfo.ranking}</strong></p>
        <p><i class="fa-solid fa-chart-simple"></i>Record: ${eventInfo.record}</p>
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-value">${eventInfo.stats.rp}</span>
                <span class="stat-label">Ranking Points</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${eventInfo.stats.npOPR}</span>
                <span class="stat-label">Normalized OPR</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${eventInfo.stats.npAVG}</span>
                <span class="stat-label">Normalized Avg</span>
            </div>
        </div>
    `;
}

// Add sorting and filtering functionality
let currentRankings = [];

function setupEventListeners() {
    // Search functionality
    document.getElementById("searchBox").addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = currentRankings.filter(
            (team) =>
                team.teamNumber.toString().includes(searchTerm) ||
                team.teamName.toLowerCase().includes(searchTerm)
        );
        renderMatches(filtered);
    });

    // Sorting functionality
    document.querySelectorAll(".sort-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const sortType = e.target.dataset.sort;
            document
                .querySelectorAll(".sort-button")
                .forEach((btn) => btn.classList.remove("active"));
            e.target.classList.add("active");

            const sorted = [...currentRankings].sort((a, b) => {
                switch (sortType) {
                    case "rank":
                        return a.rank - b.rank;
                    case "wins":
                        return b.wins - a.wins;
                    case "score":
                        return b.totalPoints - a.totalPoints;
                    default:
                        return 0;
                }
            });
            renderMatches(sorted);
        });
    });
}

// Initialize and load data
async function initializeResults() {
    const container = document.querySelector(".container");
    container.innerHTML += '<div class="loading">Loading match data...</div>';

    try {
        const matchData = new MatchData("24358");
        const { eventInfo, rankings } = await matchData.fetchTeamData();
        container.querySelector(".loading").remove();
        currentRankings = rankings;
        renderHeader(eventInfo);
        renderMatches(rankings);
        setupEventListeners();
    } catch (error) {
        console.error("Error initializing results:", error);
        container.innerHTML = `
            <div class="error">
                <p>Error loading match data. Please try again later.</p>
                <p class="error-details">${error.message}</p>
            </div>
        `;
    }
}

// Call initialize function when the page loads
document.addEventListener("DOMContentLoaded", initializeResults);
