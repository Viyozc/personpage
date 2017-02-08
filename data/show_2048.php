<?php 
header('Content-Type:application/json;charset=utf8');
$DBNAME='game2048';
require('init.php');


$sql = "SELECT * FROM record";
$rows = mysqli_fetch_all(mysqli_query($conn,$sql),MYSQLI_ASSOC);

echo json_encode($rows);

 ?>