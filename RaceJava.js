// Definieer de standaard sessies
const defaultSessions = [
    // Friday, 16 May 2025
    { date: '2025-05-16', starttime: '13:00', endtime: '18:00', session: 'Belcar Endurance Championship (scrutineering -> garages)' },
    { date: '2025-05-16', starttime: '13:00', endtime: '18:00', session: 'Belcar Historic Cup' },
    { date: '2025-05-16', starttime: '13:00', endtime: '18:00', session: 'Belcar Skylimit Sprint Cup (Administration - Loge Skylimit Events)' },
    { date: '2025-05-16', starttime: '13:00', endtime: '18:00', session: 'Mazda MX-5 Cup & Ford Fiesta Sprint Cup Benelux' },
    { date: '2025-05-16', starttime: '18:15', endtime: '19:15', session: 'TBC  Belcar Endurance Championship (team managers briefing)' },

    // Saturday, 17 May 2025
    { date: '2025-05-17', starttime: '08:00', endtime: '08:30', session: 'Belcar Endurance Championship Administration & Scrutineering' },
    { date: '2025-05-17', starttime: '08:30', endtime: '09:00', session: 'Belcar Skylimit Sprint Cup Administration' },
    { date: '2025-05-17', starttime: '08:00', endtime: '12:00', session: 'Belcar Historic Cup Administration & Scrutineering' },
    { date: '2025-05-17', starttime: '08:30', endtime: '09:00', session: 'Mazda MX-5 Cup & Ford Fiesta Sprint Cup Benelux Briefing' },
    { date: '2025-05-17', starttime: '09:10', endtime: '09:20', session: 'Belcar Endurance Championship Sign-On' },
    { date: '2025-05-17', starttime: '09:20', endtime: '09:30', session: 'Belcar Endurance Championship Briefing' },
    { date: '2025-05-17', starttime: '12:00', endtime: '12:30', session: 'Belcar Skylimit Sprint Cup Briefing' },
    { date: '2025-05-17', starttime: '13:00', endtime: '13:30', session: 'Belcar Historic Cup Briefing' },
    { date: '2025-05-17', starttime: '09:10', endtime: '09:30', session: 'Belcar Historic Cup Exercise FCY' },
    { date: '2025-05-17', starttime: '09:45', endtime: '10:15', session: 'Mazda MX-5 Cup & Ford Fiesta Sprint Cup Benelux Free Practice 1 (30 min)' },
    { date: '2025-05-17', starttime: '10:30', endtime: '11:15', session: 'Belcar Endurance Championship Pre-qualifying practice (45 min)' },
    { date: '2025-05-17', starttime: '11:25', endtime: '11:55', session: 'Mazda MX-5 Cup & Ford Fiesta Sprint Cup Benelux Free Practice 2 (30 min)' },
    { date: '2025-05-17', starttime: '13:10', endtime: '13:40', session: 'Belcar Skylimit Sprint Cup Qualifying 1 (30 min)' },
    { date: '2025-05-17', starttime: '13:50', endtime: '14:10', session: 'Mazda MX-5 Cup & Ford Fiesta Sprint Cup Benelux Qualifying (20 min)' },
    { date: '2025-05-17', starttime: '14:20', endtime: '15:05', session: 'Belcar Endurance Championship Qualifying (45 min)' },
    { date: '2025-05-17', starttime: '15:25', endtime: '15:55', session: 'Belcar Historic Cup Qualifying (30 min)' },
    { date: '2025-05-17', starttime: '16:05', endtime: '16:35', session: 'Belcar Skylimit Sprint Cup Qualifying 2 (30 min)' },
    { date: '2025-05-17', starttime: '16:50', endtime: '17:15', session: 'Mazda MX-5 Cup & Ford Fiesta Sprint Cup Benelux Race 1 (25 min)' },
    { date: '2025-05-17', starttime: '17:30', endtime: '17:50', session: 'Belcar Endurance Championship Group Picture (obligatory for all teams)' },

    // Sunday, 18 May 2025
    { date: '2025-05-18', starttime: '10:15', endtime: '10:40', session: 'Mazda MX-5 Cup & Ford Fiesta Sprint Cup Benelux Race 2 (25 min)' },
    { date: '2025-05-18', starttime: '10:55', endtime: '11:25', session: 'Belcar Historic Cup Race 1 (30 min)' },
    { date: '2025-05-18', starttime: '11:40', endtime: '12:10', session: 'Belcar Skylimit Sprint Cup Race 1 (30 min)' },
    { date: '2025-05-18', starttime: '12:25', endtime: '12:55', session: 'Belcar Endurance Championship Gridwalk (30 min)' },
    { date: '2025-05-18', starttime: '13:15', endtime: '15:20', session: 'Belcar Endurance Championship Race (125 min)' },
    { date: '2025-05-18', starttime: '15:35', endtime: '16:00', session: 'Mazda MX-5 Cup & Ford Fiesta Sprint Cup Benelux Race 3 (25 min)' },
    { date: '2025-05-18', starttime: '16:15', endtime: '16:45', session: 'Belcar Historic Cup Race 2 (30 min)' },
    { date: '2025-05-18', starttime: '17:00', endtime: '17:30', session: 'Belcar Skylimit Sprint Cup Race 2 (30 min)' },
];

