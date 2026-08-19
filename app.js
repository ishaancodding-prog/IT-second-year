const rawSchedule = [
    { day: "Monday", time: "11:00 AM - 12:00 PM", subject: "Data Structures and Algorithms", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Monday", time: "12:00 PM - 01:00 PM", subject: "Effective Technical Communication", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Monday", time: "03:00 PM - 04:00 PM", subject: "Foundations of Information Technology", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Tuesday", time: "10:00 AM - 11:00 AM", subject: "Data Structures and Algorithms", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Tuesday", time: "11:00 AM - 01:00 PM", subject: "Digital Electronics (Tutorial/Practical)", venue: "Comp Engg. Dept.", sections: ["#IT-2"] },
    { day: "Tuesday", time: "02:00 PM - 03:00 PM", subject: "Probability and Statistics (Tutorial)", venue: "IT-305", sections: ["#IT-1"] },
    { day: "Tuesday", time: "03:00 PM - 04:00 PM", subject: "Probability and Statistics (Tutorial)", venue: "IT-305", sections: ["#IT-2"] },
    { day: "Tuesday", time: "04:00 PM - 05:00 PM", subject: "Formal Languages and Automata Theory", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Wednesday", time: "09:00 AM - 10:00 AM", subject: "Foundations of Information Technology", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Wednesday", time: "10:00 AM - 11:00 AM", subject: "Probability and Statistics", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Wednesday", time: "11:00 AM - 12:00 PM", subject: "Digital Electronics", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Wednesday", time: "12:00 PM - 01:00 PM", subject: "Foundations of Information Technology", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Wednesday", time: "03:00 PM - 05:00 PM", subject: "Data Structures and Algorithms (Practical)", venue: "IT-203", sections: ["#IT-1"] },
    { day: "Wednesday", time: "03:00 PM - 05:00 PM", subject: "Foundations of Information Technology (Practical)", venue: "IT-204", sections: ["#IT-2"] },
    { day: "Thursday", time: "10:00 AM - 11:00 AM", subject: "Data Structures and Algorithms", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Thursday", time: "11:00 AM - 12:00 PM", subject: "Effective Technical Communication", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Thursday", time: "12:00 PM - 01:00 PM", subject: "Digital Electronics", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Thursday", time: "03:00 PM - 05:00 PM", subject: "Data Structures and Algorithms (Practical)", venue: "IT-203", sections: ["#IT-2"] },
    { day: "Friday", time: "10:00 AM - 11:00 AM", subject: "Probability and Statistics", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Friday", time: "11:00 AM - 12:00 PM", subject: "Effective Technical Communication", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Friday", time: "12:00 PM - 01:00 PM", subject: "Digital Electronics", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Friday", time: "03:00 PM - 05:00 PM", subject: "Digital Electronics (Practical)", venue: "Comp Engg. Dept.", sections: ["#IT-1"] },
    { day: "Saturday", time: "09:00 AM - 11:00 AM", subject: "Foundations of Information Technology (Practical)", venue: "IT-204", sections: ["#IT-1"] },
    { day: "Saturday", time: "11:00 AM - 12:00 PM", subject: "Formal Languages and Automata Theory", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Saturday", time: "12:00 PM - 01:00 PM", subject: "Probability and Statistics", venue: "IT-202", sections: ["#IT-1", "#IT-2"] },
    { day: "Saturday", time: "02:00 PM - 06:00 PM", subject: "NSS/NCC", venue: "IT Complex", sections: ["#IT-1", "#IT-2"] }
];

// State
let currentUser = { name: "", id: "", section: "" };
let notesByStudent = {};
let currentDayFilter = "All";
let clockInterval = null;

// Event Listeners Initialization
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('btn-logout').addEventListener('click', logoutSession);
    document.getElementById('btn-save-note').addEventListener('click', addNote);

    // Tab switching listener
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => switchTab(e.target.dataset.target, e));
    });

    // Day filter listener
    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.addEventListener('click', (e) => filterDay(e.target.dataset.day));
    });

    // Pause clock when tab is hidden to save battery
    document.addEventListener("visibilitychange", () => {
        if (document.hidden && clockInterval) {
            clearInterval(clockInterval);
        } else if (!document.hidden && !document.getElementById("dashboard-screen").classList.contains("hidden")) {
            startLiveClock();
        }
    });
});

function handleLogin(event) {
    event.preventDefault();
    const nameVal = document.getElementById("student-name").value.trim();
    const idVal = document.getElementById("student-id").value.trim();
    const secVal = document.querySelector('input[name="section"]:checked').value;
    const errorEl = document.getElementById("login-error");

    if (!nameVal || !idVal) {
        errorEl.style.display = "block";
        return;
    }
    errorEl.style.display = "none";

    currentUser = { name: nameVal, id: idVal, section: secVal };
    showDashboard();
}

