const crypto = require('crypto');
const rp = require('request-promise');
const numbers = '0123456789',
      low_letter = 'abcdefghigklmnopqrstuvwxyz',
      up_letter = low_letter.toLocaleUpperCase(),
      chars = numbers + low_letter + up_letter;

class YunxinIM {
  constructor (AppKey, AppSecret) {
    this._AppKey = AppKey;
    this._AppSecret = AppSecret;
    this._defaultNonceLength = 8;
    this._baseUrl = 'https://api.netease.im/nimserver/';
  }

  // 获取请求的headers
  // 文档：http://dev.yunxin.163.com/docs/product/IM即时通讯/服务端API文档/接口概述
  getHeaders () {
    let Nonce = this.spawnNonce();
    let CurTime = Math.round(new Date().getTime() / 1000);
    let CheckSum = this.sha1(this._AppSecret + Nonce + CurTime);
    return {
      AppKey: this._AppKey,
      Nonce: Nonce,
      CurTime: CurTime,
      CheckSum: CheckSum
    };
  }

  // 生成请求的headers的Nonce
  spawnNonce (length = this._defaultNonceLength) {
    let result = '';
    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * chars.length);
      result += chars.charAt(random);
    }
    return result;
  }

  // sha1加密字符串
  sha1 (str) {
    let sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex');
  }

  /**
   * 执行请求
   * @param {String} cmd 请求的命令
   * @param {Object} data 请求的数据
   */
  exec (cmd, data = {}) {
    return rp({
      method: 'POST',
      url: this._baseUrl + cmd,
      form: data,
      json: true,
      headers: this.getHeaders()
    });
  }
};

module.exports = YunxinIM;