 <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_expensetracker";

//$item = file_get_contents('php://input');
$item = $_POST['del'];
$loginid = $_POST['loginid'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to delete a record
$sql = "DELETE FROM tbl_expenses WHERE item='$item' and UserID='$loginid'";

if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?> 