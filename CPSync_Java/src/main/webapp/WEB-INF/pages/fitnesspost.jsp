<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
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
					
					<form method="get" action="fitness-post.htm" id="cufp">
						<table border="0">
						
							<tr>
								<td>Description</td>
								<td><input name="fitnessDescription" id="fitnessDescription" />
								</td>								
							</tr>
							<tr>
								<td>Notes</td>
								<td><input name="fitnessNote" id="fitnessNote" />
								</td>								
							</tr>
							<tr>
								<td>Type of activity</td>
								<td><input name="fitnessType" id="fitnessType" />
								</td>								
							</tr>
							<tr>
								<td>Extra Types of activity</td>
								<td><input name="fitnessExtraType" id="fitnessExtraType" />
								</td>								
							</tr>
							<tr>
								<td>Date</td>
								<td><input name="fitnessDate" id="fitnessDate" />
								</td>								
							</tr>
							<tr>
								<td>Start Time</td>
								<td><input name="fitnessStartTime" id="fitnessStartTime" />
								</td>								
							</tr>
							<tr>
								<td>End Time</td>
								<td><input name="fitnessEndTime" id="fitnessEndTime" />
								</td>								
							</tr>
							<tr>
								<td>Start City</td>
								<td><input name="fitnessStartCity" id="fitnessStartCity" />
								</td>								
							</tr>
							<tr>
								<td>End City</td>
								<td><input name="fitnessEndCity" id="fitnessEndCity" />
								</td>								
							</tr>
							<tr>
								<td>Start State</td>
								<td><input name="fitnessStartState" id="fitnessStartState" />
								</td>								
							</tr>
							<tr>
								<td>End Sate</td>
								<td><input name="fitnessEndState" id="fitnessEndState" />
								</td>								
							</tr>
							<tr>
								<td>Start Country</td>
								<td><input name="fitnessStartCountry" id="fitnessStartCountry" />
								</td>								
							</tr>
							<tr>
								<td>End Country</td>
								<td><input name="fitnessEndCountry" id="fitnessEndCountry" />
								</td>								
							</tr>
							<tr>
								<td>Start Latitude </td>
								<td><input name="fitnessStartLatitude" id="fitnessStartLatitude" />
								</td>								
							</tr>
							<tr>
								<td>Start Longitude</td>
								<td><input name="fitnessStartLongitude" id="fitnessStartLongitude" />
								</td>								
							</tr>
							<tr>
								<td>End Latitude </td>
								<td><input name="fitnessEndLatitude" id="fitnessEndLatitude" />
								</td>								
							</tr>
							
							<tr>
								<td>End Longitude</td>
								<td><input name="fitnessEndLongitude" id="fitnessEndLongitude" />
								</td>								
							</tr>
							<tr>
								<td>Calories Burned</td>
								<td><input name="fitnessCaloriesBurned" id="fitnessCaloriesBurned" />
								</td>								
							</tr>
							<tr>
								<td>Distance</td>
								<td><input name="fitnessDistance" id="fitnessDistance" />
								</td>								
							</tr>
							<tr>
								<td>Last Update</td>
								<td><input name="fitnessLastUpdate" id="fitnessLastUpdate" />
								</td>								
							</tr>
							<tr>
								<td>Duration</td>
								<td><input name="fitnessDuration" id="fitnessDuration" />
								</td>								
							</tr>
								<tr>
								<td>Distance Unit</td>
								<td><input name="fitnessDistanceUnit" id="fitnessDistanceUnit" />
								</td>								
							</tr>
							
							<tr>
								<td colspan="2" align="right"><input type="submit"
									value="Go" /></td>

							</tr>
						</table>
					</form>
				</li>
			</ul>
	</ul>

</body>
</html>