// Haal opgeslagen sessies op uit localStorage
let savedSessions = JSON.parse(localStorage.getItem('sessions')) || [];

// Combineer standaard sessies met opgeslagen sessies
let sessions = [...defaultSessions];

// Voeg alleen unieke opgeslagen sessies toe
savedSessions.forEach(savedSession => {
    const isDuplicate = sessions.some(defaultSession =>
        defaultSession.date === savedSession.date &&
        defaultSession.starttime === savedSession.starttime &&
        defaultSession.endtime === savedSession.endtime &&
        defaultSession.session === savedSession.session
    );

    if (!isDuplicate) {
        sessions.push(savedSession);
    }
});

// Sorteer alle sessies op datum en tijd
sessions.sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.starttime}`);
    const dateTimeB = new Date(`${b.date}T${b.starttime}`);
    return dateTimeA - dateTimeB;
});

// Declareer lastChosenDate één keer
let lastChosenDate = localStorage.getItem('lastChosenDate') || '';

// Functie om sessies op te slaan (alleen de niet-standaard sessies)
function saveSessions() {
    const sessionsToSave = sessions.filter(session =>
        !defaultSessions.some(defaultSession =>
            defaultSession.date === session.date &&
            defaultSession.starttime === session.starttime &&
            defaultSession.endtime === session.endtime &&
            defaultSession.session === session.session
        )
    );

    localStorage.setItem('sessions', JSON.stringify(sessionsToSave));
}

// Haal opgeslagen sessies op uit LocalStorage, of initialiseer een lege array
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

        let timeDiff;

        if (now < startTime) {
            timeDiff = startTime - now;
            document.getElementById('next-session').innerText = `Next session: ${currentOrNextSession.session}`;
            document.getElementById('second-countdown').style.display = 'none';
        } else if (now >= startTime && now < endTime) {
            timeDiff = endTime - now;
            document.getElementById('next-session').innerText = `Session in progress: ${currentOrNextSession.session}`;

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
                document.getElementById('second-countdown').style.display = 'block';
            } else {
                document.getElementById('second-countdown-text').innerText = '00h 00m 00s';
                document.getElementById('second-next-session').innerText = 'No further sessions';
                document.getElementById('second-countdown').style.display = 'none';
            }
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        let countdownText = days > 0 ? `${days}d ${hours}h ${minutes}m ${seconds}s` : `${hours}h ${minutes}m ${seconds}s`;
        document.getElementById('countdown-text').innerText = countdownText;
    } else {
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

    // Filter de sessies om alleen de sessies die nog niet afgelopen zijn weer te geven
    const upcomingSessions = sessions.filter(session => {
        const endTime = new Date(`${session.date}T${session.endtime}:00`);
        return endTime > now;
    });

    // Als er geen komende sessies zijn, geef een melding weer in de tabel
    if (upcomingSessions.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No upcoming sessions</td></tr>';
        return;
    }

    // Sorteren op datum en tijd
    upcomingSessions.sort((a, b) => new Date(`${a.date}T${a.starttime}:00`) - new Date(`${b.date}T${b.starttime}:00`));

    // Leeg de tabel eerst
    tableBody.innerHTML = '';

    // Toon de gefilterde sessies
    upcomingSessions.forEach((session, index) => {
        const startTime = new Date(`${session.date}T${session.starttime}:00`);
        const endTime = new Date(`${session.date}T${session.endtime}:00`);

        if (session.date !== lastDate) {
            const dateRow = document.createElement('tr');
            const dateCell = document.createElement('td');
            dateCell.setAttribute('colspan', '5'); // Verander de colspan naar 5, want de datum wordt niet getoond
            dateCell.classList.add('date-header');
            dateCell.innerText = session.date;
            dateRow.appendChild(dateCell);
            tableBody.appendChild(dateRow);
            lastDate = session.date;
        }

        const row = document.createElement('tr');

        // Sla de datumkolom over door alleen starttime, endtime en session toe te voegen
        ['starttime', 'endtime', 'session'].forEach(key => {
            const cell = document.createElement('td');
            cell.innerText = session[key];
            row.appendChild(cell);
        });

        // Lengte van de sessie berekenen
        const lengthCell = document.createElement('td');
        const length = new Date(endTime - startTime);
        const lengthString = `${length.getUTCHours()}:${length.getUTCMinutes().toString().padStart(2, '0')}`;
        lengthCell.innerText = lengthString;
        row.appendChild(lengthCell);

        // Actieknoppen toevoegen
        const actionsCell = document.createElement('td');
        actionsCell.style.display = 'flex';
        actionsCell.style.gap = '10px';

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.innerText = 'Edit';
        editButton.onclick = () => {
            showEditModal(session, index);
        };
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => {
            showDeleteConfirmModal(session, row);
        };
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
}

setInterval(() => {
    updateCountdown();
    populateTable(); // Voeg deze regel toe om de tabel elke seconde te verversen
}, 1000);

// Get modal element and buttons
const helpModal = document.getElementById('helpModal');
const helpBtn = document.getElementById('helpBtn');
const closeHelpModal = document.getElementById('closeHelpModal');

// Open Help Modal
document.getElementById('helpBtn').addEventListener('click', function() {
    document.getElementById('help-modal-overlay').style.display = 'block';
    document.getElementById('help-modal').style.display = 'block';
});

// Close Help Modal
document.getElementById('help-modal-close').addEventListener('click', function() {
    document.getElementById('help-modal-overlay').style.display = 'none';
    document.getElementById('help-modal').style.display = 'none';
});

// Close Help Modal by clicking outside the modal
document.getElementById('help-modal-overlay').addEventListener('click', function() {
    document.getElementById('help-modal-overlay').style.display = 'none';
    document.getElementById('help-modal').style.display = 'none';
});

function showEditModal(session, index) {
    document.getElementById('edit-modal-overlay').style.display = 'block';
    document.getElementById('edit-modal').style.display = 'block';

    // Vul de modal met de huidige gegevens van de sessie
    document.getElementById('edit-date').value = session.date;
    document.getElementById('edit-starttime').value = session.starttime;
    document.getElementById('edit-endtime').value = session.endtime;
    document.getElementById('edit-session').value = session.session;

    document.getElementById('save-edit-button').onclick = () => {
        const updatedDate = document.getElementById('edit-date').value;
        const updatedStarttime = document.getElementById('edit-starttime').value;
        const updatedEndtime = document.getElementById('edit-endtime').value;
        const updatedSession = document.getElementById('edit-session').value;

        if (updatedDate && updatedStarttime && updatedEndtime && updatedSession) {
            sessions[index] = { date: updatedDate, starttime: updatedStarttime, endtime: updatedEndtime, session: updatedSession };
            // Sorteer de sessies opnieuw
            sessions.sort((a, b) => {
                const dateTimeA = new Date(`${a.date}T${a.starttime}`);
                const dateTimeB = new Date(`${b.date}T${b.starttime}`);
                return dateTimeA - dateTimeB;
            });
            saveSessions(); // Sla de bijgewerkte sessies op
            populateTable(); // Bijwerken van de tabel
            updateCountdown(); // Update de countdown
            closeEditModal(); // Sluit de bewerkingsmodal
        }
    };
}

function closeEditModal() {
    document.getElementById('edit-modal-overlay').style.display = 'none';
    document.getElementById('edit-modal').style.display = 'none';
}

document.getElementById('edit-modal-close').onclick = closeEditModal;

// Functie om de huidige datum in te vullen in het datumveld van de modal
function setCurrentDate() {
    const today = new Date().toISOString().split('T')[0]; // Verkrijg de huidige datum in YYYY-MM-DD formaat
    document.getElementById('date').value = today; // Stel de waarde van het datumveld in
}

function showModal() {
    // Controleer of de pagina net is gerefreshed
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        setCurrentDate(); // Vul de datum in met de huidige datum als de pagina gerefreshed is
    } else if (lastChosenDate) {
        document.getElementById('date').value = lastChosenDate; // Gebruik de laatst gekozen datum als de modal opnieuw wordt geopend
    } else {
        setCurrentDate(); // Vul de datum in met de huidige datum als er geen vorige datum is
    }

    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
}

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
        saveSessions();
        lastChosenDate = date;
        localStorage.setItem('lastChosenDate', lastChosenDate);

        // Sorteer de sessies op datum en tijd
        sessions.sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.starttime}`);
            const dateTimeB = new Date(`${b.date}T${b.starttime}`);
            return dateTimeA - dateTimeB;
        });

        // Update zowel de tabel als de countdown
        populateTable();
        updateCountdown();
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
document.getElementById('delete-sessions-button').onclick = showConfirmModal; // Toon bevestigingsmodal voor alle sessies

