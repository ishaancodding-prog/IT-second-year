// Complete Timetable Dataset
const timetableData = [
    { day: "Monday", time: "11:00 - 12:00", subject: "Data Structures and Algorithms", room: "IT-202" },
    { day: "Monday", time: "12:00 - 13:00", subject: "Effective Technical Communication", room: "IT-202" },
    { day: "Monday", time: "15:00 - 16:00", subject: "Foundations of Information Technology", room: "IT-202" },
    
    { day: "Tuesday", time: "10:00 - 11:00", subject: "Data Structures and Algorithms", room: "IT-202" },
    { day: "Tuesday", time: "11:00 - 13:00", subject: "Digital Electronics (Tutorial/Practical - IT2)", room: "Comp Engg. Dept." },
    { day: "Tuesday", time: "14:00 - 15:00", subject: "Probability and Statistics (Tutorial - IT1)", room: "IT-305" },
    { day: "Tuesday", time: "15:00 - 16:00", subject: "Probability and Statistics (Tutorial - IT2)", room: "IT-305" },
    { day: "Tuesday", time: "16:00 - 17:00", subject: "Formal Languages and Automata Theory", room: "IT-202" },
    
    { day: "Wednesday", time: "09:00 - 10:00", subject: "Foundations of Information Technology", room: "IT-202" },
    { day: "Wednesday", time: "10:00 - 11:00", subject: "Probability and Statistics", room: "IT-202" },
    { day: "Wednesday", time: "11:00 - 12:00", subject: "Digital Electronics", room: "IT-202" },
    { day: "Wednesday", time: "12:00 - 13:00", subject: "Foundations of Information Technology", room: "IT-202" },
    { day: "Wednesday", time: "15:00 - 17:00", subject: "Data Structures (Prac - IT1) / FIT (Prac - IT2)", room: "IT-203 / IT-204" },
    
    { day: "Thursday", time: "10:00 - 11:00", subject: "Data Structures and Algorithms", room: "IT-202" },
    { day: "Thursday", time: "11:00 - 12:00", subject: "Effective Technical Communication", room: "IT-202" },
    { day: "Thursday", time: "12:00 - 13:00", subject: "Digital Electronics", room: "IT-202" },
    { day: "Thursday", time: "15:00 - 17:00", subject: "Data Structures and Algorithms (Practical - IT2)", room: "IT-203" },
    
    { day: "Friday", time: "10:00 - 11:00", subject: "Probability and Statistics", room: "IT-202" },
    { day: "Friday", time: "11:00 - 12:00", subject: "Effective Technical Communication", room: "IT-202" },
    { day: "Friday", time: "12:00 - 13:00", subject: "Digital Electronics", room: "IT-202" },
    { day: "Friday", time: "15:00 - 17:00", subject: "Digital Electronics (Practical - IT1)", room: "Comp Engg. Dept." },
    
    { day: "Saturday", time: "09:00 - 11:00", subject: "Foundations of Information Technology (Practical - IT1)", room: "IT-204" },
    { day: "Saturday", time: "11:00 - 12:00", subject: "Formal Languages and Automata Theory", room: "IT-202" },
    { day: "Saturday", time: "12:00 - 13:00", subject: "Probability and Statistics", room: "IT-202" },
    { day: "Saturday", time: "14:00 - 18:00", subject: "NSS/NCC (IT1 & IT2)", room: "IT Complex" }
];

const venueDescriptions = {
    "IT-202": "Main lecture hall for primary theory classes.",
    "IT-203": "Data Structures & Algorithms Practical Lab.",
    "IT-204": "Foundations of IT Practical Lab.",
    "IT-305": "Probability & Statistics Tutorial Room.",
    "Comp Engg. Dept.": "Digital Electronics laboratory and tutorial wing.",
    "IT Complex": "Central complex for large group activities like NSS/NCC."
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    startClock();
    renderTodaySchedule();
    renderMasterTable(timetableData);
    renderVenues();
});

// Real-Time Clock
function startClock() {
    const clockEl = document.getElementById('live-clock');
    setInterval(() => {
        const now = new Date();
        clockEl.innerText = now.toLocaleTimeString();
    }, 1000);
}

// Navigation Handler
function switchSection(sectionId, event) {
    event.preventDefault();
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');

    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.getElementById(`sec-${sectionId}`).classList.add('active');

    const headers = {
        today: ["Today's Agenda", "Your scheduled classes for today"],
        timetable: ["Full Timetable", "Complete weekly schedule overview"],
        subjects: ["Venues & Rooms", "Locations and building directory"]
    };

    document.getElementById('section-title').innerText = headers[sectionId][0];
    document.getElementById('header-subtitle').innerText = headers[sectionId][1];
}

// Render Today's Schedule (Auto-detects current day)
function renderTodaySchedule() {
    const listEl = document.getElementById('today-schedule-list');
    const badgeEl = document.getElementById('today-date-badge');
    const headingEl = document.getElementById('current-day-heading');

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = days[new Date().getDay()];
    
    badgeEl.innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    headingEl.innerText = `Classes for ${todayName}`;

    const todaysClasses = timetableData.filter(item => item.day === todayName);

    if (todaysClasses.length === 0) {
        listEl.innerHTML = `<div class="no-classes"><i class="fa-solid fa-mug-hot" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>No classes scheduled for today! Enjoy your free time.</div>`;
        return;
    }

    listEl.innerHTML = todaysClasses.map(item => `
        <div class="schedule-item">
            <div>
                <div class="schedule-subject">${item.subject}</div>
                <div class="schedule-room"><i class="fa-solid fa-location-dot"></i> ${item.room}</div>
            </div>
            <div class="schedule-time"><i class="fa-regular fa-clock"></i> ${item.time}</div>
        </div>
    `).join('');
}

// Render Master Timetable Table
function renderMasterTable(data) {
    const tbody = document.getElementById('master-table-body');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td><strong>${item.day}</strong></td>
            <td><code>${item.time}</code></td>
            <td>${item.subject}</td>
            <td><i class="fa-solid fa-location-dot" style="color: var(--primary);"></i> ${item.room}</td>
        </tr>
    `).join('');
}

// Filter Timetable by Day Dropdown
function filterTimetableByDay() {
    const selectedDay = document.getElementById('day-filter').value;
    if (selectedDay === 'all') {
        renderMasterTable(timetableData);
    } else {
        const filtered = timetableData.filter(item => item.day === selectedDay);
        renderMasterTable(filtered);
    }
}

// Render Venue Cards
function renderVenues() {
    const gridEl = document.getElementById('venue-grid');
    gridEl.innerHTML = Object.entries(venueDescriptions).map(([venue, desc]) => `
        <div class="venue-card">
            <i class="fa-solid fa-building-columns"></i>
            <h4>${venue}</h4>
            <p>${desc}</p>
        </div>
    `).join('');
}
