const debug = require('debug')('test');
const expect = require('chai').expect;
const test_config = require('./config');
const YunxinIM = require('../index');
const yunxinIM = new YunxinIM('118acf7269bc0e3b890781c65e385f28', '3abf9884a82c');

describe('4.聊天室', function(){
  before(function(done){
    (async function(){
      accid = await test_config.createUser(yunxinIM);
      accid2 = await test_config.createUser(yunxinIM);
      accid3 = await test_config.createUser(yunxinIM);
      done();
    })();
  });
  it('创建聊天室', function(done){
    yunxinIM.exec('chatroom/create.action', {
      creator: accid,
      name: 'test',
    })
    .then(function(data){
      debug('exec: chatroom/create.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      roomid = data.chatroom.roomid;
      done();
    }, function(error){
      throw error;
    });
  });
  it('查询聊天室信息', function(done){
    yunxinIM.exec('chatroom/get.action', {
      roomid: roomid
    })
    .then(function(data){
      debug('exec: chatroom/get.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('批量查询聊天室信息', function(done){
    yunxinIM.exec('chatroom/getBatch.action', {
      roomids: JSON.stringify([roomid])
    })
    .then(function(data){
      debug('exec: chatroom/getBatch.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('更新聊天室信息', function(done){
    yunxinIM.exec('chatroom/update.action', {
      roomid: roomid,
      name: 'newTest'
    })
    .then(function(data){
      debug('exec: chatroom/update.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('修改聊天室开/关闭状态', function(done){
    (async function(){
      var data = await yunxinIM.exec('chatroom/toggleCloseStat.action', {
        roomid: roomid,
        operator: accid,
        valid: false
      });
      debug('exec: chatroom/toggleCloseStat.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      var data = await yunxinIM.exec('chatroom/toggleCloseStat.action', {
        roomid: roomid,
        operator: accid,
        valid: true
      });
      debug('exec: chatroom/toggleCloseStat.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    })();
  });
  it('设置聊天室内用户角色', function(done){
    yunxinIM.exec('chatroom/setMemberRole.action', {
      roomid: roomid,
      operator: accid,
      target: accid2,
      opt: -2,
      optvalue: true
    })
    .then(function(data){
      debug('exec: chatroom/setMemberRole.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('请求聊天室地址', function(done){
    yunxinIM.exec('chatroom/requestAddr.action', {
      roomid: roomid,
      accid: accid2
    })
    .then(function(data){
      debug('exec: chatroom/requestAddr.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('发送聊天室消息', function(done){
    yunxinIM.exec('chatroom/sendMsg.action', {
      roomid: roomid,
      fromAccid: accid,
      msgId: Math.random() + '',
      fromAccid: accid,
      msgType: 0,
      attach: 'This+is+test+msg'
    })
    .then(function(data){
      debug('exec: chatroom/sendMsg.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('往聊天室内添加机器人', function(done){
    yunxinIM.exec('chatroom/addRobot.action', {
      roomid: roomid,
      accids: JSON.stringify([accid2, accid3])
    })
    .then(function(data){
      debug('exec: chatroom/addRobot.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('从聊天室内删除机器人', function(done){
    yunxinIM.exec('chatroom/removeRobot.action', {
      roomid: roomid,
      accids: JSON.stringify([accid2])
    })
    .then(function(data){
      debug('exec: chatroom/removeRobot.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('设置临时禁言状态', function(done){
    yunxinIM.exec('chatroom/temporaryMute.action', {
      roomid: roomid,
      operator: accid,
      target: accid3,
      muteDuration: 0
    })
    .then(function(data){
      debug('exec: chatroom/temporaryMute.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('往聊天室有序队列中新加或更新元素', function(done){
    yunxinIM.exec('chatroom/queueOffer.action', {
      roomid: roomid,
      key: Math.random() + '',
      value: Math.random() + '',
      target: accid2,
      muteDuration: 0
    })
    .then(function(data){
      debug('exec: chatroom/queueOffer.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('从队列中取出元素', function(done){
    yunxinIM.exec('chatroom/queuePoll.action', {
      roomid: roomid
    })
    .then(function(data){
      debug('exec: chatroom/queuePoll.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('排序列出队列中所有元素', function(done){
    yunxinIM.exec('chatroom/queueList.action', {
      roomid: roomid
    })
    .then(function(data){
      debug('exec: chatroom/queueList.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('删除清理整个队列', function(done){
    yunxinIM.exec('chatroom/queueDrop.action', {
      roomid: roomid
    })
    .then(function(data){
      debug('exec: chatroom/queueDrop.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('初始化队列', function(done){
    yunxinIM.exec('chatroom/queueInit.action', {
      roomid: roomid,
      sizeLimit: 1
    })
    .then(function(data){
      debug('exec: chatroom/queueInit.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('将聊天室整体禁言', function(done){
    yunxinIM.exec('chatroom/muteRoom.action', {
      roomid: roomid,
      operator: accid,
      mute: true
    })
    .then(function(data){
      debug('exec: chatroom/muteRoom.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('查询聊天室统计指标TopN', function(done){
    yunxinIM.exec('stats/chatroom/topn.action', {})
    .then(function(data){
      debug('exec: stats/chatroom/topn.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('分页获取成员列表', function(done){
    yunxinIM.exec('chatroom/membersByPage.action', {
      roomid: roomid,
      type: 0,
      endtime: 0,
      limit: 10
    })
    .then(function(data){
      debug('exec: chatroom/membersByPage.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('批量获取在线成员信息', function(done){
    yunxinIM.exec('chatroom/queryMembers.action', {
      roomid: roomid,
      accids: JSON.stringify([ accid, accid2, accid3 ])
    })
    .then(function(data){
      debug('exec: chatroom/queryMembers.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('变更聊天室内的角色信息', function(done){
    yunxinIM.exec('chatroom/updateMyRoomRole.action', {
      roomid: roomid,
      accid: accid2,
      nick: '123'
    })
    .then(function(data){
      debug('exec: chatroom/updateMyRoomRole.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
});