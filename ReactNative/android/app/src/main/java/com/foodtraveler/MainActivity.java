package com.labis.foodtraveler;

import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import org.devio.rn.splashscreen.SplashScreen; // here

// for https
import com.labis.foodtraveler.CustomClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import okhttp3.OkHttpClient;
import android.os.Build;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;

import android.content.Intent;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);

        // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        //     OkHttpClientProvider.setOkHttpClientFactory(new CustomClientFactory());
        // }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "FoodTraveler";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
         return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
      };
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
