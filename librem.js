/* eslint-disable */
//https://www.cnblogs.com/ranyonsue/p/6795943.html
;(function(win, lib) {
    var dpr, rem, scale,tid;
    var docEl = document.documentElement;
    var metaEl = document.querySelector('meta[name="viewport"]');

    lib.rem2px = function(v) { return parseFloat(v) * rem; };
    lib.px2rem= function(v) { return parseFloat(v) / rem; };
    lib.width= function(v) { return docEl.getBoundingClientRect().width/dpr; };
    lib.dpr = dpr;
    lib.rem = rem;

    if(!metaEl) return console.warn('页面未设置 meta[name="viewport"]，请设置。');

    function setRem(){
        var isIphone = win.navigator.appVersion.match(/iphone/gi);
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        dpr = isIphone?(win.devicePixelRatio||1):1;
        scale = 1 / dpr;

        docEl.setAttribute('data-scale-r', scale);
        if(scale<1) scale=1; //限制不小于1
        docEl.setAttribute('data-scale', scale);

        metaEl.setAttribute('content','initial-scale='+scale+',maximum-scale='+scale+',minimum-scale='+scale+',user-scalable=no');

        docEl.setAttribute('data-dpr', dpr);
        var width = docEl.getBoundingClientRect().width;
        win.dw = width / dpr;
        rem = width / 10;
        docEl.style.fontSize = rem + 'px';
    }
    win.addEventListener('resize', function() { setRem(); }, false);
    win.addEventListener('pageshow', function(e) { if (e.persisted) { setRem(); } }, false);
    setRem();
})(window, window['remlib'] || (window['remlib'] = {}));