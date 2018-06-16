const debug = require('debug')('test');

const options = {

  async createUser (yunxinIM) {
    // 随机一个accid
    let accid = (Math.random() + '').replace('0.', '');
    let body = await yunxinIM.exec('user/create.action', {
      accid: accid
    });
    debug('创建用户返回：', JSON.stringify(body));
    return accid;
  },

  async createTeam (yunxinIM, accid, accid2) {
    let body = await yunxinIM.exec('team/create.action', {
      tname: accid,
      owner: accid,
      members: JSON.stringify([accid2]),
      msg: '这是一个群',
      magree: 0,
      joinmode: 0
    });
    debug('创建群返回：', JSON.stringify(body));
    return body.tid;
  },

  async createChatroom (yunxinIM, accid) {
    let body = await yunxinIM.exec('chatroom/create.action', {
      creator: accid,
      name: new Date().getTime() + '',
    });
    debug('创建群聊返回：', JSON.stringify(body));
    return body.chatroom.roomid;
  }
};

module.exports = options;