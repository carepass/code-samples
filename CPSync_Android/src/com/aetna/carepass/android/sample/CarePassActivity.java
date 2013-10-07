package com.aetna.carepass.android.sample;

import java.io.IOException;

import org.apache.http.client.ClientProtocolException;
import org.json.JSONException;

import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;

import com.aetna.carepass.android.AuthErrorDetails;
import com.aetna.carepass.android.AuthResponseDetails;
import com.aetna.carepass.android.AuthResponseHandler;
import com.aetna.carepass.android.CarePassUris;
import com.aetna.carepass.android.InitFragment;
import com.aetna.carepass.android.R;

public class CarePassActivity extends ActionBarActivity implements
		AuthResponseHandler {

	private static final String CAREPASS_AUTHORITIES = "IDENTITY,BODYMEASUREMENT,FITNESS";
	private static final CarePassUris CAREPASS_URIS = new CarePassUris();

	private InitFragment initFragment;

	@Override
	protected void onCreate(Bundle arg0) {
		super.onCreate(arg0);
		setContentView(R.layout.init);
		initFragment = (InitFragment) getSupportFragmentManager()
				.findFragmentById(R.id.fragment_init_oauth);
		initFragment.setRequestedScope(CAREPASS_AUTHORITIES);
		initFragment.setResponseHandler( this );
	}
	
	@Override
	public void onAccessTokenReceived(final AuthResponseDetails response) {
		runOnUiThread(new Runnable() {
			@Override
			public void run() {
				AsyncTask<AuthResponseDetails, Integer, String> task = new AsyncTask<AuthResponseDetails, Integer, String>() {
					@Override
					protected String doInBackground(AuthResponseDetails... params) {
						CarePassConnection connection = new CarePassConnection( CAREPASS_URIS );
						try {
							return connection.getIdentity( getApplicationContext() ).toString(3);
						} catch (ClientProtocolException e) {
							return e.getMessage();
						} catch (IOException e) {
							return e.getMessage();
						} catch (JSONException e) {
							return e.getMessage();
						}
					}
					
					@Override
					protected void onPostExecute(String result) {
						initFragment.setDisplayedTextMessage(result);
					}
				};
				task.execute(response);
			}
		});
	}

	@Override
	public void onAuthFailed(AuthErrorDetails err) {
		initFragment.setDisplayedTextMessage(err.getError() + ": "
				+ err.getErrorDescription());
	}
}
