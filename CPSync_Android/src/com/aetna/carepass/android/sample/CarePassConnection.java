package com.aetna.carepass.android.sample;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;

import org.apache.http.client.ClientProtocolException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;
import android.widget.Toast;

import com.aetna.carepass.android.AuthTool;
import com.aetna.carepass.android.CarePassUris;


public class CarePassConnection {

	@SuppressLint("SimpleDateFormat") // used for REST request
	static final SimpleDateFormat SIMPLE_TIME_FORMAT = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");

	@SuppressLint("SimpleDateFormat") // used for REST request
	static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

	private static final String TAG = "CarePass";

	private static final boolean D = false;
	
	private CarePassUris uris;

	public CarePassConnection( CarePassUris webSite ){
		super();
		this.uris = webSite;
	}
	
	public void close() {
	}
	
	/**
	 * Download the latest user details from the server and set the UserBean to
	 * contain them.
	 * 
	 * @param from the containing activity or service context
	 * @param forUser the user bean to modify
	 * @throws ClientProtocolException
	 * @throws IOException
	 * @throws IllegalStateException
	 *             if there is a parse error on the server data
	 * @throws IllegalArgumentException
	 *             if the server reports an error in the input
	 */
	@SuppressLint("DefaultLocale")
	public JSONObject getIdentity(Context from) 
			throws ClientProtocolException, IOException {
		return getJsonObject( from, uris.URL_IDENTITY_GET );
	}

	/** Gets gender and age, among other things */
	@SuppressLint("DefaultLocale")
	public JSONObject getIdentityBio(Context from) 
			throws ClientProtocolException, IOException {
		return getJsonObject( from, uris.URL_IDENTITY_BIO );
	}

	/**
	 * Gets the latest height and weight measurements.
	 */
	@SuppressLint("DefaultLocale")
	public JSONArray getLatestMeasurements(Context from) 
			throws ClientProtocolException, IOException {
		return getJsonArray(from, uris.URL_MEASUREMENTS_LATEST );
	}

	@SuppressLint("DefaultLocale")
	public JSONObject getJsonObject( Context from, String uri ) throws IOException { 
		if( !isConnected() ) {
			throw new IOException("Internet not available: not connected");
		}
		final SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(from);
		String accessToken = prefs.getString( AuthTool.PREF_TOKEN, "" );
		try { 
			return errCheckOnObject( doSimpleGet(accessToken, uri) );
		} catch (MalformedURLException e) {
			throw new IllegalStateException(e);
		} catch (JSONException e) {
			throw new IllegalStateException(e);
		}
	}
		
	@SuppressLint("DefaultLocale")
	public JSONArray getJsonArray( Context from, String uri ) throws IOException { 
		if( !isConnected() ) {
			throw new IOException("Internet not available: not connected");
		}
		final SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(from);
		String accessToken = prefs.getString( AuthTool.PREF_TOKEN, "" );
		try { 
			return errCheckOnArray( doSimpleGet(accessToken, uri) );
		} catch (MalformedURLException e) {
			throw new IllegalStateException(e);
		} catch (JSONException e) {
			throw new IllegalStateException(e);
		}
	}

