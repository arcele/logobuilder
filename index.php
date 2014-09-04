<?php
	if(isset($_GET["mode"]) && $_GET['mode'] == 'png') {
		//header('Content-Type: image/png');
		echo '<!-- We should just render the png in this case instead of all the other crap -->';
	} else {
		echo '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
	}
?>
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
