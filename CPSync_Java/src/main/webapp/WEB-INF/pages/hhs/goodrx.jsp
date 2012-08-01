<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="../structure/head.jsp" />
<body>

	<h1>GoodRx</h1>

	<h2>List of the lowest available price for a prescription
		medication</h2>
	<form method="get" action="goodrx-lowest.htm" name="cufa1">
		<table border=0>
			<tr>
				<td align="left">Name</td>
				<td><input name="name" id="name" /></td>
			</tr>
			<tr>
				<td align="left">Form</td>
				<td><input name="form" id="form" /></td>
			</tr>
			<tr>
				<td align="left">Dosage</td>
				<td><input name="dosage" id="dosage" /></td>
			</tr>
			<tr>
				<td align="left">Quantity</td>
				<td><input name="quantity" id="quantity" /></td>
			</tr>
			<tr>
				<td align="left">Manufacturer</td>
				<td><input name="manufacturer" id="manufacturer" /></td>
			</tr>
			<tr>
				<td align="left">NDC</td>
				<td><input name="ndc" id="ndc" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>
	<h2>List of the available prices for a prescription medication</h2>
	<form method="get" action="goodrx-available.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">Name</td>
				<td><input name="name" id="name" /></td>
			</tr>
			<tr>
				<td align="left">Form</td>
				<td><input name="form" id="form" /></td>
			</tr>
			<tr>
				<td align="left">Dosage</td>
				<td><input name="dosage" id="dosage" /></td>
			</tr>
			<tr>
				<td align="left">Quantity</td>
				<td><input name="quantity" id="quantity" /></td>
			</tr>
			<tr>
				<td align="left">Manufacturer</td>
				<td><input name="manufacturer" id="manufacturer" /></td>
			</tr>
			<tr>
				<td align="left">NDC</td>
				<td><input name="ndc" id="ndc" /></td>
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