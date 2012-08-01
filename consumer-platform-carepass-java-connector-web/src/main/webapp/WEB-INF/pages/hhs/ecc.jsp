<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="../structure/head.jsp" />
<body>

	<h1>Estimated Cost of Care</h1>

	<h2>List the Medical Estimated Cost of Care Information based on
		the CPT, LAT, LNG</h2>
	<form method="get" action="ecc-medical-list-cpt.htm" name="cufa1">
		<table border=0>
			<tr>
				<td align="left">CPT</td>
				<td><input name="cpt" id="cpt" /></td>
			</tr>
			<tr>
				<td align="left">LAT</td>
				<td><input name="lat" id="lat" /></td>
			</tr>
			<tr>
				<td align="left">LNG</td>
				<td><input name="lng" id="lng" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>
	<h2>List the Medical Estimated Cost of Care Information based on
		the CPT, ZIP</h2>
	<form method="get" action="ecc-medical-list-cpt-zip.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">CPT</td>
				<td><input name="cpt" id="cpt" /></td>
			</tr>
			<tr>
				<td align="left">ZIP</td>
				<td><input name="zip" id="zip" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>

	<h2>
		<a href="<c:url value="ecc-medical-list.htm"/>">Retrieve a list of all
			Medical's CPT codes with your short and long description</a>
	</h2>

	<h2>Retrieve the Dental Estimated Cost of Care Information based on the CDT, LAT, LNG</h2>
	<form method="get" action="ecc-dental-list-cdt.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">CDT</td>
				<td><input name="cdt" id="cdt" /></td>
			</tr>
			<tr>
				<td align="left">LAT</td>
				<td><input name="lat" id="lat" /></td>
			</tr>
			<tr>
				<td align="left">LNG</td>
				<td><input name="LNG" id="LNG" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>
	
	<h2>List the Dental Estimated Cost of Care Information based on
		the CDT, ZIP</h2>
	<form method="get" action="ecc-dental-list-cdt-zip.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">CDT</td>
				<td><input name="cdt" id="cdt" /></td>
			</tr>
			<tr>
				<td align="left">ZIP</td>
				<td><input name="zip" id="zip" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>
	
	<h2>
		<a href="<c:url value="ecc-dental-list.htm"/>">Retrieve a list of all
			Dental's CDT codes with your short and long description</a>
	</h2>
	
		<h2>
		<a href="<c:url value="ecc-category-list.htm"/>">List of categories</a>
	</h2>
	
	<h2>List of Sub Categories</h2>
	<form method="get" action="ecc-sub-category-list.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">Category</td>
				<td><input name="category" id="category" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>
		
	<div id="response">
		<h2>Server Response</h2>
		<c:out value="${response}"></c:out>
	</div>
	<div id="error">
		<h2>Error</h2>
		<c:out value="${error}"></c:out>
		<br />
	</div>

	<h2><a href="" onclick="javascript:history.back()">Return</a></h2>
</body>

<script>
	showReply("${error.length()}", error);
	showReply("${response.length()}", response);
</script>
</html>