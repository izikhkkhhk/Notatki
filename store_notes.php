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

// Prepare SQL statement to insert note
$stmt = $conn->prepare("INSERT INTO notes (text) VALUES (?)");
$stmt->bind_param("s", $noteText);

// Insert each note into the database
foreach ($data as $note) {
    $noteText = $note->text;
    $stmt->execute();
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
