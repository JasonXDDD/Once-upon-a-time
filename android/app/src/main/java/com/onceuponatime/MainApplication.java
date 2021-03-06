package com.onceuponatime;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.zmxv.RNSound.RNSoundPackage;
import org.reactnative.camera.RNCameraPackage;
import cl.json.RNSharePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.rnfs.RNFSPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.terrylinla.rnsketchcanvas.SketchCanvasPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

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
            new CameraRollPackage(),
            new RNSoundPackage(),
            new RNCameraPackage(),
            new RNSharePackage(),
            new ReactVideoPackage(),
            new RNFSPackage(),
            new RNViewShotPackage(),
            new SvgPackage(),
            new RNDeviceInfo(),
            new SketchCanvasPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
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
  }
}
