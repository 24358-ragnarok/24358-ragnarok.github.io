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
        const totalTeams = data.rankings.length;
        const ourTeam = data.rankings.find(
            (team) => team.teamNumber.toString() === this.teamNumber
        );

        // Update event info with actual data from the API response
        const eventInfo = {
            name: data.eventName || "Iowa League Rankings",
            date: data.startDate || "2024",
            location: data.venue || "Central Iowa League",
            ranking: ourTeam
                ? `${ourTeam.rank} of ${totalTeams}`
                : "Not ranked",
            record: ourTeam
                ? `${ourTeam.wins}-${ourTeam.losses}-${ourTeam.ties}`
                : "0-0-0",
            stats: {
                // Update stats to match what the values actually represent
                rp: ourTeam ? (ourTeam.sortOrder1 || 0).toFixed(2) : "0.00", // Auto Score
                npOPR: ourTeam ? (ourTeam.sortOrder2 || 0).toFixed(2) : "0.00", // Driver Score
                npAVG: ourTeam ? (ourTeam.sortOrder4 || 0).toFixed(0) : "0", // Total Points
            },
        };

        // Update rankings to match actual field names
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
            highlight: team.teamNumber.toString() === this.teamNumber,
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
        <div class="event-title">
            <h2>${eventInfo.name}</h2>
            <div class="event-meta">
                <p><i class="fa-solid fa-calendar-days"></i>${eventInfo.date}</p>
                <p><i class="fa-solid fa-location-dot"></i>${eventInfo.location}</p>
            </div>
        </div>
        
        <div class="team-status">
            <div class="ranking-badge">
                <i class="fa-solid fa-trophy"></i>
                <div class="ranking-details">
                    <span class="rank-label">Current Ranking</span>
                    <span class="rank-value">${eventInfo.ranking}</span>
                </div>
            </div>
            
            <div class="record-badge">
                <i class="fa-solid fa-chart-simple"></i>
                <div class="record-details">
                    <span class="record-label">Team Record</span>
                    <span class="record-value">${eventInfo.record}</span>
                </div>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-value">${eventInfo.stats.rp}</span>
                <span class="stat-label">Ranking Points</span>
                <span class="stat-help">Points earned from match performance</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${eventInfo.stats.npOPR}</span>
                <span class="stat-label">Offensive Power Rating</span>
                <span class="stat-help">Team's scoring capability</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${eventInfo.stats.npAVG}</span>
                <span class="stat-label">Average Score</span>
                <span class="stat-help">Average points per match</span>
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
