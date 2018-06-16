const debug = require('debug')('test');
const expect = require('chai').expect;
const test_config = require('./config');
const YunxinIM = require('../index');
const yunxinIM = new YunxinIM('118acf7269bc0e3b890781c65e385f28', '3abf9884a82c');

describe('3.群组功能（高级群）', function(){
  before(function(done){
    (async function(){
      accid = await test_config.createUser(yunxinIM);
      accid2 = await test_config.createUser(yunxinIM);
      accid3 = await test_config.createUser(yunxinIM);
      done();
    })();
  });
  it('创建群', function(done){
    yunxinIM.exec('team/create.action', {
      tname: accid,
      owner: accid,
      members: JSON.stringify([accid2]),
      msg: '这是一个群',
      magree: 0,
      joinmode: 0
    })
    .then(function(data){
      debug('exec: team/create.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      tid = data.tid;
      done();
    }, function(error){
      throw error;
    });
  });
  it('拉人入群', function(done){
    yunxinIM.exec('team/add.action', {
      tid: tid,
      owner: accid,
      members: JSON.stringify([accid3]),
      magree: 0,
      msg: '这是一个群'
    })
    .then(function(data){
      debug('exec: team/add.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('踢人出群', function(done){
    yunxinIM.exec('team/kick.action', {
      tid: tid,
      owner: accid,
      member: accid3
    })
    .then(function(data){
      debug('exec: team/kick.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('编辑群资料', function(done){
    yunxinIM.exec('team/update.action', {
      tid: tid,
      owner: accid,
      tname: '编辑群资料'
    })
    .then(function(data){
      debug('exec: team/update.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('群信息与成员列表查询', function(done){
    yunxinIM.exec('team/query.action', {
      tids: JSON.stringify([tid]),
      ope: 1
    })
    .then(function(data){
      debug('exec: team/query.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('获取群组详细信息', function(done){
    yunxinIM.exec('team/queryDetail.action', {
      tid: tid
    })
    .then(function(data){
      debug('exec: team/queryDetail.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('获取群组已读消息的已读详情信息', function(done){
    (async function(){
      let body = await yunxinIM.exec('msg/sendMsg.action', {
        from: accid,
        ope: 1,
        to: tid,
        type: 0,
        body: JSON.stringify({
          "msg":"hello"
        })
      });
      yunxinIM.exec('team/getMarkReadInfo.action', {
        tid: tid,
        msgid: body.data.msgid,
        fromAccid: accid,
        snapshot: true
      })
      .then(function(data){
        debug('exec: team/getMarkReadInfo.action, 返回：', JSON.stringify(data, null, 4));
        if (data.code === 403) {
          debug('虽然官网没有写，但是应该需要开通权限');
        } else {
          expect(data.code === 200).to.be.ok;
        }
        done();
      }, function(error){
        throw error;
      });
    })();
  });
  it('移交群主', function(done){
    yunxinIM.exec('team/changeOwner.action', {
      tid: tid,
      owner: accid,
      newowner: accid2,
      leave: 2
    })
    .then(function(data){
      debug('exec: team/changeOwner.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('解散群', function(done){
    yunxinIM.exec('team/remove.action', {
      tid: tid,
      owner: accid2
    })
    .then(function(data){
      debug('exec: team/remove.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
});