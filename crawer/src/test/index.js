const c = require("../util/constant.js");
// 测试 bloomfilter
// const BloomFilter = new require("../util/bloomfilter.js").BloomFilter
// const bloomFilter = new BloomFilter(32 * 256, 16)
// const path = require("path")
// bloomFilter.add("dddd")
// console.log(bloomFilter.test("dddd"))
// bloomFilter.dump("test.txt", "test1.txt")
// bloomFilter.add("cccc")
// console.log(bloomFilter.test("cccc"))
// bloomFilter.load("test.txt", "test1.txt")
// console.log(bloomFilter.test("dddd"))
// console.log(bloomFilter.test("cccc"))

// test http method
// const h = require("../util/http.js")

// h({urls: ["http", "url", "jjsdsd"]}, "/url/save", "POST")


// 测试http
const http = require('../util/http.js');


const getUrl = require("../parser/httpRequestURL\.js") // 测试httpParser
getUrl(c.URL)
