<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="structure/head.jsp" />
<body>
	<h1>Appointment Endpoint</h1>
	<ul>
		<li>Appointment
			<ul>
				<li>Appointment
						Search
					<form method="get" action="appointment-ge.htmt" id="cufa2">
						<table>
							<tr>
								<td>After Date</td>
								<td><input name="afterDate" id="afterDate" /></td>
							</tr>
							<tr>
								<td>Carepass Provider Id</td>
								<td><input name="carepassProviderId"
									id="carepassProviderId" /></td>
							</tr>
							<tr>
								<td>NPI Provider Id</td>
								<td><input name="npiProviderId" id="npiProviderId" /></td>
							</tr>
							<tr>
								<td colspan="2"><input type="submit" value="Go" /></td>
							</tr>
						</table>
					</form></li>
				<li>Appointment search by id
					<form method="get" action="appointment-get-id.htm" id="cufa2">
						<table>
							<tr>
								<td>Identification</td>
								<td><input name="id" id="id" /></td>
							</tr>

							<tr>
								<td colspan="2"><input type="submit" value="Go" /></td>
							</tr>
						</table>
					</form>
				</li>

				<li><a href="<c:url value="appointment-put-redirect.htm" />">Appointment
						Put</a></li>
				<li><a href="<c:url value="appointment-post-redirect.htm" />">Appointment
						Post</a></li>
			</ul>
		</li>
	</ul>

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
