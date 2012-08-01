<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<jsp:include page="structure/head.jsp" />

<body>
	<table>
		<tr>
			<td colspan="2" align="left">Login</td>
		</tr>
		<tr>
			<td>1-</td>
			<td><a href="<c:url value="/loging-oauth.htm" />">Login with
					CarePass</a></td>
		</tr>
		<tr>
			<td>2-</td>
			<td><a href="<c:url value="/hhs-endpoints.htm" />">HHS Endpoints</a>
			</td>
		</tr>
	</table>
	
	<div id="error">
		<h2>Error</h2>
		<c:out value="${error}"></c:out>
		<br />
	</div>
</body>
<script>
showReply("${error.length()}", error);
</script>
</html>