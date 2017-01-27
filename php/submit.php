 <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_expensetracker";

$str_json = $_POST['list'];
$response = json_decode($str_json,true);
$loginid = $_POST['loginid'];
$name = $_POST['name'];
$surname = $_POST['surname'];
$emailid = $_POST['emailid'];
$counter_failed=0;

$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
foreach($response as $x => $x_value) {
    $sql = "INSERT INTO tbl_expenses (item , price,userID ,Name , Surname , emailid) VALUES ('$x','$x_value','$loginid', '$name', '$surname', '$emailid')";

	if ($conn->query($sql) === TRUE) {
	   
	} else {
		$counter_failed++;
	    echo "Error: " . $conn->error;
	}
	
}
$conn->close();
if($counter_failed===0){
	echo "All records added to database successfully";
}
?> 