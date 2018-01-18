# junan
军安365app

# 安装
```
npm run install
```
## 调试
```
npm run android
```
### 设备信息
```
adb devices
```
 
## 调试日志输出
```
react-native log-android
```
## 显示具体错误信息
```
gradlew compileDebug --stacktrace
```
显示一些具体出错的信息

## 发布apk
生成密钥文件，密码为：junanapp
```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=junanapp
MYAPP_RELEASE_KEY_PASSWORD=junanapp
```

```
cd android && ./gradlew assembleRelease
```

生成的APK文件位于android/app/build/outputs/apk/app-release.apk
### 测试应用的发行版本
```
cd android && ./gradlew installRelease
```
