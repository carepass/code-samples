<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>CarePass SyncEndpoints</title>
</head>
<body>
<h2 class="head">Appointment put</h2>
	<ul>
		<li>Appointments
			<ul>

				<li>Appointment Put

					<form method="get" action="appointment-put.htm" id="cufa1">
						<table border="0">
							<tr>
								<td>Appointment Id</td>
								<td><input name="appId" id="appId" />
							</tr>
							<tr>
								<td>Appointment Start</td>
								<td><input name="appStart" id="appStart" /></td>
							</tr>
							<tr>
								<td>Appointment End</td>
								<td><input name="appEnd" id="appEnd" />
								</td>
							</tr>
							<tr>
								<td>Schedule Date</td>
								<td><input name="appScheduleDate" id="appScheduleDate" />
								</td>
							</tr>
							<tr>
								<td>Type</td>
								<td><input name="appType" id="appType" />
								</td>
							</tr>
							<tr>
								<td>Reason</td>
								<td><input name="appReason" id="appReason" />
								</td>
							</tr>
							<tr>
								<td>National identifier for providers</td>
								<td><input name="appProviderId" id="appProviderId" />
								</td>
							</tr>
							<tr>
								<td>Facility Name</td>
								<td><input name="appFacilityName" id="appFacilityName" />
								</td>
							</tr>
							<tr>
								<td>Line 1</td>
								<td><input name="appLine1" id="appLine1" />
								</td>
							</tr>
							<tr>
								<td>Line 2</td>
								<td><input name="appLine2" id="appLine2" />
								</td>
							</tr>
							<tr>
								<td>City</td>
								<td><input name="appCity" id="appCity" />
								</td>
							</tr>
							<tr>
								<td>State</td>
								<td><input name="appState" id="appState" />
								</td>
							</tr>
							<tr>
								<td>Postal Code</td>
								<td><input name="appPC" id="appPC" />
								</td>
							</tr>
							<tr>
								<td>Carrier Id</td>
								<td><input name="appCarrierId" id="appCarrierId" />
								</td>
							</tr>
							<tr>
								<td>Plan Id</td>
								<td><input name="appPlanId" id="appPlanId" />
								</td>
							</tr>
							<tr>
								<td>CarePass Provider Id</td>
								<td><input name="appCarepassProviderId"
									id="appCarepassProviderId" /></td>
							</tr>
							<tr>
								<td>Status</td>
								<td><input name="appStatus" id="appStatus" />
								</td>
							</tr>
							<tr>
								<td colspan="2" align="right"><input type="submit"
									value="Go" />
								</td>
							</tr>
						</table>
					</form></li>
			</ul>
	</ul>

</body>
</html>