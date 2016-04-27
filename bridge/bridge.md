[TOC]
#      H5 接入 Hybrid 手册       
-----    

### url schema

	{schema}://{host}{path}?{query}

e.g:
```
3dker://wireless/api/getData?callback=foo
schema:3dker://wireless
host:api
path:/getData
query:callback=foo　
```
### js-native
```
schema : 3dker
host : api
query:method={methodName}&callback={jsMethodName}&p1=1&p2=2
```

### native-js

#### __bridge_callback
> 根据js-native返回的 method,  native 调用 webview中的
``__bridge_callback`` 方法, 返回数据给js

```
{
	"type" : "js method name",
	"status" :"webview_finish_load",
	"platform" : {
		 "os" : "android / ios", //操作系统
	     "osVersion" : "9.0",    //系统版本号
		 "appVersion" : "1.2"    //当前app版本
	}
}
```

#### __writeLocalStorage

>app写key/value数据到H5页面的local storage

`` __writeLocalStorage( key , value );``


### 跳转
e.g:
```
schema : 3dker
host : goto
target={forward/back}&url={scheme|url}&type={native/webView}&p1=1&p2
```

`` forword `` 路由前进 
`` back `` 路由后退