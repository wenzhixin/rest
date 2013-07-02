/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @update 2013-07-02
 */

function Rest() {
	'use strict';
	
	var baseurl = '',
		methods = [],
		
		createFunc = function(url, type) {
			return function() {
				if (arguments.length === 0 || arguments.length > 3) {
					throw new Error('arguments error');
				}
				var callback = arguments[0],
					params = {},
					options = {
						url : baseurl + url,
						type : type,
						dataType : 'json',
						success : function(data) {
							callback(200, data);
						},
						error : function(XMLHttpRequest) {
							callback(XMLHttpRequest.status);
						}
					};
				switch (type) {
				case 'get':
					params = arguments[1];
					if (params) options.url += '?' + $.param(params);
					break;
				case 'post':
					params = arguments[1];
					options.contentType = 'application/json';
					options.data = JSON.stringify(params);
					break;
				case 'put':
					params = arguments[2];
					options.url += '/' + arguments[1];
					options.contentType = 'application/json';
					options.data = JSON.stringify(params);
					break;
				case 'delete':
					options.url += '/' + arguments[1];
					break;
				default:
					throw new Error('method error');
				}
				$.ajax(options);
			};
		};
	
	if (arguments.length === 1) {
		methods = arguments[0];
	} else if (arguments.length == 2) {
		baseurl = arguments[0];
		methods = arguments[1];
	} else {
		throw new Error('arguments error');
	}

	for (var i = 0; i < methods.length; i++) {
		var method = methods[i],
			url = '',
			type = 'post',
			tmpArr = [],
			funcArr = [];
		if (method.indexOf(':') === -1) {
			url = method;
		} else {
			var arr = method.split(':');
			type = arr[0];
			url = arr[1];
		}
		tmpArr = url.split('/');
		for (var j = 0; j < tmpArr.length; j++) {
			if (tmpArr[j] !== '') {
				if (j === tmpArr.length - 1) {
					funcArr.push(type + tmpArr[j].substring(0, 1).toUpperCase() + tmpArr[j].substring(1));
				} else {
					funcArr.push(tmpArr[j]);
				}
			}
		}
		if (funcArr.length == 1) {
			this[funcArr[0]] = createFunc(url, type);
		} else {
			if (!this.hasOwnProperty(funcArr[0])) {
				this[funcArr[0]] = {};
			}
			var methodObj = this[funcArr[0]];
			for (j = 1; j < funcArr.length - 1; j++) {
				if (!methodObj.hasOwnProperty(funcArr[j])) {
					methodObj[funcArr[j]] = {};
				}
				methodObj = methodObj[funcArr[j]];
			}
			methodObj[funcArr[funcArr.length - 1]] = createFunc(url, type);
		}
	}
}