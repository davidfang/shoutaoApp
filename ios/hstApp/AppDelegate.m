/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "SplashScreen.h"  // here
#import "RNUMConfigure.h"
#import <UMAnalytics/MobClick.h>
#import <UMShare/UMShare.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [UMConfigure setLogEnabled:YES];
  
  /* Umeng init */
  [MobClick setScenarioType:E_UM_GAME|E_UM_DPLUS];
  [RNUMConfigure initWithAppkey:@"5b8f98c2f29d98484500025c" channel:@"App Store"];
  // U-Share 平台设置
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wx817233cd6c70c0e3" appSecret:@"5754d2d653951cd068113a4d0cdbd65f" redirectURL:@"url"];
  //关闭强制验证https，可允许http图片分享，但需要在info.plist设置安全域名
  [UMSocialGlobal shareInstance].isUsingHttpsWhenShareContent = NO;
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"hstApp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [SplashScreen show];  // here
  return YES;
}
//设置系统回调 支持所有iOS系统
//注：此方法在swift4.1(Xcode 9.3)已废弃，Objective-C项目不影响。 新浪 平台外的其他平台可在使用另外两种回调方法。请看官方文档
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
  BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
  if (!result) {
    // 其他如支付等SDK的回调
  }
  return result;
}

@end
