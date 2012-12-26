<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>CarePass SyncEndpoints</title>
</head>
<body>

	<h2 class="head">Fitness Post</h2>
	<ul>
		<li>Fitness
			<ul>

				<li>Fitness Post
					
					<form:form method="get" action="fitness-post.htm" id="cufp" commandName="fitness">
						<table border="0">
						
							<tr>
								<td>Description</td>
								<td><form:input name="fitnessDescription" id="fitnessDescription" path="description" />
								</td>								
							</tr>
							<tr>
								<td>Notes</td>
								<td><form:input name="fitnessNote" id="fitnessNote" path="notes" />
								</td>								
							</tr>
							<tr>
								<td>Type of activity</td>
								<td><form:input name="fitnessType" id="fitnessType" path="type"/>
								</td>								
							</tr>
							<tr>
								<td>Extra Types of activity</td>
								<td><form:input name="fitnessExtraType" id="fitnessExtraType" path="typeExtra" />
								</td>								
							</tr>
							<tr>
								<td>Date</td>
								<td><form:input name="fitnessDate" id="fitnessDate" path="date" />
								</td>								
							</tr>
							<tr>
								<td>Start Time</td>
								<td><form:input name="fitnessStartTime" id="fitnessStartTime" path="startTime" />
								</td>								
							</tr>
							<tr>
								<td>End Time</td>
								<td><form:input name="fitnessEndTime" id="fitnessEndTime" path="endTime" />
								</td>								
							</tr>
							<tr>
								<td>Start City</td>
								<td><form:input name="fitnessStartCity" id="fitnessStartCity" path="startCity" />
								</td>								
							</tr>
							<tr>
								<td>End City</td>
								<td><form:input name="fitnessEndCity" id="fitnessEndCity" path="endCity"/>
								</td>								
							</tr>
							<tr>
								<td>Start State</td>
								<td><form:input name="fitnessStartState" id="fitnessStartState" path="startState"/>
								</td>								
							</tr>
							<tr>
								<td>End State</td>
								<td><form:input name="fitnessEndState" id="fitnessEndState" path="endState"/>
								</td>								
							</tr>
							<tr>
								<td>Start Country</td>
								<td><form:input name="fitnessStartCountry" id="fitnessStartCountry" path="startCountry"/>
								</td>								
							</tr>
							<tr>
								<td>End Country</td>
								<td><form:input name="fitnessEndCountry" id="fitnessEndCountry" path="endCountry" />
								</td>								
							</tr>
							<tr>
								<td>Start Latitude </td>
								<td><form:input name="fitnessStartLatitude" id="fitnessStartLatitude" path="startLatitude"/>
								</td>								
							</tr>
							<tr>
								<td>Start Longitude</td>
								<td><form:input name="fitnessStartLongitude" id="fitnessStartLongitude" path="startLongitude" />
								</td>								
							</tr>
							<tr>
								<td>End Latitude </td>
								<td><form:input name="fitnessEndLatitude" id="fitnessEndLatitude" path="endLatitude"/>
								</td>								
							</tr>
							
							<tr>
								<td>End Longitude</td>
								<td><form:input name="fitnessEndLongitude" id="fitnessEndLongitude" path="endLongitude"/>
								</td>								
							</tr>
							<tr>
								<td>Calories Burned</td>
								<td><form:input name="fitnessCaloriesBurned" id="fitnessCaloriesBurned" path="caloriesBurned"/>
								</td>								
							</tr>
							<tr>
								<td>Distance</td>
								<td><form:input name="fitnessDistance" id="fitnessDistance" path="distance"/>
								</td>								
							</tr>
							<tr>
								<td>Last Update</td>
								<td><form:input name="fitnessLastUpdate" id="fitnessLastUpdate" path="lastUpdated"/>
								</td>								
							</tr>
							<tr>
								<td>Duration</td>
								<td><form:input name="fitnessDuration" id="fitnessDuration" path="duration"/>
								</td>								
							</tr>
								<tr>
								<td>Distance Unit</td>
								<td><form:input name="fitnessDistanceUnit" id="fitnessDistanceUnit" path="distanceUnit" />
								</td>								
							</tr>
							
							<tr>
								<td colspan="2" align="right"><input type="submit"
									value="Go" /></td>

							</tr>
						</table>
					</form:form>
				</li>
			</ul>
	</ul>

</body>
</html>