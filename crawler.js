/*
 * 这个脚本的功能是爬虫抓包一个页面,将页面的链接全部抓取出来,逐一访问并且返回状态码
 * npm install
 */

var http = require('http');
var superagent = require('superagent');      // superagent 抓取页面数据
var cheerio = require('cheerio');
var async = require('async');
var fs = require("fs");                      // 将log写成text文档
var crawlerPage = '';
var crawlerPage1 = "http://pengujian.healthpocket.com/individual-health-insurance/sitemap.xml";    // 配置爬虫要抓取的页面
var crawlerPage2 = "http://pengujian.healthpocket.com/individual-health-insurance/sitemap2.xml";    // 配置爬虫要抓取的页面
var defaultLink = "pengujian.healthpocket.com";                       // 配置的 http host
var defaultUrl = "http://" + defaultLink;                               // 正则去除的的前缀

// 数组批量去除前缀
function regURL(s) {
	var pattern = new RegExp(defaultUrl);
	var rs = [];
	for (var i = 0; i < s.length; i++) {
		rs[i] = s[i].replace(pattern, '');
	}
	return rs;
}

function createOptions(s) {
	var options = [];
	for (var i = 0; i < s.length; i++) {
		options[i] = {
			host : defaultLink,
			port : 80,
			path : s[i]
		};
	}
	return options;
}

if(process.argv[2]) {
	var value = process.argv[2];
	switch (value) {
		case 1: crawlerPage = crawlerPage1;
			break;
		case 2: crawlerPage = crawlerPage2;
			break;
		default: crawlerPage = crawlerPage2;
	}
}

superagent.get(crawlerPage).end(function (err, sres) {
	if (err) {
		return next(err);
	}

	var $ = cheerio.load(sres.text);
	var items = [];
	$('loc').each(function (idx, element) {
		var $element = $(element);
		items.push(
				$element.html()
		);
	});

	items = regURL(items);
	options = createOptions(items);
	printLog = [];
	console.log('Begin!!!!!!');
	async.eachLimit(options, 1, function(option,next) {
		http.get(option, function (res) {
			printLog.push('Path: ' + option.path + '\n' + 'Status: ' + res.statusCode + '\n');
			printLogJson = printLog.toString();
			fs.open("log.txt", "a", function(err,fd) {
				var buf = new Buffer(printLogJson);
				fs.writeSync(fd,buf,0,buf.length,0);
				if(err) {
					return console.log(err);
				}
			});
			next();
		}).on('error', function (e) {
			console.log("Error: " + e.message);
			next();
		});
	}, function(err){
		if(err) {
			console.log('Fail = = !!!');
		} else {
			console.log('Done!!!!!!');
		}
	});

});
