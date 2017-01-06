var arr = [112,112,34,12,12,34,'你好',112,112,34,'你好','str','str1'];
var str = "hello";

// 数组去重
Array.prototype.unique = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){   // 读取对象的特定属性值：json[属性名]
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
}

// 给字符串对象定义一个，当传入一个整数n时，返回重复n次字符串的结果
String.prototype.repeatify = String.prototype.repeatify || function(times){  // 不覆盖可能已经定义的功能，测试一下该功能定义之前并不存在
	var str = "";
	for(var i = 0; i < times; i++){
		str += this;
	}
	return str;
}

console.log(arr.unique());

console.log(str.repeatify(4));
