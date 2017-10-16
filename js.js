var oBox = document.querySelector('.box');  // 获取.box元素
var oCon = document.querySelector('.con');  // 获取input框
var oBtn = document.querySelector('.send-btn');  // 获取发送按钮
var cW = oBox.offsetWidth;
var cH = oBox.offsetHeight;
var message = '';  // 弹幕内容初始化

oBtn.onclick = send;

oCon.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        // 回车键
        send();
    }
};

function send() {
    // 获取oCon的内容
    if (oCon.value.length <= 0 || (/^\s+$/).test(oCon.value)) {
        alert('请输入弹幕');
        return false;
    }
    message = oCon.value;
    console.log(message);
    // 生成标签
    createEle(message);  // 执行节点创建模块
    oCon.value = '';  // 收尾工作清空输入框
}

function createEle(txt) {
    // 动态生成span标签
    var oMessage = document.createElement('span');  // 创建标签
    oMessage.innerHTML = txt;  // 接收参数txt并且生成替换内容
    oMessage.style.left = cW + 'px'; // 初始化生成位置x
    oBox.appendChild(oMessage);  // 把标签塞到oBox里面
    roll.call(oMessage,{
        //call改变函数内部this的指向
        timing: ['linear','ease-out'][~~(Math.random() * 2)],
        color: '#' + (~~(Math.random() * (1 << 24))).toString(16),
        top : random(0, cH),
        fontSize: random(16, 32)
    })
}

function roll(opt) {
    // 弹幕滚动
    // 如果对象中不存在timing初始化
    opt.timing = opt.timing || 'linear';
    opt.color = opt.color || '#fff';
    opt.top = opt.top || 0;
    opt.fontSize = opt.fontSize || 16;
    this._left = parseInt(this.offsetLeft);  // 获取当前left的值
    this.style.color = opt.color;  // 初始化颜色
    this.style.fontSize = opt.top + 'px';
    this.style.fontSize = opt.fontSize + 'px';

    this.timer = setInterval(function () {
        if (this._left <= 100) {
            clearInterval(this.timer);  // 终止定时器
            this.parentNode.removeChild(this);
            return;  // 终止函数
        }
        switch (opt.timing) {
            case 'linear': // 如果匀速
                this._left += (0 - this._left) * 0.01;
                break;
            case 'ease-out':
                this._left += (0 - this._left) * 0.01;
                break;
        }
        this.style.left = this._left + 'px';
    }.bind(this), 1000/60);
}

function random(start,end) {
    // 随机数封装
    return start + ~~(Math.random() * (end - start));
}

var aLi = document.querySelectorAll('li'); // 10

function forEach(ele, cb) {
    for (var i = 0, len = aLi.length; i < len;i++) {
        cb && cb(ele[i],i)
    }
}

forEach(aLi, function (ele, i) {
    ele.style.left = i * 100 + 'px'
});

// 产生闭包
var obj = {
    num : 1,
    add: function () {
        this.num++;
        (function () {
            console.log(this.num);
        })
    }
};

obj.add();