<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="structure/head.jsp" />
<body>
	<h1>Lifestyle Endpoint</h1>
	<ul>
		<li>Lifestyle
			<ul>
				<li><a href="<c:url value="lifestyle-get.htm" />">Lifestyle get</a>
				</li>

				<li><a href="<c:url value="lifestyle-put-redirect.htm" />">Lifestyle
						Put</a></li>
			</ul>
		</li>
	</ul>	

	<h2><a href="${goBackUrl}">Return</a></h2>
</body>

</html>