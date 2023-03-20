# yunxin-im

## 安装

```bash
$ npm install node-yunxin-im
```

## 使用

```javascript
const YunxinIM = require('node-yunxin-im');
const yunxinIM = new YunxinIM('<你的AppKey>', '<你的AppSecret>');

// 创建用户
await yunxinIM.exec('user/create.action', {
  accid: 'accid',
  donnopOpen: false
});

// 创建群
await yunxinIM.exec('team/create.action', {
  tname: 'tname',
  owner: 'accid',
  members: JSON.stringify([]),
  msg: '邀请你来群',
  magree: 0,
  joinmode: 0
});

// path为/nimserver/的直接使用简化的命令就可以了
// path不为/nimserver/的需要指明全路径
// 例如: sms
await yunxinIM.exec('https://api.netease.im/sms/sendcode.action', {
  mobile: 'xxxxxxxxxxxx'
});
```
[详细文档](./docs)

## 测试

```bash
# 因为接口都相似，我只拿用户部分的接口作了测试
# 需要在test/1.user.js配置你的AppKey，AppSecret
$ mocha
```

## 错误码快查

code| 详细描述
----|----
200 | 操作成功
201 | 客户端版本不对，需升级sdk
301 | 被封禁
302 | 用户名或密码错误
315 | IP限制
403 | 非法操作或没有权限
404 | 对象不存在
405 | 参数长度过长
406 | 对象只读
408 | 客户端请求超时
413 | 验证失败(短信服务)
414 | 参数错误
415 | 客户端网络问题
416 | 频率控制
417 | 重复操作
418 | 通道不可用(短信服务)
419 | 数量超过上限
422 | 账号被禁用
431 | HTTP重复请求
500 | 服务器内部错误
503 | 服务器繁忙
508 | 消息撤回时间超限
509 | 无效协议
514 | 服务不可用
998 | 解包错误
999 | 打包错误
801 | 群人数达到上限
802 | 没有权限
803 | 群不存在
804 | 用户不在群
805 | 群类型不匹配
806 | 创建群数量达到限制
807 | 群成员状态错误
808 | 申请成功
809 | 已经在群内
810 | 邀请成功
9102 | 通道失效
9103 | 已经在他端对这个呼叫响应过了
11001 | 通话不可达，对方离线状态
13001 | IM主连接状态异常
13002 | 聊天室状态异常
13003 | 账号在黑名单中,不允许进入聊天室
13004 | 在禁言列表中,不允许发言
13005 | 用户的聊天室昵称、头像或成员扩展字段被反垃圾
10431 | 输入email不是邮箱
10432 | 输入mobile不是手机号码
10433 | 注册输入的两次密码不相同
10434 | 企业不存在
10435 | 登陆密码或帐号不对
10436 | app不存在
10437 | email已注册
10438 | 手机号已注册
10441 | app名字已经存在