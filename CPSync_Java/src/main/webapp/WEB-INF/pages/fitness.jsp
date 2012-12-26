<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="structure/head.jsp" />
<body>
	<h1>Fitness Endpoint</h1>
	<ul>
		<li>Fitness
			<ul>
				<li>Fitness Activities by date

					<form method="get" action="fitness-get-date.htm" id="cufa1">

						<table>
							<tr>
								<td>Date From</td>
								<td><input name="dateFrom" id="dateFrom" /></td>
							</tr>
							<tr>
								<td>Date To</td>
								<td><input name="dateTo" id="dateTo" /></td>
							</tr>							
							<tr>
								<td colspan="2"><input type="submit" value="Go" /></td>
							</tr>
						</table>

					</form>
				</li>
				<li><a href="<c:url value="fitness-get-types.htm"/>">Fitness Types</a></li>
				</li>
				<li>Fitness Activities by id
					<form method="get" action="fitness-get-id.htm" id="cufa2">
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

				<li><a href="<c:url value="fitness-put-redirect.htm"/>">Fitness Activities Put</a></li>
				<li><a href="<c:url value="fitness-post-redirect.htm" />">Fitness
						Activities Post</a></li>
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

	<h2><a href="${goBackUrl} ">Return</a></h2>
</body>

<script>
	showReply("${error.length()}", error);
	showReply("${response.length()}", response);
</script>
</html>