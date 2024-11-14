class MatchData {
    constructor(teamNumber) {
        this.teamNumber = teamNumber;
    }

    async fetchTeamData() {
        try {
            const response = await fetch("/data/match-results.json");
            if (!response.ok) throw new Error("Failed to fetch team data");
            return await response.json();
        } catch (error) {
            console.error("Error fetching team data:", error);
            return null;
        }
    }

    parseMatchData(data) {
        // Extract event info
        const eventInfo = {
            name: data.eventName,
            date: new Date(data.startDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }),
            location: data.venue,
            ranking: `${data.rank} of ${data.totalTeams}`,
            record: `${data.wins}-${data.losses}-${data.ties}`,
        };

        // Extract and format matches
        const matches = data.matches.map((match) => ({
            match: `Q-${match.matchNumber}`,
            score: `${match.redScore} - ${match.blueScore}`,
            red: [
                `${match.red1} ${match.red1Name || ""}`,
                `${match.red2} ${match.red2Name || ""}`,
            ],
            blue: [
                `${match.blue1} ${match.blue1Name || ""}`,
                `${match.blue2} ${match.blue2Name || ""}`,
            ],
            highlight: this.teamNumber.toString(),
        }));

        return { eventInfo, matches };
    }
}

// Initialize and load data
const matchDisplay = new MatchData("24358");

async function initializeDisplay() {
    const data = await matchDisplay.fetchTeamData();
    if (data) {
        const parsedData = matchDisplay.parseMatchData(data);
        renderHeader(parsedData.eventInfo);
        renderMatches(parsedData.matches);
    } else {
        displayError();
    }
}

function renderHeader(eventInfo) {
    const header = document.getElementById("header");
    header.innerHTML = `
        <h2>${eventInfo.name}</h2>
        <p><i class="fa-solid fa-calendar-days"></i>&nbsp;&nbsp;${eventInfo.date}</p>
        <p><i class="fa-solid fa-location-dot"></i>&nbsp;&nbsp;${eventInfo.location}</p>
        <p><strong><i class="fa-solid fa-trophy"></i>&nbsp;${eventInfo.ranking}</strong></p>
        <p>W-L-T: ${eventInfo.record}</p>
    `;
}

function renderMatches(matches) {
    const tbody = document.getElementById("matchResults");
    tbody.innerHTML = matches
        .map((match) => {
            return `
            <tr>
                <td>${match.match}</td>
                <td>${match.score}</td>
                ${match.red
                    .map(
                        (team) => `
                    <td class="${
                        team.includes(match.highlight) ? "darkred" : "lightred"
                    }">${team}</td>
                `
                    )
                    .join("")}
                ${match.blue
                    .map(
                        (team) => `
                    <td class="${
                        team.includes(match.highlight)
                            ? "darkblue"
                            : "lightblue"
                    }">${team}</td>
                `
                    )
                    .join("")}
            </tr>
        `;
        })
        .join("");
}

function displayError() {
    const container = document.querySelector(".container");
    container.innerHTML = `
        <div class="error">
            <h2>Unable to load match data</h2>
            <p>Please try refreshing the page.</p>
        </div>
    `;
}

// Initialize when the page loads
document.addEventListener("DOMContentLoaded", initializeDisplay);
