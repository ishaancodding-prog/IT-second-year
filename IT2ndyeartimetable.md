# Python script representing the weekly timetable schedule classes

timetable = [
    {
        "day": "Monday",
        "time": "10:00 - 11:00",
        "course": "Data Structures and Algorithms",
        "room": "IT-202",
    },
    {
        "day": "Monday",
        "time": "12:00 - 13:00",
        "course": "Foundations of Information Technology",
        "room": "IT-204",
    },
    {
        "day": "Tuesday",
        "time": "11:00 - 13:00",
        "course": "Probability and Statistics",
        "room": "Comp Engg. Dept.",
    },
    {
        "day": "Wednesday",
        "time": "09:00 - 10:00",
        "course": "Foundations of Information Technology",
        "room": "IT-204",
    },
    {
        "day": "Wednesday",
        "time": "10:00 - 11:00",
        "course": "Discrete Mathematics",
        "room": "IT-202",
    },
    {
        "day": "Thursday",
        "time": "10:00 - 11:00",
        "course": "Data Structures and Algorithms",
        "room": "IT-202",
    },
    {
        "day": "Friday",
        "time": "10:00 - 11:00",
        "course": "Probability and Statistics",
        "room": "IT-202",
    },
    {
        "day": "Friday",
        "time": "12:00 - 13:00",
        "course": "Foundations of Information Technology",
        "room": "IT-202",
    },
]

# Display as interactive console "flashcards"
for index, entry in enumerate(timetable, start=1):
  print(f"--- Flashcard {index} ---")
  print(f"Day & Time: {entry['day']} ({entry['time']})")
  input("Press Enter to see the Course and Room...")
  print(f"Course: {entry['course']}")
  print(f"Room: {entry['room']}\n")
