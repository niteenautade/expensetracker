 <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_expensetracker";

$str_json = file_get_contents('php://input');
$response = json_decode($str_json,true);
$loginid = $response['loginid'];
$counter_failed=0;

$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
foreach($response as $x => $x_value) {
    
	if($x != "loginid")
	{
		$sql = "INSERT INTO tbl_expenses (item , price,userID) VALUES ('$x','$x_value','$loginid')";
	
		if ($conn->query($sql) === TRUE) {
		   
		} else {
			$counter_failed++;
		    echo "Error: " . $conn->error;
		}
	}
	
}
$conn->close();
if($counter_failed===0){
	echo "All records added to database successfully";
}
?> 