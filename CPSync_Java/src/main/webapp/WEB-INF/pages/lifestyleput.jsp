<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>CarePass SyncEndpoints</title>
</head>
<body>

	<h2 class="head">Lifestyle Put</h2>
	<ul>
		<li>Lifestyle
			<ul>

				<li>Lifestyle Put
					
					<form method="get" action="lifestyle-put.htm" id="cufp">
						<table border="0">
							<tr>
								<td>Id</td>
								<td><input name="lifestyleId" id="lifestyleId" value="0"/>
								</td>								
							</tr>
							<tr>
								<td>Type</td>
								<td><input name="lifestyleType" id="lifestyleType" />
								</td>								
							</tr>
							<tr>
								<td>Name</td>
								<td><input name="lifestyleName" id="lifestyleName" />
								</td>								
							</tr>
							<tr>
								<td>URL image</td>
								<td><input name="lifestyleImageUrl" id="lifestyleImageUrl" />
								</td>								
							</tr>
														
							
							
							<tr>
								<td colspan="2" align="right"><input type="submit"
									value="Go" /></td>

							</tr>
						</table>
					</form>
				</li>
			</ul>
	</ul>

</body>
</html>