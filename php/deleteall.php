 <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_expensetracker";

$loginid = $_POST['loginid'];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to delete a record
$sql = "DELETE FROM tbl_expenses WHERE UserID='$loginid'";

if ($conn->query($sql) === TRUE) {
    echo "All Records deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?> 