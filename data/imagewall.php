<?php 
header("Content-Type:application/json;charset=utf8");

$DBNAME='imagewall';

require('init.php');

$sql='SELECT * FROM imgUrl';

$result=mysqli_query($conn,$sql);

$list = mysqli_fetch_all($result,1);

echo json_encode($list);

 ?>