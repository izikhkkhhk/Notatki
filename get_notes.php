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

// Select all notes from the database
$sql = "SELECT id, text FROM notes";
$result = $conn->query($sql);

$notes = [];

// Fetch notes and store in array
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $notes[] = $row;
    }
}

// Output notes as JSON
echo json_encode($notes);

// Close connection
$conn->close();
?>
