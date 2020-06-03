<div class="navbar navbar-default navbar-static-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="index.php">APPHO</a>
		</div>
		<div class="navbar-collapse collapse">
			<ul class="nav navbar-nav">
				<li <?php echo ( $page == 'index' ? "class=\"active\"" : "" ) ?>><a href="index.php">Home</a></li>
				<li <?php echo ( $page == 'boardmembers' ? "class=\"active\"" : "" ) ?>><a href="boardmembers.php">Board Members</a></li>
				<li <?php echo ( $page == 'meetings' ? "class=\"active\"" : "" ) ?>><a href="meetings.php">Meetings</a></li>
				<li <?php echo ( $page == 'information' ? "class=\"active\"" : "" ) ?>><a href="information.php">Information</a></li>
				<li <?php echo ( $page == 'newsletters' ? "class=\"active\"" : "" ) ?>><a href="newsletters.php">Newsletters</a></li>
				<li <?php echo ( $page == 'faq' ? "class=\"active\"" : "" ) ?>><a href="faq.php">FAQ</a></li>
			</ul>
		</div>
	</div>
</div>