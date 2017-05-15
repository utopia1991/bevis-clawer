var async = require('async');

//parallel 并行执行数组、集合内的方法，不用等到前一个函数执行完再执行下一个函数
async.parallel ([
	function(next) {
		setTimeout(function(){
			next(null, '1');
		}, 1000);
	},
	function(next) {
		setTimeout(function(){
			next(null, '2');
		}, 3000);
	}
], function(err, results){
	if(err) {
		console.log('1.Fail');
	} else {
		console.log('1.Done\n' + results);
	}
});

//waterfall 任务依次运行,前一个函数的回调会作为后一个函数的参数，如果有任何任务通过一个错误的回调，下一个函数不执行
async.waterfall ([
	function(cb){
		cb(null, 'one ', ' two ');
	},
	function(a, b, cb){
		cb(null, a + b + ' three ');
	},
	function(a, cb){
		cb(null, a + ' done');
	}
], function(err, results){
	if(err) {
		console.log('2.Fail');
	} else {
		console.log('2.Done\n' + results);
	}
});

//series 顺序执行数组、集合内的函数，当前面一个函数执行完成就会立即执行下一个函数
async.series ([
	function(cb){
		setTimeout(function(){
			cb(null, 1);
		}, 100);
	},
	function(cb){
		setTimeout(function(){
			cb(null, 2);
		}, 200);
	}
], function(err, results){
	if(err) {
		console.log('3.Fail');
	} else {
		console.log('3.Done\n' + results);
	}
});
