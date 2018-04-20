var assert = require('assert');
var util = require('util');
var DBPool = require('./dbpool.js');
describe('测试数据库', function () {
    describe('测试获取连接池接口', function () {
        it('返回js pool Object', function () {
            var pool = DBPool.getPool();
            assert(pool instanceof Object, 'pool必须是对象！');
            console.log(util.inspect(pool, {compact: true, depth: 5, breakLength: 80}))
        })
    })
})