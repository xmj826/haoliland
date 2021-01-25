<?php
	header("Content-type:text/html;charset=utf-8");
	
	$name = $_GET['message'];
	
	// $opts = array('http'=>array('header' => "User-Agent:MyAgent/1.0\r\n"));
	// $context = stream_context_create($opts);
	$result = file_get_contents("http://api.qingyunke.com/api.php?key=free&appid=0&msg=".$name);
	// $result = file_get_contents("https://api.jisuapi.com/iqa/query?appkey=yourappkey&question=" . $name, false, $context);
	// echo "fun('$result')";
	echo "$result";
?>