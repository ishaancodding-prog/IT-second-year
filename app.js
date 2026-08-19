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

// Application State
let currentUser = { name: "", id: "", section: "" };
let notesByStudent = {};
let tasksByStudent = {};
let currentDayFilter = "All";
let currentTaskFilter = "all";
let clockInterval = null;

function showToast(message, type = "success") {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function loadState() {
    const savedUser = localStorage.getItem('hub_user');
    const savedNotes = localStorage.getItem('hub_notes');
    const savedTasks = localStorage.getItem('hub_tasks');
    if (savedUser) currentUser = JSON.parse(savedUser);
    if (savedNotes) notesByStudent = JSON.parse(savedNotes);
    if (savedTasks) tasksByStudent = JSON.parse(savedTasks);
}

function saveState() {
    localStorage.setItem('hub_user', JSON.stringify(currentUser));
    localStorage.setItem('hub_notes', JSON.stringify(notesByStudent));
    localStorage.setItem('hub_tasks', JSON.stringify(tasksByStudent));
}

document.addEventListener("DOMContentLoaded", () => {
    loadState();
    
    if (currentUser.id) {
        showDashboard(true);
    }

    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('btn-logout').addEventListener('click', logoutSession);
    document.getElementById('btn-save-note').addEventListener('click', addNote);
    document.getElementById('btn-add-task').addEventListener('click', addTask);

    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => switchTab(e.target.dataset.target, e));
    });

    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.addEventListener('click', (e) => filterDay(e.target.dataset.day));
    });

    document.querySelectorAll('.task-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.task-filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentTaskFilter = e.target.dataset.filter;
            renderTasks();
        });
    });

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
    saveState();
    showDashboard(false);
}

function showDashboard(isAutoLogin = false) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("dashboard-screen").classList.remove("hidden");
    document.getElementById("header-user-info").classList.remove("hidden");
    document.getElementById("main-container").classList.add("dashboard-expanded");

    document.getElementById("welcome-title").innerText = `Welcome back, ${currentUser.name}!`;
    document.getElementById("welcome-subtitle").innerText = `ID: ${currentUser.id}`;
    document.getElementById("section-display-badge").innerText = currentUser.section;

    document.getElementById("dashboard-header-focus").focus();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayName = days[new Date().getDay()];
    filterDay(todayName !== "Sunday" ? todayName : "All");

    renderNotes();
    renderTasks();
    startLiveClock();

    showToast(isAutoLogin ? "Session restored" : "Successfully logged in", "info");
}

