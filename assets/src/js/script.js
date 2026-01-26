const statsConteiner = document.getElementById("statsConteinter");
const filterButtons = document.querySelectorAll('.profile__switchStats');
let statsData = [];

const timeframeLabels = {
    daily: 'Yesterday',
    weekly: 'Last Week',
    monthly: 'Last Month'
};

function renderStats(timeframe) {
    statsConteiner.innerHTML = "";
    
    statsData.forEach(stat => {
        const title = stat.title;
        const timeData = stat.timeframes[timeframe];
        const cardClass = title.toLowerCase().replace(' ', '-');

        const cardDiv = document.createElement("div");
        cardDiv.classList.add('stat-card', cardClass);

        cardDiv.innerHTML = `
          <div class="stat-card__content">
            <div class="stat-card__header">
              <span class="stat-card__title">${title}</span>
              <img src="assets/img/icon-ellipsis.svg" alt="ellipsis">
            </div>
            <div class="stat-card__body">
              <h2 class="stat-card__current">${timeData.current}hrs</h2>
              <p class="stat-card__previous">${timeframeLabels[timeframe]} - ${timeData.previous}hrs</p>
            </div>
          </div>
        `;
        
        statsConteiner.appendChild(cardDiv);
    });
}

async function initializeDashboard() {
    try {
        const response = await fetch('assets/src/json/data.json');
        statsData = await response.json();
        
        renderStats('weekly');
        document.getElementById('weekly').classList.add('active');
        
    } catch (error) {
        console.error("Failed to load data:", error);
        statsConteiner.innerText = "Error loading data.";
    }
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const newTimeframe = button.id;
        renderStats(newTimeframe);
    });
});

initializeDashboard();