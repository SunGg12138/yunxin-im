// [a, b, c, d]  => [ d, c, b, a ]

/**
 * 元素翻转
*/
exports.main = function (n) {

    if (!n || !n.next) return n;

    const save = [n];

    while (n.next) {
        save.unshift(n.next);
        n = n.next;
    }

    for (let i = 0; i < save.length - 1; i++) {
        save[i].next = save[i + 1];
    }

    return save[0];
};

/**
 * 通用请求方法
 * 
 * @param serviceName {string} 服务名称
 * @param method {string} 方法名称
 * @param params {string} 请求参数
 * @return Promise<{ code, msg, data }>
*/
exports.request = function (serviceName, method, params) {

    if (!serviceName) return Promise.reject('');
    if (!method) return Promise.reject('');

    return rpc(serviceName, method, params);
};

async function rpc(serviceName, method, params) {
    const reqData = await proto.encode({ serviceName, method, params });
    const resData = await module.rpc(reqData);
    const json = await proto.decode(resData);
    // 判断是否错误
    return json;
}
