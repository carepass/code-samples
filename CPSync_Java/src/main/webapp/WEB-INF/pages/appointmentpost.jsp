<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>CarePass SyncEndpoints</title>
</head>
<body>
	<h2 class="head">Appointment Post</h2>
	<ul>
		<li>Appointments
			<ul>

				<li>Appointment Post <form:form method="get"
						action="appointment-post.htm" commandName="appointment" id="cufa1">
						<table border="0">
							<tr>
								<td>Date</td>
								<td><form:input name="date" id="date" path="date" /></td>
							</tr>
							<tr>
								<td>Start Time</td>
								<td><form:input name="startTime" id="startTime" path="startTime" />
								</td>
							</tr>
							<tr>
								<td>End Time</td>
								<td><form:input name="endTime" id="endTime" path="endTime" />
								</td>
							</tr>
							<tr>
								<td>Scheduled Date</td>
								<td><form:input name="scheduledDate" id="scheduledDate"
									path="scheduledDate" />
								</td>
							</tr>
							<tr>
								<td>Scheduled Time</td>
								<td><form:input name="scheduledTime" id="scheduledTime"
									path="scheduledTime" />
								</td>
							</tr>
							<tr>
								<td>Reason</td>
								<td><form:input name="reason" id="reason"
									path="reason" />
								</td>
							</tr>
							<tr>
								<td>Status</td>
								<td><form:input name="status" id="status"
									path="status" />
								</td>
							</tr>
							<tr>
								<td>Type</td>
								<td><form:input name="type" id="type"
									path="type" />
								</td>
							</tr>
							<tr>
								<td colspan="2">Location</td>
							</tr>
							<tr>
								
								<td colspan="2">
								<table border="1">
									<tr>
										<td>Name</td>
										<td><form:input name="name" id="name" path="location.facilityName" />
										</td>
									</tr>
									<tr>
										<td>Line 1</td>
										<td><form:input name="line1" id="line1" path="location.line1" />
										</td>
									</tr>
									<tr>
										<td>Line 2</td>
										<td><form:input name="line2" id="line2" path="location.line2" />
										</td>
									</tr>
									<tr>
										<td>City</td>
										<td><form:input name="city" id="city" path="location.city" />
										</td>
									</tr>
									<tr>
										<td>State</td>
										<td><form:input name="state" id="state" path="location.state" />
										</td>
									</tr>
									<tr>
										<td>Postal Code</td>
										<td><form:input name="postalCode" id="postalCode" path="location.postalCode" />
										</td>
									</tr>
									<tr>
										<td>Postal Code Extended</td>
										<td><form:input name="postalCodeExtended" id="postalCodeExtended" path="location.postalCodeExtended" />
										</td>
									</tr>
									<tr>
										<td>Country</td>
										<td><form:input name="country" id="country" path="location.country" />
										</td>
									</tr>									
								</table>
								</td>
							</tr>
							<tr>
								<td colspan="2">Plan</td>
							</tr>
							<tr>
								
								<td colspan="2">
								<table border="1">
									<tr>
										<td>Carrier Id</td>
										<td><form:input name="carrierId" id="carrierId" path="plan.carrierId" />
										</td>
									</tr>
									<tr>
										<td>Plan Id</td>
										<td><form:input name="planId" id="planId" path="plan.planId" />
										</td>
									</tr>
									<tr>
										<td>Subscriber Member Id</td>
										<td><form:input name="subscriberMemberId" id="subscriberMemberId" path="plan.subscriberMemberId" />
										</td>
									</tr>
									<tr>
										<td>Member Id</td>
										<td><form:input name="memberId" id="memberId" path="plan.memberId" />
										</td>
									</tr>
									<tr>
										<td>Group number</td>
										<td><form:input name="groupNumber" id="groupNumber" path="plan.groupNumber" />
										</td>
									</tr>
																	
								</table>
								</td>
							</tr>
							<tr>
							<td colspan="2">Provider</td>
							</tr>
							<tr>
								
								<td colspan="2">
								<table border="1">
									<tr>
										<td>Provider First Name</td>
										<td><form:input name="providerFirstName" id="providerFirstName" path="provider.providerFirstName" />
										</td>
									</tr>
									<tr>
										<td>Provider Last Name</td>
										<td><form:input name="providerLastName" id="providerLastName" path="provider.providerLastName" />
										</td>
									</tr>
									<tr>
										<td>Provider Specialty</td>
										<td><form:input name="providerSpecialty" id="providerSpecialty" path="provider.providerSpecialty" />
										</td>
									</tr>
									<tr>
										<td>Provider Id Type</td>
										<td><form:input name="providerIdType" id="providerIdType" path="provider.providerIdType" />
										</td>
									</tr>
									<tr>
										<td>Provider Id Value</td>
										<td><form:input name="providerIdValue" id="providerIdValue" path="provider.providerIdValue" />
										</td>
									</tr>
																	
								</table>
								</td>
							</tr>

							<tr>
								<td colspan="2" align="right"><input type="submit"
									value="Go" />
								</td>
							</tr>
						</table>
					</form:form></li>
			</ul>
	</ul>

</body>
</html>