(function() {
	var title = document.querySelector(".lang_now"),
	ul = document.querySelector(".lang_list"),
	lis = document.querySelectorAll(".lang_list li"),
	text = document.querySelector(".text"),
	reset = document.querySelector(".bottom .reset"),
	trans = document.querySelector(".bottom .trans"),
	result = document.querySelector(".result"),
	key = true,
	length = lis.length,
	lang = "en",
	timer = null;

	function langShow() {
		if (key == true) {
			ul.style.display = "block";
			key = false;
		} else {
			ul.style.display = "none";
			key = true;
		}
	}

	function changeLang() {
		lang = this.getAttribute('data-lang');
		title.innerHTML = this.innerHTML;
		this.parentNode.style.display = "none";
		key = true;
	}

	// 跨域请求
	/*function createScript(src) {
		var script = document.createElement('script');
		script.id = "script1"
		script.src = src;
		document.body.appendChild(script);
	}

	function translate() {
		let appid = '2015063000000001';
		let key = '12345678';
		let salt = (new Date).getTime();
		let Str = text.value.split('\n');
		for(let i in Str){
			let query = Str[i];
			let from = 'auto';
			let to = lang;
			let str = appid+query+salt+key;
			let md5 = MD5(str);
			
			let  url = 'http://api.fanyi.baidu.com/api/trans/vip/translate?';
			var data = 'q=' + query + '&from='+ from+'&to=' + to + '&appid='+ appid+ '&salt=' + salt + '&sign=' + md5 + "&callback=fn";
			var src = url + data;
			createScript(src);
		}
	}*/
	function translate(){
		var appid = '2015063000000001';
		var key = '12345678';
		var salt = (new Date).getTime();
		var query=text.value;
		var from = 'auto';
		var to = lang;
		var str1 = appid + query + salt +key;
		var sign = MD5(str1);
		$.ajax({
			url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
			type: 'get',
			dataType: 'jsonp',
			data: {
				q: query,
				appid: appid,
				salt: salt,
				from: from,
				to: to,
				sign: sign
			},
			success: function (data) {
				for(let i in data.trans_result){
					console.log(data.trans_result[i].dst);
					result.innerHTML += data.trans_result[i].dst + "<br/>";
				}
			} 
		});
	}
	// q：请求的参数     temp
	// from en to zh 从哪个语言翻译成哪个语言  from auto to lang  
	// appid: 百度翻译测试账号
	// salt:随机数 date=Date.now();
	// sign：对拼接的字符串进行加密  
	// callback:接收返回值

	function init() {
		title.onclick = langShow;

		for (var i = 0; i < length; i++) {
			lis[i].onclick = changeLang;
		}

		reset.onclick = function() {
			text.value = "";
		}

		trans.onclick = function() {
			if (text.value == "") {
				return;
			}
			var script = document.querySelector('#script1');
			if (script) {
				script.parentNode.removeChild(script);
				translate();
			} else {
				translate();
			} 
		}

		text.onkeydown = function() {
			result.innerHTML = "";
			clearTimeout(timer);
			timer = setInterval(function() {
				if (text.value == "") {
				  return;
				}
				var script = document.querySelector('#script1');
				if (script) {
					script.parentNode.removeChild(script);
					translate();
				} else {
					translate();
				} 
			}, 100);
			clearTimeout(timer);
		}
    }

  	init();
})();
// function fn(str) {
// 	result.innerHTML = str.trans_result[0].dst+"<br>";
// }