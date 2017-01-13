<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "db_expensetracker";
    //open connection to mysql db
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    } 
    //fetch table rows from mysql db
    $sql = "select * from tbl_expenses";
    $result = mysqli_query($conn, $sql) or die("Error in Selecting " . mysqli_error($connection));
    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray);
    //close the db connection
    mysqli_close($conn);
?>