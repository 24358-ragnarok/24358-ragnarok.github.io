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
        const totalTeams = data.totalTeams;
        const ourTeam = data.rankings.find(
            (team) => team.teamNumber.toString() === this.teamNumber
        );

        const eventInfo = {
            name: data.eventName,
            date: data.startDate,
            location: data.venue,
            ranking: ourTeam
                ? `${ourTeam.rank} of ${totalTeams}`
                : "Not ranked",
            record: ourTeam ? ourTeam.record : "0-0-0",
            stats: {
                // Updated to match actual data structure
                autoScore: ourTeam ? ourTeam.autoScore.toFixed(1) : "0.0",
                driverScore: ourTeam ? ourTeam.driverScore.toFixed(1) : "0.0",
                totalPoints: ourTeam ? ourTeam.totalPoints.toFixed(0) : "0",
            },
        };

        // Rankings mapping simplified since JSON structure matches needed fields
        const rankings = data.rankings.map((team) => ({
            ...team,
            team: `${team.teamNumber} ${team.teamName}`,
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
                <td class="${team.highlight ? "highlight" : ""}">${
                team.team
            }</td>
                <td>${team.record}</td>
                <td>${team.matchesPlayed}</td>
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
            <h3>${eventInfo.name}</h3>
            <p><i class="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;${eventInfo.date}</p>
            <p><i class="fa-solid fa-location-dot"></i>&nbsp;&nbsp;${eventInfo.location}</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-value">${eventInfo.ranking}</span>
                <span class="stat-label">Current Ranking</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${eventInfo.record}</span>
                <span class="stat-label">Win-Loss Record</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${eventInfo.stats.autoScore}</span>
                <span class="stat-label">Avg Auto Score</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${eventInfo.stats.driverScore}</span>
                <span class="stat-label">Avg TeleOp Score</span>
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

    // Updated sorting functionality
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
                    case "auto":
                        return b.autoScore - a.autoScore;
                    case "teleop":
                        return b.driverScore - a.driverScore;
                    case "total":
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
