// Complete Timetable Master Database
const masterTimetable = [
    // Monday
    { day: "Monday", time: "11:00 - 12:00", subject: "Data Structures and Algorithms", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Monday", time: "12:00 - 13:00", subject: "Effective Technical Communication", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Monday", time: "15:00 - 16:00", subject: "Foundations of Information Technology", room: "IT-202", batches: ["IT-1", "IT-2"] },
    
    // Tuesday
    { day: "Tuesday", time: "10:00 - 11:00", subject: "Data Structures and Algorithms", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Tuesday", time: "11:00 - 13:00", subject: "Digital Electronics (Tutorial/Practical)", room: "Comp Engg. Dept.", batches: ["IT-2"] },
    { day: "Tuesday", time: "14:00 - 15:00", subject: "Probability and Statistics (Tutorial)", room: "IT-305", batches: ["IT-1"] },
    { day: "Tuesday", time: "15:00 - 16:00", subject: "Probability and Statistics (Tutorial)", room: "IT-305", batches: ["IT-2"] },
    { day: "Tuesday", time: "16:00 - 17:00", subject: "Formal Languages and Automata Theory", room: "IT-202", batches: ["IT-1", "IT-2"] },
    
    // Wednesday
    { day: "Wednesday", time: "09:00 - 10:00", subject: "Foundations of Information Technology", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Wednesday", time: "10:00 - 11:00", subject: "Probability and Statistics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Wednesday", time: "11:00 - 12:00", subject: "Digital Electronics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Wednesday", time: "12:00 - 13:00", subject: "Foundations of Information Technology", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Wednesday", time: "15:00 - 17:00", subject: "Data Structures and Algorithms (Practical)", room: "IT-203", batches: ["IT-1"] },
    { day: "Wednesday", time: "15:00 - 17:00", subject: "Foundations of IT (Practical)", room: "IT-204", batches: ["IT-2"] },
    
    // Thursday
    { day: "Thursday", time: "10:00 - 11:00", subject: "Data Structures and Algorithms", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Thursday", time: "11:00 - 12:00", subject: "Effective Technical Communication", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Thursday", time: "12:00 - 13:00", subject: "Digital Electronics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Thursday", time: "15:00 - 17:00", subject: "Data Structures and Algorithms (Practical)", room: "IT-203", batches: ["IT-2"] },
    
    // Friday
    { day: "Friday", time: "10:00 - 11:00", subject: "Probability and Statistics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Friday", time: "11:00 - 12:00", subject: "Effective Technical Communication", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Friday", time: "12:00 - 13:00", subject: "Digital Electronics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Friday", time: "15:00 - 17:00", subject: "Digital Electronics (Practical)", room: "Comp Engg. Dept.", batches: ["IT-1"] },
    
    // Saturday
    { day: "Saturday", time: "09:00 - 11:00", subject: "Foundations of IT (Practical)", room: "IT-204", batches: ["IT-1"] },
    { day: "Saturday", time: "11:00 - 12:00", subject: "Formal Languages and Automata Theory", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Saturday", time: "12:00 - 13:00", subject: "Probability and Statistics", room: "IT-202", batches: ["IT-1", "IT-2"] },
    { day: "Saturday", time: "14:00 - 18:00", subject: "NSS/NCC Training Session", room: "IT Complex", batches: ["IT-1", "IT-2"] }
];

// Current State
let currentStudent = { id: '', section: '' };
let activeDayFilter = 'All';

// Handle Form Submission
function handleLookup(event) {
    event.preventDefault();
    const studentId = document.getElementById('student-id').value.trim();
    const section = document.getElementById('section-select').value;

    if (!studentId || !section) return;

    currentStudent = { id: studentId, section };

    // Update UI headers
    document.getElementById('result-title').innerText = `Schedule for Section #${section}`;
    document.getElementById('result-student-tag').innerText = `Student ID: ${studentId}`;

    // Toggle View Panels
    document.querySelector('.lookup-card').style.display = 'none';
    document.getElementById('results-container').style.display = 'flex';

    // Render schedule
    renderScheduleList(activeDayFilter);
}

// Reset Lookup to input new ID/Section
function resetLookup() {
    document.getElementById('lookup-form').reset();
    document.getElementById('results-container').style.display = 'none';
    document.querySelector('.lookup-card').style.display = 'block';
    currentStudent = { id: '', section: '' };
    activeDayFilter = 'All';
    document.querySelectorAll('.day-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.day-tab').classList.add('active');
}

// Filter Schedule by Day tab clicks
function filterSchedule(day, event) {
    activeDayFilter = day;
    document.querySelectorAll('.day-tab').forEach(btn => btn.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
    renderScheduleList(day);
}

// Render Filtered Schedule Cards
function renderScheduleList(dayFilter) {
    const gridEl = document.getElementById('schedule-grid-output');
    
    // Filter by student's selected section batch and optional day
    let filtered = masterTimetable.filter(item => item.batches.includes(currentStudent.section));
    
    if (dayFilter !== 'All') {
        filtered = filtered.filter(item => item.day === dayFilter);
    }

    if (filtered.length === 0) {
        gridEl.innerHTML = `<div class="glass-card" style="text-align: center; color: var(--text-muted); padding: 40px;">No classes scheduled for this filter selection.</div>`;
        return;
    }

    gridEl.innerHTML = filtered.map(item => `
        <div class="schedule-card-item">
            <div class="class-details">
                <span class="day-badge">${item.day}</span>
                <h4>${item.subject}</h4>
                <p><i class="fa-solid fa-location-dot" style="color: var(--primary);"></i> Venue: ${item.room}</p>
            </div>
            <div class="class-time">
                <i class="fa-regular fa-clock"></i> ${item.time}
            </div>
        </div>
    `).join('');
}