function logoutSession() {
    if (clockInterval) clearInterval(clockInterval);
    currentUser = { name: "", id: "", section: "" };
    localStorage.removeItem('hub_user');

    document.getElementById("dashboard-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
    document.getElementById("header-user-info").classList.add("hidden");
    document.getElementById("main-container").classList.remove("dashboard-expanded");
    document.getElementById("login-form").reset();
    currentDayFilter = "All";

    showToast("Logged out successfully", "info");
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

    hours = hours % 12 || 12;
    const formattedHours = String(hours).padStart(2, '0');

    document.getElementById("live-clock-display").innerText = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById("live-date-display").innerText = now.toLocaleDateString(undefined, {
        weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'
    });
}

/* ==================== Assignments Logic ==================== */

function getTasksList() {
    if (!tasksByStudent[currentUser.id]) tasksByStudent[currentUser.id] = [];
    return tasksByStudent[currentUser.id];
}

function addTask() {
    const titleInput = document.getElementById("task-title");
    const subjectInput = document.getElementById("task-subject");
    const dateInput = document.getElementById("task-due-date");
    const priorityInput = document.getElementById("task-priority");
    const errorEl = document.getElementById("task-error");

    const title = titleInput.value.trim();
    const dueDate = dateInput.value;

    if (!title || !dueDate) {
        errorEl.style.display = "block";
        return;
    }
    errorEl.style.display = "none";

    const tasks = getTasksList();
    tasks.unshift({
        id: Date.now(),
        title: title,
        subject: subjectInput.value,
        dueDate: dueDate,
        priority: priorityInput.value,
        completed: false
    });

    saveState();
    titleInput.value = "";
    dateInput.value = "";
    renderTasks();
    showToast("Assignment added!", "success");
}

function toggleTaskStatus(taskId) {
    const tasks = getTasksList();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveState();
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasksByStudent[currentUser.id] = getTasksList().filter(t => t.id !== taskId);
    saveState();
    renderTasks();
    showToast("Task removed", "error");
}

function renderTasks() {
    const container = document.getElementById("tasks-container");
    const tasks = getTasksList();
    container.innerHTML = "";

    const filtered = tasks.filter(t => {
        if (currentTaskFilter === "pending") return !t.completed;
        if (currentTaskFilter === "completed") return t.completed;
        return true;
    });

    if (filtered.length === 0) {
        const empty = document.createElement("p");
        empty.style.cssText = "color: var(--text-muted); text-align: center; padding: 2rem; font-size: 0.875rem;";
        empty.textContent = currentTaskFilter === "all" ? "No assignments yet. Add one above!" : `No ${currentTaskFilter} tasks found.`;
        container.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();
    const today = new Date().toISOString().split('T')[0];

    filtered.forEach(task => {
        const item = document.createElement("div");
        item.className = `task-item ${task.completed ? 'completed' : ''}`;

        const left = document.createElement("div");
        left.className = "task-left";

        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.className = "task-checkbox";
        chk.checked = task.completed;
        chk.addEventListener("change", () => toggleTaskStatus(task.id));

        const info = document.createElement("div");
        info.style.overflow = "hidden";

        const titleText = document.createElement("div");
        titleText.className = "task-title-text";
        titleText.style.cssText = "font-weight: 700; color: var(--text-main); font-size: 0.95rem;";
        titleText.textContent = task.title;

        const meta = document.createElement("div");
        meta.className = "task-meta";

        const subjectTag = document.createElement("span");
        subjectTag.className = "tag tag-subject";
        subjectTag.textContent = task.subject;

        const priorityTag = document.createElement("span");
        priorityTag.className = `tag tag-priority-${task.priority}`;
        priorityTag.textContent = task.priority;

        const dateTag = document.createElement("span");
        dateTag.style.color = "var(--text-muted)";
        dateTag.textContent = `Due: ${task.dueDate}`;

        meta.appendChild(subjectTag);
        meta.appendChild(priorityTag);
        meta.appendChild(dateTag);

        // Date alerts (Overdue vs Due Today)
        if (!task.completed) {
            if (task.dueDate < today) {
                const overdueTag = document.createElement("span");
                overdueTag.className = "tag tag-status-overdue";
                overdueTag.textContent = "Overdue";
                meta.appendChild(overdueTag);
            } else if (task.dueDate === today) {
                const todayTag = document.createElement("span");
                todayTag.className = "tag tag-status-today";
                todayTag.textContent = "Due Today";
                meta.appendChild(todayTag);
            }
        }

        info.appendChild(titleText);
        info.appendChild(meta);

        left.appendChild(chk);
        left.appendChild(info);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-danger";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        item.appendChild(left);
        item.appendChild(deleteBtn);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}

/* ==================== Notes Logic ==================== */

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

    saveState();
    textInput.value = "";
    renderNotes();
    showToast("Note saved!", "success");
}

function deleteNote(noteId) {
    notesByStudent[currentUser.id] = getNotesList().filter(n => n.id !== noteId);
    saveState();
    renderNotes();
    showToast("Note deleted", "error");
}

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

/* ==================== Timetable Logic ==================== */

function filterDay(day) {
    currentDayFilter = day;
    document.querySelectorAll(".day-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.day === day);
    });
    renderSchedule();
}

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
        tdDay.style.cssText = "font-weight: 700; color: var(--text-main);";
        tdDay.textContent = item.day;

        const tdTime = document.createElement("td");
        tdTime.style.cssText = "font-weight: 500; color: var(--text-muted);";
        tdTime.textContent = item.time;

        const tdSubject = document.createElement("td");
        tdSubject.style.cssText = "color: var(--text-main); font-weight: 600; white-space: normal;";
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
