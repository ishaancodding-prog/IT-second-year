// Master Schedule Dataset with Batch Specificity
const timetableData = [
    { day: "Monday", time: "11:00 - 12:00", subject: "Data Structures and Algorithms", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Monday", time: "12:00 - 13:00", subject: "Effective Technical Communication", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Monday", time: "15:00 - 16:00", subject: "Foundations of Information Technology", room: "IT-202", batches: ["IT-1", "IT-2"] },
    
    { day: "Tuesday", time: "10:00 - 11:00", subject: "Data Structures and Algorithms", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Tuesday", time: "11:00 - 13:00", subject: "Digital Electronics (Tutorial/Practical)", room: "Comp Engg. Dept.", batches: ["IT-2"] },
    { day: "Tuesday", time: "14:00 - 15:00", subject: "Probability and Statistics (Tutorial)", room: "IT-305", batches: ["IT-1"] },
    { day: "Tuesday", time: "15:00 - 16:00", subject: "Probability and Statistics (Tutorial)", room: "IT-305", batches: ["IT-2"] },
    { day: "Tuesday", time: "16:00 - 17:00", subject: "Formal Languages and Automata Theory", room: "IT-202", batches: ["IT-1", "IT-2"] },
    
    { day: "Wednesday", time: "09:00 - 10:00", subject: "Foundations of Information Technology", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Wednesday", time: "10:00 - 11:00", subject: "Probability and Statistics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Wednesday", time: "11:00 - 12:00", subject: "Digital Electronics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Wednesday", time: "12:00 - 13:00", subject: "Foundations of Information Technology", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Wednesday", time: "15:00 - 17:00", subject: "Data Structures and Algorithms (Practical)", room: "IT-203", batches: ["IT-1"] },
    { day: "Wednesday", time: "15:00 - 17:00", subject: "Foundations of IT (Practical)", room: "IT-204", batches: ["IT-2"] },
    
    { day: "Thursday", time: "10:00 - 11:00", subject: "Data Structures and Algorithms", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Thursday", time: "11:00 - 12:00", subject: "Effective Technical Communication", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Thursday", time: "12:00 - 13:00", subject: "Digital Electronics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Thursday", time: "15:00 - 17:00", subject: "Data Structures and Algorithms (Practical)", room: "IT-203", batches: ["IT-2"] },
    
    { day: "Friday", time: "10:00 - 11:00", subject: "Probability and Statistics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Friday", time: "11:00 - 12:00", subject: "Effective Technical Communication", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Friday", time: "12:00 - 13:00", subject: "Digital Electronics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Friday", time: "15:00 - 17:00", subject: "Digital Electronics (Practical)", room: "Comp Engg. Dept.", batches: ["IT-1"] },
    
    { day: "Saturday", time: "09:00 - 11:00", subject: "Foundations of IT (Practical)", room: "IT-204", batches: ["IT-1"] },
    { day: "Saturday", time: "11:00 - 12:00", subject: "Formal Languages and Automata Theory", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Saturday", time: "12:00 - 13:00", subject: "Probability and Statistics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Saturday", time: "14:00 - 18:00", subject: "NSS/NCC Training Session", room: "IT Complex", batches: ["IT-1", "IT-2"] }
];

let currentUser = { id: '', section: 'All' };
let currentDayFilter = 'All';

// Initialize view on load (Shows all until student logs in)
document.addEventListener('DOMContentLoaded', () => {
    renderTimetable(timetableData);
});

// Handle Student ID & Section Form Submission
function handleVerification(event) {
    event.preventDefault();
    const studentId = document.getElementById('student-id').value.trim();
    const section = document.getElementById('section-select').value;

    if (!studentId || !section) return;

    currentUser = { id: studentId, section };

    // Update UI panels
    document.querySelector('.verification-card').style.display = 'none';
    document.getElementById('display-student-id').innerText = studentId;
    document.getElementById('display-section').innerText = `#${section}`;
    document.getElementById('user-status-banner').style.display = 'flex';

    // Filter timetable based on selected section batch
    applyFilters();
}

// Reset Verification to change details
function resetVerification() {
    document.getElementById('verification-form').reset();
    document.getElementById('user-status-banner').style.display = 'none';
    document.querySelector('.verification-card').style.display = 'flex';
    currentUser = { id: '', section: 'All' };
    currentDayFilter = 'All';
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.filter-btn').classList.add('active');
    renderTimetable(timetableData);
}

// Filter by day button click
function filterByDay(day, event) {
    currentDayFilter = day;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
    applyFilters();
}

// Combined filtering (Batch Section + Day)
function applyFilters() {
    let filtered = timetableData;

    // Filter by section batch if selected
    if (currentUser.section !== 'All') {
        filtered = filtered.filter(item => item.batches.includes(currentUser.section));
    }

    // Filter by day if selected
    if (currentDayFilter !== 'All') {
        filtered = filtered.filter(item => item.day === currentDayFilter);
    }

    renderTimetable(filtered);
}

// Render Timetable rows
function renderTimetable(data) {
    const container = document.getElementById('timetable-output');
    
    if (data.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 40px;">No classes found matching your batch and filter criteria.</div>`;
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
