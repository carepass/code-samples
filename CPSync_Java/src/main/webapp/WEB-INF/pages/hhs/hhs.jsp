<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<jsp:include page="../structure/head.jsp" />
<body>

	<h1>HHS</h1>

	<h2>List of Drug Documents by NDA</h2>
	<form method="get" action="hhs-list-drugs-nda.htm" name="cufa1">
		<table border=0>
			<tr>
				<td align="left">Nda</td>
				<td><input name="nda" id="nda" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>
	<h2>List of DrugResources by NDA</h2>
	<form method="get" action="hhs-list-drugs-resources-nda.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">Nda</td>
				<td><input name="nda" id="nda" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>
	<h2>List of NDAs based on the NDA supplied</h2>
	<form method="get" action="hhs-list-nda.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">Nda</td>
				<td><input name="nda" id="nda" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>

	<h2>List of alternative therapies for the provided NDA</h2>
	<form method="get" action="hhs-list-alternatives-nda.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">Nda</td>
				<td><input name="nda" id="nda" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>
	<h2>List of images of the drugs for the given NDC2 segment</h2>
	<form method="get" action="hhs-list-img-ndc2.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">ndc2</td>
				<td><input name="ndc2" id="ndc2" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>

	<h2>List of drugs according to the given name</h2>
	<form method="get" action="hhs-list-drugs-name.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">Name</td>
				<td><input name="name" id="name" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>

	<h2>List of drugs according to the NC2 segment with its package
		info and imprints</h2>
	<form method="get" action="hhs-list-drugs-ndc2.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">NDC2</td>
				<td><input name="ndc2" id="ndc2" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>

	<h2>Package info of drug according to the given NDC2 segment and
		the NDC3 segment</h2>
	<form method="get" action="hhs-list-package-ndc2-ndc3.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">NDC2</td>
				<td><input name="ndc2" id="ndc2" /></td>
			</tr>
			<tr>
				<td align="left">NDC3</td>
				<td><input name="ndc3" id="ndc3" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>

	<h2>List ART based on the given parameter and value</h2>
	<form method="get" action="hhs-list-art.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">Clinical Name</td>
				<td><input name="clinicName" id="clinicName" /></td>
			</tr>
			<tr>
				<td align="left">City</td>
				<td><input name="city" id="city" /></td>
			</tr>
			<tr>
				<td align="left">State</td>
				<td><input name="state" id="state" /></td>
			</tr>
			<tr>
				<td align="left">Medical Director</td>
				<td><input name="medicaldirector" id="medicaldirector" /></td>
			</tr>
			<tr>
				<td align="left">Year</td>
				<td><input name="year" id="year" /></td>
			</tr>
			<tr>
				<td align="left">Exact Match</td>
				<td><INPUT TYPE=RADIO NAME="exactMatch" VALUE="true">True<BR>
					<INPUT TYPE=RADIO NAME="exactMatch" VALUE="false">False<BR></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>
	<h2>List clinical trials information according to the registry
		number indicated</h2>
	<form method="get" action="hhs-list-clinical-trials.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">NCTID</td>
				<td><input name="nctid" id="nctid" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>


	<h2>Clinical Trial based on the given parameters and values</h2>
	<form method="get" action="hhs-clinical-trials.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">Drug Name</td>
				<td><input name="drugname" id="drugname" /></td>
			</tr>
			<tr>
				<td align="left">Status</td>
				<td><input name="status" id="status" /></td>
			</tr>
			<tr>
				<td align="left">Page</td>
				<td><input name="page" id="page" /></td>
			</tr>
			<tr>
				<td align="left">Condition</td>
				<td><input name="condition" id="condition" /></td>
			</tr>
			<tr>
				<td align="left">State 1</td>
				<td><input name="state1" id="state1" /></td>
			</tr>
			<tr>
				<td align="left">State 2</td>
				<td><input name="state2" id="state2" /></td>
			</tr>
			<tr>
				<td align="left">State 3</td>
				<td><input name="state3" id="state3" /></td>
			</tr>
			<tr>
				<td align="left">Country 1</td>
				<td><input name="country1" id="country1" /></td>
			</tr>
			<tr>
				<td align="left">Country 2</td>
				<td><input name="country2" id="country2" /></td>
			</tr>
			<tr>
				<td align="left">Country 3</td>
				<td><input name="country3" id="country3" /></td>
			</tr>
			<tr>
				<td align="left">First Received From</td>
				<td><input name="firstreceivedfrom" id="firstreceivedfrom" /></td>
			</tr>
			<tr>
				<td align="left">First Received To</td>
				<td><input name="firstreceivedto" id="firstreceivedto" /></td>
			</tr>
			<tr>
				<td align="left">Last Updated From</td>
				<td><input name="lastupdatedfrom" id="lastupdatedfrom" /></td>
			</tr>
			<tr>
				<td align="left">Last Updated To</td>
				<td><input name="lastupdatedto" id="lastupdatedto" /></td>
			</tr>

			<tr>
				<td colspan="2"><input type="submit" value="Go"></td>

			</tr>
		</table>
	</form>
	<h2>List FDA Recall based on the given parameter and value</h2>

	<form method="get" action="hhs-list-fda.htm" id="cufa1">
		<table border=0>
			<tr>
				<td align="left">Product</td>
				<td><input name="product" id="product" /></td>
			</tr>
			<tr>
				<td align="left">Date</td>
				<td><input name="date" id="date" /></td>
			</tr>
			<tr>
				<td align="left">Past Days</td>
				<td><input name="pastdays" id="pastdays" value="0" /></td>
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