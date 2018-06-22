const debug = require('debug')('test');
const expect = require('chai').expect;
const test_config = require('./config');
const YunxinIM = require('../index');
const yunxinIM = new YunxinIM('<你的AppKey>', '<你的AppSecret>');

describe('1.用户部分', function(){
  it('创建网易云通信ID', function(done){
    // 随机一个accid，并且全局使用
    accid = (Math.random() + '').replace('0.', '');
    yunxinIM.exec('user/create.action', {
      accid: accid
    })
    .then(function(data){
      debug('exec: user/create.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('网易云通信ID基本信息更新', function(done){
    yunxinIM.exec('user/update.action', {
      accid: accid,
      token: accid
    })
    .then(function(data){
      debug('exec: user/update.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('更新并获取新token', function(done){
    yunxinIM.exec('user/refreshToken.action', {
      accid: accid
    })
    .then(function(data){
      debug('exec: user/refreshToken.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('封禁网易云通信ID', function(done){
    yunxinIM.exec('user/block.action', {
      accid: accid
    })
    .then(function(data){
      debug('exec: user/block.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('解禁网易云通信ID', function(done){
    yunxinIM.exec('user/unblock.action', {
      accid: accid
    })
    .then(function(data){
      debug('exec: user/unblock.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('更新用户名片', function(done){
    yunxinIM.exec('user/updateUinfo.action', {
      accid: accid,
      name: '2222',
      icon: '00000'
    })
    .then(function(data){
      debug('exec: user/updateUinfo.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('获取用户名片', function(done){
    yunxinIM.exec('user/getUinfos.action', {
      accids: JSON.stringify([accid])
    })
    .then(function(data){
      debug('exec: user/getUinfos.action, 返回：', JSON.stringify(data, null, 4));
      expect(data.code === 200).to.be.ok;
      done();
    }, function(error){
      throw error;
    });
  });
  it('设置桌面端在线时，移动端是否需要推送', function(done){
    yunxinIM.exec('user/setDonnop.action', {
      accid: accid,
      donnopOpen: false
    })
    .then(function(data){
      debug('exec: user/setDonnop.action, 返回：', JSON.stringify(data, null, 4));
      // 这个命令比较特殊，需要用户在SDK登录
      if (data.code === 414) {
        expect(data.desc === "this accid not login yet").to.be.ok;
      } else {
        expect(data.code === 200).to.be.ok;
      }
      done();
    }, function(error){
      throw error;
    });
  });
  it('加好友', function(done){
    (async function(){
      accid2 = await test_config.createUser(yunxinIM);
      yunxinIM.exec('friend/add.action', {
        accid: accid,
        faccid: accid2,
        type: 1
      })
      .then(function(data){
        debug('exec: friend/add.action, 返回：', JSON.stringify(data, null, 4));
        expect(data.code === 200).to.be.ok;
        done();
      }, function(error){
        throw error;
      });
    })();
  });
  it('更新好友相关信息', function(done){
    (async function(){
      yunxinIM.exec('friend/update.action', {
        accid: accid,
        faccid: accid2
      })
      .then(function(data){
        debug('exec: friend/update.action, 返回：', JSON.stringify(data, null, 4));
        expect(data.code === 200).to.be.ok;
        done();
      }, function(error){
        throw error;
      });
    })();
  });
  it('获取好友关系', function(done){
    (async function(){
      yunxinIM.exec('friend/get.action', {
        accid: accid,
        updatetime: Math.round(new Date().getDate() / 1000)
      })
      .then(function(data){
        debug('exec: friend/get.action, 返回：', JSON.stringify(data, null, 4));
        expect(data.code === 200).to.be.ok;
        done();
      }, function(error){
        throw error;
      });
    })();
  });
  it('设置黑名单/静音', function(done){
    (async function(){
      yunxinIM.exec('user/setSpecialRelation.action', {
        accid: accid,
        targetAcc: accid2,
        relationType: 2,
        value: 1
      })
      .then(function(data){
        debug('exec: user/setSpecialRelation.action, 返回：', JSON.stringify(data, null, 4));
        expect(data.code === 200).to.be.ok;
        done();
      }, function(error){
        throw error;
      });
    })();
  });
  it('查看指定用户的黑名单和静音列表', function(done){
    (async function(){
      yunxinIM.exec('user/listBlackAndMuteList.action', {
        accid: accid
      })
      .then(function(data){
        debug('exec: user/listBlackAndMuteList.action, 返回：', JSON.stringify(data, null, 4));
        expect(data.code === 200).to.be.ok;
        done();
      }, function(error){
        throw error;
      });
    })();
  });
  it('删除好友', function(done){
    (async function(){
      yunxinIM.exec('friend/delete.action', {
        accid: accid,
        faccid: accid2
      })
      .then(function(data){
        debug('exec: friend/delete.action, 返回：', JSON.stringify(data, null, 4));
        expect(data.code === 200).to.be.ok;
        done();
      }, function(error){
        throw error;
      });
    })();
  });
});