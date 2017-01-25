 <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_expensetracker";

$str_json = $_POST['item_to_be_updated'];
$loginid = $_POST['loginid'];
$response = json_decode($str_json,true);

$counter_failed=0;
$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
foreach($response as $x => $x_value) {
    

	$sql = "UPDATE tbl_expenses SET price=$x_value where item='$x'";

	if ($conn->query($sql) === TRUE) {
	   
	} else {
		$counter_failed++;
	    echo "Error: " . $conn->error;
	}
	
}
$conn->close();
if($counter_failed===0){
	echo "Record updated to database successfully";
}
?> 