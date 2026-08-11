// Master Schedule Dataset for 2nd Year IT Students
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
    { day: "Wednesday", time: "15:00 - 17:00", subject: "Data Structures (Practical - IT1) / FIT (Practical - IT2)", room: "IT-203 / IT-204" },
    
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

// Initialize view on load
document.addEventListener('DOMContentLoaded', () => {
    renderTimetable(timetableData);
});

// Filter by day function
function filterByDay(day, event) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if (day === 'All') {
        renderTimetable(timetableData);
    } else {
        const filtered = timetableData.filter(item => item.day === day);
        renderTimetable(filtered);
    }
}

// Render Timetable rows
function renderTimetable(data) {
    const container = document.getElementById('timetable-output');
    
    if (data.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 40px;">No classes found for this day.</div>`;
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="schedule-row">
            <div class="row-left">
                <span class="day-tag">${item.day}</span>
                <div class="subject-name">${item.subject}</div>
                <div class="room-info"><i class="fa-solid fa-location-dot"></i> Room / Venue: ${item.room}</div>
            </div>
            <div class="row-right">
                <i class="fa-regular fa-clock"></i> ${item.time}
            </div>
        </div>
    `).join('');
}
