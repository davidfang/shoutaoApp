package com.zhicaikeji.quanzhenduo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.zhicaikeji.quanzhenduo.invokenative.DplusReactPackage;
import com.zhicaikeji.quanzhenduo.invokenative.RNUMConfigure;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PickerPackage(),
            new ReactNativeConfigPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new DplusReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    RNUMConfigure.init(this, "5b8e30c48f4a9d1bc6000082", "guanwang", UMConfigure.DEVICE_TYPE_PHONE,"");
  }

  {
      PlatformConfig.setWeixin("wx817233cd6c70c0e3", "5754d2d653951cd068113a4d0cdbd65f");
      //PlatformConfig.setQQZone("qqid", "");
  }

}
