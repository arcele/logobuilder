<?php
	$mode = "generic";
	if(isset($_GET["mode"])) {
		$mode = $_get["mode"]);
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
  <head>
    <title>HTML5 Logo Builder</title>
	<script src="js/jquery.js"> </script> 
    <script src="js/kinetic.js"> </script>

  </head>
  <body style="margin:auto;">
    <div id="logo"></div>
    <script src="js/main.js"> </script>
  </body>
</html>