	private Object doSimpleGet(String accessToken, String url)
			throws MalformedURLException, IOException, JSONException {
		URL u = new URL(url);
		HttpURLConnection con = (HttpURLConnection) u.openConnection();
		try {
		con.addRequestProperty("Authorization", "Bearer " + accessToken);
		con.addRequestProperty("Accept", "application/json");
		// Does the api key need to be sent? some docs say yes, some no.
		// it is redundant with the access bearer token, so I'm skipping it
		// for now.
		con.addRequestProperty("Apikey", "sfs9t8wmn2xz7swdpjjjbteq");
		int responseCode = con.getResponseCode();
		if(D) Log.v(TAG, "Response received w/ code: " + responseCode);
		InputStream is;
		if (responseCode < 200 || responseCode >= 300 ) {
			is = con.getErrorStream();
		} else {
			is = con.getInputStream();
		}
		
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new InputStreamReader(is));
			StringBuilder sb = new StringBuilder();
			for(;;) {
				String nextLine = reader.readLine();
				if(null==nextLine) break;
				sb.append(nextLine);
			}
			return smartToJson(sb);
		} finally {
			if(null != reader) {
				reader.close();
			} else {
				is.close();
			}
		}
		} finally {
			con.disconnect();
		}
	}

	private Object doSimplePost(String accessToken, String url, String toPost)
			throws MalformedURLException, IOException, JSONException {
		URL u = new URL(url);
		HttpURLConnection con = (HttpURLConnection) u.openConnection();
		try {
			con.setDoOutput(true);
			con.setRequestMethod("POST");
			con.addRequestProperty("Authorization", "Bearer " + accessToken);
			con.addRequestProperty("Accept", "application/json");
			con.addRequestProperty("Content-Type", "application/json; charset=utf-8");
			
            byte[] bytes = toPost.getBytes("utf-8");
            OutputStream post = con.getOutputStream();
            try {
	            post.write(bytes);
            } finally {
            	post.close();
            }

			int responseCode = con.getResponseCode();
			InputStream is;
			if(responseCode < 200 || 300 <= responseCode) {
				// error condition
				is = con.getErrorStream();
			} else {
				is = con.getInputStream();
			}
			BufferedReader reader = null;
			try {
				reader = new BufferedReader(new InputStreamReader(is));
				StringBuilder sb = new StringBuilder();
				for(;;) {
					String nextLine = reader.readLine();
					if(null==nextLine) break;
					sb.append(nextLine);
				}
				return smartToJson(sb);
			} finally {
				if(null != reader) {
					reader.close();
				} else {
					is.close();
				}
			}
		} finally {
			con.disconnect();
		}
	}

	private Object smartToJson(StringBuilder sb) throws JSONException {
		int firstIndex = sb.indexOf("[");
		int firstBrace = sb.indexOf("{");
		if(0<= firstBrace && (firstBrace < firstIndex || firstIndex < 0)) {
			JSONObject obj = new JSONObject(sb.toString());
			return obj;
		} else if(0 <= firstIndex) {
			JSONArray arr = new JSONArray(sb.toString());
			return arr;
		}
		return sb.toString();
	}

	public JSONArray getWorkouts( Context from, long start, long end )
			throws ClientProtocolException, IOException, JSONException {
		ready(from);
		final SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(from);
		String accessToken = prefs.getString( AuthTool.PREF_TOKEN, "");
		String fromDate = SIMPLE_DATE_FORMAT.format(start);
		String toDate = SIMPLE_DATE_FORMAT.format(end);
		String fitnessUri = uris.URL_FITNESS_ALL + "?fromDate=" + fromDate + "&toDate=" + toDate;
		JSONArray measurements = errCheckOnArray( doSimpleGet(accessToken, fitnessUri) );
		return measurements;
	}
	
	public JSONArray getBodyMeasurements( Context from, long start, long end, String measurementType )
			throws ClientProtocolException, IOException, JSONException {
		ready(from);
		final SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(from);
		String accessToken = prefs.getString( AuthTool.PREF_TOKEN, "");
		String fromDate = SIMPLE_DATE_FORMAT.format(start);
		String toDate = SIMPLE_DATE_FORMAT.format(end);
		Object o = doSimpleGet(accessToken, uris.URL_MEASUREMENTS_ALL + "?fromDate=" + fromDate 
				+ "&toDate=" + toDate + "&measurementType=" + measurementType);
		JSONArray measurements = errCheckOnArray(o);
		return measurements;
	}

	private JSONArray errCheckOnArray(Object o) throws JSONException {
		if (o instanceof JSONObject) {
			JSONObject jo = (JSONObject) o;
			if( jo.has("errorCode") ){
				Object errorCode = jo.get("errorCode");
				if (errorCode instanceof String) {
					if ("000".equals(errorCode))
						return new JSONArray();
				}
			}
			throw new JSONException(String.valueOf(o));
		}
		if (!(o instanceof JSONArray)) throw new JSONException(String.valueOf(o));
		return (JSONArray) o;
	}
	private JSONObject errCheckOnObject(Object o) throws JSONException {
		Object o1 = o;
		if (o instanceof JSONArray) {
			// we were expecting an object. Maybe a one-element 
			// array was returned by mistake?
			JSONArray a = (JSONArray) o;
			if( 1 != a.length() ) {
				throw new JSONException(String.valueOf(o1));
			}
			o = a.get(0);
		}
		if (!(o instanceof JSONObject)) {
			throw new JSONException(String.valueOf(o1));
		}
		JSONObject jo = (JSONObject) o;
		if( jo.has("errorCode") ){
			Object errorCode = jo.get("errorCode");
			if (errorCode instanceof String) {
				throw new JSONException(String.valueOf(o));
			} else {
				throw new JSONException(String.valueOf(o1));
			}
		}
		return jo;
	}
	

	/**
	 * Generates a JSON object to send to the carepass body measurement 
	 * endpoint. 
	 * 
	 * See: https://developer.carepass.com/docs/read/carepass/body/health_body_measurements_POST
	 * 
	 *    {
	 *        "sourceType": "Device",
	 *        "deviceName": "Withings WBS01 Body Scale",
	 *        "originAppName": "Health Vault",
	 *        "measurementType": "Weight",
	 *        "numericValue": 186,
	 *        "valueUnit": "lb",
	 *        "date": "2012-07-01",
	 *        "time": "2012-07-04T15:23:42-0400",
	 *        "notes": "Lost 2 pounds this week!"
	 *    }
	 * }}}
	 * @param from
	 * @param event
	 * @return
	 * @throws JSONException
	 */
//	private String buildBodyMeasurementJson(Context from, MeasurementEvent event)
//			throws JSONException {
//		JSONObject obj = new JSONObject();
//		obj.put("sourceType", event.getSourceType());
//		if(null != event.getDeviceName()) obj.put("deviceName", event.getDeviceName());
//		if(null != event.getOriginApp()) obj.put("originAppName", event.getOriginApp());
//		obj.put("measurementType", event.getMeasurementType());
//		obj.put("numericValue", event.getNumericValue());
//		if(null != event.getValueUnit()) obj.put("valueUnit", event.getValueUnit());
//		obj.put("date", event.getDay());
//		SimpleDateFormat startFormat = SIMPLE_TIME_FORMAT;
//		Date startTimeD = new Date(event.getStartTime());
//		obj.put("time", startFormat.format(startTimeD));
//		if(null != event.getNotes()) obj.put("notes", event.getNotes());
//		return obj.toString();
//	}


	public static String getOriginAppName(Context from) {
		return from.getApplicationInfo().name;
	}

	private void ready(Context from) {
		if( !isConnected() ) {
			Toast.makeText(from, from.getString( R.string.enable_internet ), Toast.LENGTH_SHORT).show();
			throw new RuntimeException("No network available");
		}
	}

	private boolean isConnected() {
		// TODO check for internet connectivity
		return true;
	}

	public CarePassUris getServer() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
