package com.aetna.carepass.android.sample;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

public class CarePassSampleActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_care_pass_sample);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.care_pass_sample, menu);
		return true;
	}

}
