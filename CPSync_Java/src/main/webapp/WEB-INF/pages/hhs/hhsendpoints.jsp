<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="../structure/head.jsp" />
<body>
	<table>
		<tr>
			<td colspan="2" align="left">HHS Endpoints</td>
		</tr>
		<tr>
			<td>1-</td>
			<td><a href="<c:url value="/hhs-api.htm" />">HHS</a></td>
		</tr>
		<tr>
			<td>2-</td>
			<td><a href="<c:url value="/good-rx-api.htm" />">GoodRX</a></td>
		</tr>
		<tr>
			<td>3-</td>
			<td><a href="<c:url value="/ecc-api.htm" />">Estimated Cost of Care</a></td>
		</tr>
		<tr>
			<td>4-</td>
			<td><a href="<c:url value="/claims-api.htm" />">De-Identificated Claims</a></td>
		</tr>
		
	</table>
</body>
</html>