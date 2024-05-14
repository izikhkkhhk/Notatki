<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "notes_app";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the JSON data sent from JavaScript
$data = json_decode(file_get_contents("php://input"));

// Prepare SQL statement to delete note
$stmt = $conn->prepare("DELETE FROM notes WHERE id = ?");
$stmt->bind_param("i", $noteId);

// Delete the note from the database
$noteId = $data->id;
$stmt->execute();

// Close statement and connection
$stmt->close();
$conn->close();
?>
