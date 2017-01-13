 <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_expensetracker";

$item = file_get_contents('php://input');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to delete a record
$sql = "TRUNCATE table tbl_expenses";

if ($conn->query($sql) === TRUE) {
    echo "All Records deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?> 