package com.zhicaikeji.shengqian123;

import android.content.Intent;
import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here

import com.zhicaikeji.shengqian123.invokenative.ShareModule;
import com.umeng.analytics.MobclickAgent;
import  com.umeng.analytics.MobclickAgent.EScenarioType;
import com.umeng.socialize.UMShareAPI;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "hstApp";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        MobclickAgent.setSessionContinueMillis(1000);
        MobclickAgent.setScenarioType(this, EScenarioType.E_DUM_NORMAL);
        super.onCreate(savedInstanceState);
        ShareModule.initSocialSDK(this);
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
    }
    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }
    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }
}
