document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('noteForm');
    const noteInput = document.getElementById('noteInput');
    const noteList = document.getElementById('noteList');

    // Load notes from database on page load
    loadNotes();

    // Add event listener to form submission
    noteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            addNoteToDatabase(noteText);
            noteInput.value = '';
        }
    });

    // Function to add a note to the database
    function addNoteToDatabase(text) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'store_notes.php');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                loadNotes();
            } else {
                console.error('Error adding note:', xhr.responseText);
            }
        };
        xhr.send(JSON.stringify([{ text: text }]));
    }

    // Function to load notes from the database
    function loadNotes() {
        noteList.innerHTML = '';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'get_notes.php');
        xhr.onload = function() {
            if (xhr.status === 200) {
                const notes = JSON.parse(xhr.responseText);
                notes.forEach(function(note) {
                    const li = document.createElement('li');
                    li.innerHTML = `${note.text} <button class="deleteBtn" data-id="${note.id}">Delete</button>`;
                    noteList.appendChild(li);
                });
            } else {
                console.error('Error loading notes:', xhr.responseText);
            }
        };
        xhr.send();
    }

    // Event delegation for delete button
    noteList.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteBtn')) {
            const noteId = event.target.dataset.id;
            deleteNoteFromDatabase(noteId);
        }
    });

    // Function to delete a note from the database
    function deleteNoteFromDatabase(id) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'delete_notes.php');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                loadNotes();
            } else {
                console.error('Error deleting note:', xhr.responseText);
            }
        };
        xhr.send(JSON.stringify({ id: id }));
    }
});
