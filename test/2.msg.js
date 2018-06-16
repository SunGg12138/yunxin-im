const debug = require('debug')('test');
const expect = require('chai').expect;
const test_config = require('./config');
const YunxinIM = require('../index');
const yunxinIM = new YunxinIM('118acf7269bc0e3b890781c65e385f28', '3abf9884a82c');

describe('2.消息部分', function(){
  before(function(done){
    (async function(){
      accid = await test_config.createUser(yunxinIM);
      accid2 = await test_config.createUser(yunxinIM);
      done();
    })();
  });
  it('发送普通消息', function(done){
    yunxinIM.exec('msg/sendMsg.action', {
      from: accid,
      ope: 0,
      to: accid2,
      type: 0,
      body: JSON.stringify({
        "msg":"hello"
      })
    })
    .then(function(data){
      debug('exec: msg/sendMsg.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('批量发送点对点普通消息', function(done){
    yunxinIM.exec('msg/sendBatchMsg.action', {
      fromAccid: accid,
      toAccids: JSON.stringify([accid2, 'xx']),
      type: 0,
      body: JSON.stringify({
        "msg":"hello"
      })
    })
    .then(function(data){
      debug('exec: msg/sendBatchMsg.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('发送自定义系统通知', function(done){
    yunxinIM.exec('msg/sendAttachMsg.action', {
      from: accid,
      msgtype: 0,
      to: accid2,
      attach: JSON.stringify({
        body: '消息'
      })
    })
    .then(function(data){
      debug('exec: msg/sendAttachMsg.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('批量发送点对点自定义系统通知', function(done){
    yunxinIM.exec('msg/sendBatchAttachMsg.action', {
      fromAccid: accid,
      toAccids: JSON.stringify([accid2]),
      attach: JSON.stringify({
        body: '消息'
      })
    })
    .then(function(data){
      debug('exec: msg/sendBatchAttachMsg.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('文件上传', function(done){
    let data = require('fs').readFileSync(__filename, 'base64')
    yunxinIM.exec('msg/upload.action', {
      content: data
    })
    .then(function(data){
      debug('exec: msg/upload.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  // it('文件上传（multipart方式）', function(done){
  //   let data = require('fs').readFileSync(__filename, 'base64')
  //   yunxinIM.exec('msg/fileUpload.action', {
  //     content: data
  //   })
  //   .then(function(data){
  //     debug('exec: msg/fileUpload.action, 返回：', JSON.stringify(data, null, 4));
  //     expect(data.code === 200).to.be.ok;
  //     done();
  //   }, function(error){
  //     throw error;
  //   });
  // });
  it('消息撤回', function(done){
    (async function(){
      let body = await yunxinIM.exec('msg/sendMsg.action', {
        from: accid,
        ope: 0,
        to: accid2,
        type: 0,
        body: JSON.stringify({
          "msg":"hello"
        })
      });
      let timetag = Math.floor(new Date().getTime() / 1000);
      debug('发送消息, 返回：', JSON.stringify(body, null, 4));
      await yunxinIM.exec('msg/recall.action', {
        deleteMsgid: body.data.msgid,
        timetag: timetag,
        type: 7,
        from: accid,
        to: accid2,
        // msg: 'hello'
      })
      .then(function(data){
        debug('exec: msg/recall.action, 返回：', JSON.stringify(data, null, 4));
        if (data.desc === 'some param not match message') {
        } else {
          expect(data.code === 200).to.be.ok;
        }
        done();
      }, function(error){
        throw error;
      });
    })();
  });
  it('发送广播消息', function(done){
    yunxinIM.exec('msg/broadcastMsg.action', {
      body: '123',
      // from: accid
    })
    .then(function(data){
      debug('exec: msg/broadcastMsg.action, 返回：', JSON.stringify(data, null, 4));
      if (data.code === 403) {
        debug('该功能目前需申请开通，详情可咨询您的客户经理');
      } else {
        expect(data.code === 200).to.be.ok;
      }
      done();
    }, function(error){
      throw error;
    });
  });
});