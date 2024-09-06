const sessions = JSON.parse(localStorage.getItem('sessions')) || []; // Haal opgeslagen sessies op uit LocalStorage, of initialiseer een lege array

function updateCountdown() {
    const now = new Date();
    const currentOrNextSession = sessions.find(session => {
        const startTime = new Date(`${session.date}T${session.starttime}:00`);
        const endTime = new Date(`${session.date}T${session.endtime}:00`);
        return endTime > now;
    });

    if (currentOrNextSession) {
        const startTime = new Date(`${currentOrNextSession.date}T${currentOrNextSession.starttime}:00`);
        const endTime = new Date(`${currentOrNextSession.date}T${currentOrNextSession.endtime}:00`);

        let countdownText = '';
        let timeDiff;

        if (now < startTime) {
            timeDiff = startTime - now;
            document.getElementById('next-session').innerText = `Next session: ${currentOrNextSession.session}`;
            document.getElementById('second-countdown').style.display = 'none'; // Verberg tweede countdown
        } else if (now >= startTime && now < endTime) {
            timeDiff = endTime - now;
            document.getElementById('next-session').innerText = `Session in progress: ${currentOrNextSession.session}`;

            // Tweede countdown voor de volgende sessie na de huidige
            const nextSessionIndex = sessions.findIndex(session => {
                const endTime = new Date(`${session.date}T${session.endtime}:00`);
                return endTime > now;
            }) + 1;

            if (nextSessionIndex < sessions.length) {
                const nextSession = sessions[nextSessionIndex];
                const nextStartTime = new Date(`${nextSession.date}T${nextSession.starttime}:00`);
                const nextTimeDiff = nextStartTime - now;

                const nextHours = Math.floor((nextTimeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const nextMinutes = Math.floor((nextTimeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const nextSeconds = Math.floor((nextTimeDiff % (1000 * 60)) / 1000);

                const nextCountdownText = `${nextHours}h ${nextMinutes}m ${nextSeconds}s`;
                document.getElementById('second-countdown-text').innerText = nextCountdownText;
                document.getElementById('second-next-session').innerText = `Next session: ${nextSession.session}`;
                document.getElementById('second-countdown').style.display = 'block'; // Toon tweede countdown
            } else {
                document.getElementById('second-countdown-text').innerText = '00h 00m 00s';
                document.getElementById('second-next-session').innerText = 'No further sessions';
                document.getElementById('second-countdown').style.display = 'none'; // Verberg tweede countdown
            }
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        countdownText = `${hours}h ${minutes}m ${seconds}s`;
        document.getElementById('countdown-text').innerText = countdownText;
    } else {
        // Als er geen sessie is, verberg beide countdowns
        document.getElementById('countdown-text').innerText = '00h 00m 00s';
        document.getElementById('next-session').innerText = 'No sessions';
        document.getElementById('second-countdown').style.display = 'none';
    }
}

setInterval(updateCountdown, 1000);
populateTable();


function populateTable() {
    const now = new Date();
    const tableBody = document.getElementById('sessions-table');
    let lastDate = '';

    // Sorteren op datum en tijd
    sessions.sort((a, b) => new Date(`${a.date}T${a.starttime}:00`) - new Date(`${b.date}T${b.starttime}:00`));

    // Leeg de tabel eerst
    tableBody.innerHTML = '';

    // Voor elke sessie weergeven in de tabel, ongeacht of de tijd al verstreken is
    sessions.forEach(session => {
        const startTime = new Date(`${session.date}T${session.starttime}:00`);
        const endTime = new Date(`${session.date}T${session.endtime}:00`);

        // Toon alle sessies (optioneel kun je hier de controle op toekomstige sessies terugzetten)
        if (true) {
            if (session.date !== lastDate) {
                const dateRow = document.createElement('tr');
                const dateCell = document.createElement('td');
                dateCell.setAttribute('colspan', '6');
                dateCell.classList.add('date-header');
                dateCell.innerText = session.date;
                dateRow.appendChild(dateCell);
                tableBody.appendChild(dateRow);
                lastDate = session.date;
            }

            const row = document.createElement('tr');
            Object.values(session).forEach(value => {
                const cell = document.createElement('td');
                cell.innerText = value;
                row.appendChild(cell);
            });

            const lengthCell = document.createElement('td');
            const length = new Date(endTime - startTime);
            const lengthString = `${length.getUTCHours()}:${length.getUTCMinutes().toString().padStart(2, '0')}`;
            lengthCell.innerText = lengthString;
            row.appendChild(lengthCell);

            const actionsCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => {
                row.remove();
                const index = sessions.findIndex(s => s.date === session.date && s.starttime === session.starttime && s.session === session.session);
                if (index > -1) {
                    sessions.splice(index, 1);
                    saveSessions(); // Opslaan van bijgewerkte sessies
                }
            };
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);

            tableBody.appendChild(row);
        }
    });
}


function showModal() {
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
}

const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
document.getElementById('date').value = formattedDate;

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

document.getElementById('open-modal-button').onclick = showModal;
document.getElementById('modal-close').onclick = closeModal;

document.getElementById('modal-form').onsubmit = function(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const starttime = document.getElementById('starttime').value;
    const endtime = document.getElementById('endtime').value;
    const session = document.getElementById('session').value;

    if (date && starttime && endtime && session) {
        sessions.push({ date, starttime, endtime, session });
        saveSessions(); // Sla nieuwe sessie op
        populateTable();
        closeModal();
    }
};

document.getElementById('open-file-button').onclick = function() {
    document.getElementById('file-input').click();
};

document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            const lines = contents.split('\n');
            const newSessions = lines.slice(1).map(line => {
                const [date, starttime, endtime, session] = line.split(',').map(cell => cell.trim());
                return { date, starttime, endtime, session };
            }).filter(session => session.date && session.starttime && session.endtime && session.session);

            sessions.push(...newSessions);
            saveSessions(); // Sla nieuwe sessies op
            populateTable();
        };
        reader.readAsText(file);
    }
});

function exportToCSV() {
    const csvRows = [];
    const headers = ['Date', 'Start Time', 'End Time', 'Session'];
    csvRows.push(headers.join(','));

    sessions.forEach(session => {
        const row = [
            session.date,
            session.starttime,
            session.endtime,
            session.session.replace(/"/g, '') // Haalt de aanhalingstekens uit de session-tekst
        ];
        csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'sessions.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function deleteAllSessions() {
    sessions.length = 0;
    saveSessions(); // Sla verwijdering op
    populateTable();
}

document.getElementById('export-csv-button').onclick = exportToCSV;
document.getElementById('delete-sessions-button').onclick = deleteAllSessions;

setInterval(updateCountdown, 1000);
populateTable();

// Functie om sessies op te slaan in LocalStorage
function saveSessions() {
    localStorage.setItem('sessions', JSON.stringify(sessions));
}