function showDashboard() {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("dashboard-screen").classList.remove("hidden");
    document.getElementById("header-user-info").classList.remove("hidden");
    document.getElementById("main-container").classList.add("dashboard-expanded");

    document.getElementById("welcome-title").innerText = `Welcome back, ${currentUser.name}!`;
    document.getElementById("welcome-subtitle").innerText = `ID: ${currentUser.id}`;
    document.getElementById("section-display-badge").innerText = currentUser.section;

    // Accessibility: shift focus to dashboard for screen readers
    document.getElementById("dashboard-header-focus").focus();

    renderSchedule();
    renderNotes();
    startLiveClock();
}

function logoutSession() {
    if (clockInterval) clearInterval(clockInterval);
    document.getElementById("dashboard-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
    document.getElementById("header-user-info").classList.add("hidden");
    document.getElementById("main-container").classList.remove("dashboard-expanded");
    document.getElementById("login-form").reset();
    document.getElementById("login-error").style.display = "none";
    currentDayFilter = "All";
}

function switchTab(tabName, event) {
    document.querySelectorAll(".nav-tab").forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
    });
    event.target.classList.add("active");
    event.target.setAttribute("aria-selected", "true");

    document.querySelectorAll(".tab-content").forEach(c => c.classList.add("hidden"));
    document.getElementById(`tab-${tabName}`).classList.remove("hidden");
}

function startLiveClock() {
    updateClock();
    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    document.getElementById("live-clock-display").innerText = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById("live-date-display").innerText = now.toLocaleDateString(undefined, {
        weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'
    });
}

function getNotesList() {
    if (!notesByStudent[currentUser.id]) notesByStudent[currentUser.id] = [];
    return notesByStudent[currentUser.id];
}

function addNote() {
    const textInput = document.getElementById("new-note-text");
    const errorEl = document.getElementById("note-error");
    const val = textInput.value.trim();

    if (!val) {
        errorEl.style.display = "block";
        return;
    }
    errorEl.style.display = "none";

    const notes = getNotesList();
    notes.unshift({
        id: Date.now(),
        text: val,
        timestamp: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    });

    textInput.value = "";
    renderNotes();
}

function deleteNote(noteId) {
    notesByStudent[currentUser.id] = getNotesList().filter(n => n.id !== noteId);
    renderNotes();
}

// Optimized with DocumentFragment and textContent for security
function renderNotes() {
    const container = document.getElementById("notes-container");
    const notes = getNotesList();

    container.innerHTML = ""; 

    if (notes.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.style.cssText = "color: var(--text-muted); text-align: center; padding: 2.5rem; font-size: 0.875rem;";
        emptyMessage.textContent = "No saved notes yet. Create your first note above!";
        container.appendChild(emptyMessage);
        return;
    }

    const fragment = document.createDocumentFragment();

    notes.forEach(note => {
        const card = document.createElement("div");
        card.className = "note-card";

        const contentDiv = document.createElement("div");
        contentDiv.className = "note-content";
        contentDiv.textContent = note.text; 

        const footerDiv = document.createElement("div");
        footerDiv.className = "note-footer";

        const timeSpan = document.createElement("span");
        timeSpan.textContent = note.timestamp;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-danger";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteNote(note.id));

        footerDiv.appendChild(timeSpan);
        footerDiv.appendChild(deleteBtn);
        card.appendChild(contentDiv);
        card.appendChild(footerDiv);

        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

function filterDay(day) {
    currentDayFilter = day;
    document.querySelectorAll(".day-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.day === day);
    });
    renderSchedule();
}

// Optimized with DocumentFragment
function renderSchedule() {
    const tbody = document.getElementById("schedule-table-body");
    tbody.innerHTML = ""; 

    const filtered = rawSchedule.filter(item => {
        const matchesSec = item.sections.includes(currentUser.section);
        const matchesDay = currentDayFilter === "All" || item.day === currentDayFilter;
        return matchesSec && matchesDay;
    });

    if (filtered.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.style.cssText = "text-align: center; padding: 2.5rem; color: var(--text-muted);";
        td.textContent = "No classes scheduled for this filter. Enjoy your break!";
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach(item => {
        const tr = document.createElement("tr");

        const tdDay = document.createElement("td");
        tdDay.style.cssText = "font-weight: 700; color: #f8fafc;";
        tdDay.textContent = item.day;

        const tdTime = document.createElement("td");
        tdTime.style.cssText = "font-weight: 500; color: #cbd5e1;";
        tdTime.textContent = item.time;

        const tdSubject = document.createElement("td");
        tdSubject.style.cssText = "color: #f1f5f9; font-weight: 600; white-space: normal;";
        tdSubject.textContent = item.subject;

        const tdVenue = document.createElement("td");
        tdVenue.style.cssText = "color: var(--text-muted); font-weight: 500;";
        tdVenue.textContent = item.venue;

        tr.appendChild(tdDay);
        tr.appendChild(tdTime);
        tr.appendChild(tdSubject);
        tr.appendChild(tdVenue);

        fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
}
