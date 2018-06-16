const debug = require('debug')('test');
const expect = require('chai').expect;
const test_config = require('./config');
const YunxinIM = require('../index');
const yunxinIM = new YunxinIM('118acf7269bc0e3b890781c65e385f28', '3abf9884a82c');

describe('5.历史记录部分', function(){
  before(function(done){
    (async function(){
      accid = await test_config.createUser(yunxinIM);
      accid2 = await test_config.createUser(yunxinIM);
      tid = await test_config.createTeam(yunxinIM, accid, accid2);
      chatroomid = await test_config.createChatroom(yunxinIM, accid);
      done();
    })();
  });
  it('单聊云端历史消息查询', function(done){
    let time = new Date().getTime();
    yunxinIM.exec('history/querySessionMsg.action', {
      from: accid,
      to: accid2,
      begintime: time - 1000,
      endtime: time,
      limit: 10
    })
    .then(function(data){
      debug('exec: history/querySessionMsg.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('群聊云端历史消息查询', function(done){
    let time = new Date().getTime();
    yunxinIM.exec('history/queryTeamMsg.action', {
      tid: tid,
      accid: accid,
      begintime: time - 1000,
      endtime: time,
      limit: 10
    })
    .then(function(data){
      debug('exec: history/queryTeamMsg.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('聊天室云端历史消息查询', function(done){
    let time = new Date().getTime();
    yunxinIM.exec('history/queryChatroomMsg.action', {
      roomid: chatroomid,
      accid: accid,
      timetag: time,
      limit: 10
    })
    .then(function(data){
      debug('exec: history/queryChatroomMsg.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('删除聊天室云端历史消息', function(done){
    let time = new Date().getTime();
    yunxinIM.exec('chatroom/deleteHistoryMessage.action', {
      roomid: chatroomid,
      fromAcc: accid,
      msgTimetag: time
    })
    .then(function(data){
      debug('exec: chatroom/deleteHistoryMessage.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 404).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('用户登录登出事件记录查询', function(done){
    let time = new Date().getTime();
    yunxinIM.exec('history/queryUserEvents.action', {
      accid: accid,
      begintime: time - 1000,
      endtime: time,
      limit: 10
    })
    .then(function(data){
      debug('exec: history/queryUserEvents.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  // it('删除音视频/白板服务器录制文件', function(done){
  //   let time = new Date().getTime();
  //   yunxinIM.exec('history/deleteMediaFile.action', {
  //     accid: accid,
  //     begintime: time - 1000,
  //     endtime: time,
  //     limit: 10
  //   })
  //   .then(function(data){
  //     debug('exec: history/deleteMediaFile.action, 返回：', JSON.stringify(data, null, 4));
  //     expect(data.code === 200).to.be.ok;
  //     done();
  //   }, function(error){
  //     throw error;
  //   });
  // });
});