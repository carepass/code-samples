<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="structure/head.jsp" />
<body>
	<h1>Endpoint Response</h1>

	<c:choose>
		<c:when test="${response != null}">

			<div id="response">
				<h2>Server Response</h2>
				<c:out value="${response}"></c:out>
			</div>
		</c:when>
		<c:otherwise>
			<div id="error">
				<h2>Error</h2>
				<c:out value="${error}"></c:out>
				<br />
			</div>
		</c:otherwise>
	</c:choose>
	<h2>
		<a href="${goBackUrl}">Return</a>
	</h2>

</body>



</html>