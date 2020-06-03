<?php

	require_once( "settings.php" );
	 
	$message = "hello world";
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<style type="text/css" media="all"> 
	@import url("style/style.css");
</style>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<title>Online file storage</title>
</head>
<body>

<?php echo $message; ?>

<div id="container">

<h1>Online File Storage</h1>

<form method="post" action="index.php" enctype="multipart/form-data">
	<input type="hidden" name="MAX_FILE_SIZE" value="100000" />
	<fieldset>
		<legend>Add a new file to the storage</legend>
			<?php echo $message; ?>
			<p><label for="name">Select file</label><br />
			<input type="file" name="file" /></p>
			<p><label for="password">Password for upload</label><br />
			<input type="password" name="password" /></p>
			<p><input type="submit" name="submit" value="Start upload" /></p>	
		</fieldset>
	</form>

	<fieldset>
		<legend>Previousely uploaded files</legend>
			<ul id="menu">
				<li><a href="">All files</a></li>
				<li><a href="">Documents</a></li>
				<li><a href="">Images</a></li>
				<li><a href="">Applications</a></li>
			</ul>
			
			<ul id="files">
				<?php echo $uploaded_files; ?>
			</ul>
	</fieldset>

</div>

<script src="js/filestorage.js" />
</body>
</html>