// Functie om sessies op te slaan in LocalStorage
function saveSessions() {
    // Filter de sessies die niet in defaultSessions voorkomen
    const sessionsToSave = sessions.filter(session => {
        return !defaultSessions.some(defaultSession =>
            defaultSession.date === session.date &&
            defaultSession.starttime === session.starttime &&
            defaultSession.endtime === session.endtime &&
            defaultSession.session === session.session
        );
    });

    // Sla alleen de niet-standaard sessies op
    localStorage.setItem('sessions', JSON.stringify(sessionsToSave));
}

// Functie om de bevestigingsmodal voor alle sessies te tonen
function showConfirmModal() {
    document.getElementById('confirm-overlay').style.display = 'block';
    document.getElementById('confirm-modal').style.display = 'block';
}

// Functie om de bevestigingsmodal voor alle sessies te sluiten
function closeConfirmModal() {
    document.getElementById('confirm-overlay').style.display = 'none';
    document.getElementById('confirm-modal').style.display = 'none';
}

// Voeg event listeners toe voor de bevestigingsmodal knoppen
document.getElementById('confirm-clear-sessions').onclick = function() {
    deleteAllSessions(); // Verwijder alle sessies
    closeConfirmModal(); // Sluit de bevestigingsmodal
};

document.getElementById('confirm-cancel').onclick = closeConfirmModal;
document.getElementById('confirm-modal-close').onclick = closeConfirmModal;

function showDeleteConfirmModal(session, row) {
    document.getElementById('confirm-delete-overlay').style.display = 'block';
    document.getElementById('confirm-delete-modal').style.display = 'block';

    document.getElementById('confirm-delete-yes').onclick = function() {
        const index = sessions.findIndex(s => s.date === session.date && s.starttime === session.starttime && s.session === session.session);
        if (index > -1) {
            sessions.splice(index, 1);
            saveSessions();
            populateTable();
            updateCountdown(); // Update de countdown
        }
        closeDeleteConfirmModal();
    };

    document.getElementById('confirm-delete-no').onclick = closeDeleteConfirmModal;
    document.getElementById('confirm-modal-close-session').onclick = closeDeleteConfirmModal;
}

function closeDeleteConfirmModal() {
    document.getElementById('confirm-delete-overlay').style.display = 'none';
    document.getElementById('confirm-delete-modal').style.display = 'none';
}
