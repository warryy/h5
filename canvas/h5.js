var jsC1 = document.getElementsByClassName('js-canvas')[0];
var jsC2 = document.getElementsByClassName('js-canvas')[1];

var jsVideo = document.getElementsByClassName('js-video')[0];

var ctx1 = jsC1.getContext('2d');
var ctx2 = jsC2.getContext('2d');
var w = jsVideo.width;
var h = jsVideo.height;
jsC1.width = w;
jsC1.height = h;
jsC2.width = w;
jsC2.height = h;

var _t;
jsVideo.addEventListener('play', function() {
    _t = setInterval(function fun() {
        ctx1.drawImage(jsVideo, 0, 0, w, h);
        var frame = ctx1.getImageData(0, 0, w, h);
        let cArr = frame.data;
        let l = cArr.length / 4;
        for (let i = 0; i < l; ++i) {
            let r = cArr[i * 4 + 0];
            let g = cArr[i * 4 + 1];
            let b = cArr[i * 4 + 2];
            if (r > 100 && g > 100 && b < 43) {
                frame.data[i * 4 + 3] = 0;
            }
        }
        ctx1.putImageData(frame, 0, 0);

        ctx2.drawImage(jsVideo, 0, 0, w/2, h/2);
        ctx2.drawImage(jsVideo, w / 2, 0, w/2, h/2);
        ctx2.drawImage(jsVideo, 0, h / 2, w/2, h/2);
        ctx2.drawImage(jsVideo, w / 2, h / 2, w/2, h/2);
        var frame2 = ctx2.getImageData(0, 0, w, h);
        let cArr2 = frame2.data;
        let l2 = cArr2.length / 4;
        for (let i = 0; i < l2; ++i) {
            let r = cArr2[i * 4 + 0];
            let g = cArr2[i * 4 + 1];
            let b = cArr2[i * 4 + 2];
            if (r > 100 && g > 100 && b < 43) {
                frame2.data[i * 4 + 0] = 0;
                frame2.data[i * 4 + 1] = 0;
                frame2.data[i * 4 + 2] = 255;
                frame2.data[i * 4 + 3] = 255;
            }
        }
        ctx2.putImageData(frame2, 0, 0);
    }, 1);
});

jsVideo.addEventListener('pause', function fun() {
    clearInterval(_t);
});