<?php 
header('Content-Type:application/json;charset=utf8');
$DBNAME='game2048';
require('init.php');

$player = $_REQUEST['player'] or die ('{"erroCode":-1}');
$code = $_REQUEST['code'] or die('{"errorCode":-2}');
$score = $_REQUEST['score'] or die('{"errrCode":-3}');


$sql = "INSERT INTO record VALUES(NULL,'$player','$code','$score',0)";
$result = mysqli_query($conn,$sql);
$row = mysqli_affected_rows($conn);

if($row){
	$out[code]=1;
}

$out={
	"code":,
	"data":$data

},


?>