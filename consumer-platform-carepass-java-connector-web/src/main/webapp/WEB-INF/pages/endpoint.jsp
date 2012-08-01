<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="structure/head.jsp" />
<body>
	<table>
		<tr>
			<td colspan="2" align="left">CarePass Sync Endpoints</td>
		</tr>
		<tr>
			<td>1-</td>
			<td><a href="<c:url value="/identity-get.htm" />">Identity</a></td>
		</tr>
		<tr>
			<td>2-</td>
			<td><a href="<c:url value="/biography-get.htm" />">Biography</a></td>
		</tr>
		<tr>
			<td>3-</td>
			<td><a href="<c:url value="/fitness.htm" />">Fitness</a></td>
		</tr>
		<tr>
			<td>4-</td>
			<td><a href="<c:url value="/insurance.htm" />">Insurance</a></td>
		</tr>
		<tr>
			<td>5-</td>
			<td><a href="<c:url value="/lifestyle.htm" />">Lifestyle</a></td>
		</tr>
		<tr>
			<td>6-</td>
			<td><a href="<c:url value="/appointment.htm" />">Appointment</a></td>
		</tr>
	</table>
</body>
</html>