const timetableData = {
    "Monday": [
        { time: "11:00 - 12:00", subject: "Data Structures and Algorithms", room: "IT-202" },
        { time: "12:00 - 13:00", subject: "Effective Technical Communication", room: "IT-202" },
        { time: "15:00 - 16:00", subject: "Foundations of Information Technology", room: "IT-202" }
    ],
    "Tuesday": [
        { time: "10:00 - 11:00", subject: "Data Structures and Algorithms", room: "IT-202" },
        { time: "11:00 - 13:00", subject: "Digital Electronics (Tutorial/Practical - IT2)", room: "Comp Engg. Dept.", section: "IT-2" },
        { time: "11:00 - 13:00", subject: "Digital Electronics (Tutorial/Practical - IT1)", room: "Comp Engg. Dept.", section: "IT-1" },
        { time: "14:00 - 15:00", subject: "Probability and Statistics (Tutorial - IT1)", room: "IT-305", section: "IT-1" },
        { time: "15:00 - 16:00", subject: "Probability and Statistics (Tutorial - IT2)", room: "IT-305", section: "IT-2" },
        { time: "16:00 - 17:00", subject: "Formal Languages and Automata Theory", room: "IT-202" }
    ],
    "Wednesday": [
        { time: "09:00 - 10:00", subject: "Foundations of Information Technology", room: "IT-202" },
        { time: "10:00 - 11:00", subject: "Probability and Statistics", room: "IT-202" },
        { time: "11:00 - 12:00", subject: "Digital Electronics", room: "IT-202" },
        { time: "12:00 - 13:00", subject: "Foundations of Information Technology", room: "IT-202" },
        { time: "15:00 - 17:00", subject: "Data Structures and Algorithms (Practical - IT1)", room: "IT-203", section: "IT-1" },
        { time: "15:00 - 17:00", subject: "Foundations of Information Technology (Practical - IT2)", room: "IT-204", section: "IT-2" }
    ],
    "Thursday": [
        { time: "10:00 - 11:00", subject: "Data Structures and Algorithms", room: "IT-202" },
        { time: "11:00 - 12:00", subject: "Effective Technical Communication", room: "IT-202" },
        { time: "12:00 - 13:00", subject: "Digital Electronics", room: "IT-202" },
        { time: "15:00 - 17:00", subject: "Data Structures and Algorithms (Practical - IT2)", room: "IT-203", section: "IT-2" },
        { time: "15:00 - 17:00", subject: "Data Structures and Algorithms (Practical - IT1)", room: "IT-203", section: "IT-1" }
    ],
    "Friday": [
        { time: "10:00 - 11:00", subject: "Probability and Statistics", room: "IT-202" },
        { time: "11:00 - 12:00", subject: "Effective Technical Communication", room: "IT-202" },
        { time: "12:00 - 13:00", subject: "Digital Electronics", room: "IT-202" },
        { time: "15:00 - 17:00", subject: "Digital Electronics (Practical - IT1)", room: "Comp Engg. Dept.", section: "IT-1" },
        { time: "15:00 - 17:00", subject: "Digital Electronics (Practical - IT2)", room: "Comp Engg. Dept.", section: "IT-2" }
    ],
    "Saturday": [
        { time: "09:00 - 11:00", subject: "Foundations of Information Technology (Practical - IT1)", room: "IT-204", section: "IT-1" },
        { time: "09:00 - 11:00", subject: "Foundations of Information Technology (Practical - IT2)", room: "IT-204", section: "IT-2" },
        { time: "11:00 - 12:00", subject: "Formal Languages and Automata Theory", room: "IT-202" },
        { time: "12:00 - 13:00", subject: "Probability and Statistics", room: "IT-202" },
        { time: "14:00 - 18:00", subject: "NSS/NCC (IT1 & IT2)", room: "IT Complex" }
    ]
};

let currentUser = { id: "", section: "" };
let activeDay = "Monday";

function handleLogin(event) {
    event.preventDefault();
    currentUser.id = document.getElementById('student-id').value;
    currentUser.section = document.querySelector('input[name="section"]:checked').value;

    // Update Header User Badge
    const badge = document.getElementById('user-badge');
    badge.innerText = `ID: ${currentUser.id} | ${currentUser.section}`;
    badge.classList.remove('hidden');

    // Switch Views
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    document.getElementById('display-section-title').innerText = `Schedule for Section ${currentUser.section}`;

    renderDays();
    renderSchedule(activeDay);
}

function resetPortal() {
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('login-view').classList.remove('hidden');
    document.getElementById('user-badge').classList.add('hidden');
    document.getElementById('schedule-form').reset();
}

function renderDays() {
    const container = document.getElementById('day-tabs');
    container.innerHTML = '';
    Object.keys(timetableData).forEach(day => {
        const isSelected = day === activeDay;
        const btn = document.createElement('button');
        btn.className = `day-tab-btn ${isSelected ? 'active' : ''}`;
        btn.innerText = day;
        btn.onclick = () => {
            activeDay = day;
            renderDays();
            renderSchedule(day);
        };
        container.appendChild(btn);
    });
}

function renderSchedule(day) {
    document.getElementById('active-day-label').innerText = day;
    const listContainer = document.getElementById('schedule-list');
    listContainer.innerHTML = '';

    const dayClasses = timetableData[day].filter(item => {
        if (!item.section) return true;
        return item.section === currentUser.section;
    });

    if (dayClasses.length === 0) {
        listContainer.innerHTML = `<div class="empty-state">No classes scheduled for this day.</div>`;
        return;
    }

    dayClasses.forEach(cls => {
        const row = document.createElement('div');
        row.className = "schedule-item";
        row.innerHTML = `
            <div>
                <span class="class-time">${cls.time}</span>
                <h4 class="class-name">${cls.subject}</h4>
            </div>
            <div class="class-room">
                📍 ${cls.room}
            </div>
        `;
        listContainer.appendChild(row);
    });
}
