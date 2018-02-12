(function() {
	var title = document.querySelector(".lang_now"),
	ul = document.querySelector(".lang_list"),
	lis = document.querySelectorAll(".lang_list li"),
	text = document.querySelector(".text"),
	result = document.querySelector(".result"),
	reset = document.querySelector(".bottom .reset"),
	trans = document.querySelector(".bottom .trans"),
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
	function createScript(src) {
		var script = document.createElement('script');
		script.id = "script1"
		script.src = src;
		document.body.appendChild(script);
	}

	function translate() {
		let temp = text.value.replace(/[\r\n]/g, "");
		console.log(temp);
		var value = 'http://api.fanyi.baidu.com/api/trans/vip/translate?';
		var date = Date.now();
		var str = '20170605000052254'+temp+date+'63r1c42X7_buc4OrXm1g';
		var md5 = MD5(str);
		var data = 'q=' + temp + '&from=auto&to=' + lang + '&appid=20170605000052254' + '&salt=' + date + '&sign=' + md5 + "&callback=fn";
		var src = value + data;
		createScript(src);
	}
	// q：请求的参数   
	// from en to zh 从哪个语言翻译成哪个语言
	// appid: 百度翻译测试账号
	// salt:随机数
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
			}, 500);
			clearTimeout(timer);
		}
    }

  	init();
})();

function fn(str) {
	var result = document.querySelector(".result");
	console.dir(str);

	result.innerHTML = str.trans_result[0].dst;
}