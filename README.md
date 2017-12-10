# junan
军安365app

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


## 发布apk
```
cd android && ./gradlew assembleRelease
```

生成的APK文件位于android/app/build/outputs/apk/app-release.apk
### 测试应用的发行版本
```
cd android && ./gradlew installRelease
```
