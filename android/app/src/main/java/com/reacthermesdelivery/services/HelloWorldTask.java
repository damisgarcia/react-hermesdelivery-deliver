package com.reacthermesdelivery.services;

import android.content.Intent;
import android.support.annotation.Nullable;
import android.os.Bundle;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class HelloWorldTask extends HeadlessJsTaskService {
  @Override
  protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    WritableMap data = extras != null ? Arguments.fromBundle(extras) : null;

    return new HeadlessJsTaskConfig(
      "HelloWorldTask",
      data,
    3000);
  }
}
