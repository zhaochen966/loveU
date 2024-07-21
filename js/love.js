var clickCount = 0;
window.onload = function () {
	var buhao = document.getElementById("buhao");
	var hao = document.getElementById("hao");
	
	buhao.onclick = function () {
		var option = {
			title: "您点错了😫，请点按钮“好”，我在教你做事☺"
		}
		clickCount++;
		if (clickCount == 1) {
			window.wxc.xcConfirm("您点错了，第一次，原谅你了😀", window.wxc.xcConfirm.typeEnum.info, option);
		} else if (clickCount == 2) {
			window.wxc.xcConfirm("点一下“好”，有惊喜呀！", window.wxc.xcConfirm.typeEnum.info, option);
		} else if (clickCount == 3) {
			window.wxc.xcConfirm("😢心碎了！", window.wxc.xcConfirm.typeEnum.info, option);
		} else if (clickCount == 4) {
			window.wxc.xcConfirm("中意你吖！", window.wxc.xcConfirm.typeEnum.info, option);
		} else if (clickCount == 5) {
			window.wxc.xcConfirm("hei fun nei呦！", window.wxc.xcConfirm.typeEnum.info, option);
		} else if (clickCount == 6) {
			window.wxc.xcConfirm("喜欢你呀！", window.wxc.xcConfirm.typeEnum.info, option);
		} else if (clickCount == 7) {
			window.wxc.xcConfirm("love你啊！", window.wxc.xcConfirm.typeEnum.info, option);
		} else if (clickCount == 8) {
			window.wxc.xcConfirm("你考虑一下呗！", window.wxc.xcConfirm.typeEnum.info, option);
		} else if (clickCount == 9) {
			window.wxc.xcConfirm("友尽😢", window.wxc.xcConfirm.typeEnum.info, option);
			clickCount = 1;
		}

	}
	hao.onclick = function () {
		var txt = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;❤❤❤ 啧啧啧 ❤❤❤<br/>" + 
			"再点击一下“确定”按钮，就能看到我想对你说的话！";
		var option = {
			title: "😘吾对你蛮有意思滴",
			icon: "0 -48px",//绿色对勾
			btn: parseInt("0011", 2),
			onOk: function() {
				window.location.href = './heart.html';  
			},
			onCancel: function() {
				window.wxc.xcConfirm("你又手滑了😫，再原谅你一次", window.wxc.xcConfirm.typeEnum.error);
			}
		}
		window.wxc.xcConfirm(txt, "custom", option);
	}
}