<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="../structure/head.jsp" />
<body>

	<h1>De-Identification Claims</h1>

	<h2>Obtain claims data</h2>
	<form method="get" action="di-claims.htm" name="cufa1">
		<table border=0>
			<tr>
				<td align="left">NDC</td>
				<td><input name="ndc" id="ndc" /></td>
			</tr>
			<tr>
				<td align="left">Gender</td>
				<td><input name="gender" id="gender" /></td>
			</tr>
			<tr>
				<td align="left">Birth Year From</td>
				<td><input name="birthyearfrom" id="birthyearfrom" /></td>
			</tr>
			<tr>
				<td align="left">Birth Year To</td>
				<td><input name="birthyearto" id="birthyearto" /></td>
			</tr>
			<tr>
				<td align="left">From</td>
				<td><input name="from" id="from" /></td>
			</tr>
			<tr>
				<td align="left">To</td>
				<td><input name="to" id="to" /></td>
			</tr>
			<tr>
				<td align="left">Page</td>
				<td><input name="page" id="page" /></td>
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