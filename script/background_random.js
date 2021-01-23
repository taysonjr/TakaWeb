;(function(){

  var options = {
    minWidth: 800,
    minHeight: 600,
    images: {
      dir: 'img/index/',
      path: [
        '001.jpg',
        '002.jpg',
        '003.jpg',
        '004.jpg',
        '005.jpg',
        '006.jpg',
        '007.jpg',
        '008.jpg',
        '009.jpg',
        '010.jpg',
        '011.jpg',
        '012.jpg',
        '013.jpg',
        '014.jpg',
        '015.jpg',
        '016.jpg',
        '017.jpg'
      ],
      current: 0,
      duration: 2000
    }
  };

  //変数の初期化と要素のキャッシュ
  var $window = $(window),
  $contents =$('#contentContainer'),
  $background = $('<div id="background">').prependTo($contents),
  imgs = [];

  //初期設定
  function init() {
    //画像のプリロード
    var _imgspath = options.images.path,
    _imgsdir = options.images.dir,
    _rnd = Math.floor(Math.random() * _imgspath.length);

    for(var i = 0; len = _imgspath.length, i < len; i++){
      imgs.push(jQuery("<img>").attr("src", _imgsdir + _imgspath[i]));
    }
    imgs.current = _rnd;

    setTimeout(function(){
      changeBgImage(_rnd);
      $contents.css('background', 'none').fadeIn();
    }, 1000);
    resize();
  };

  //背景画像の切り替え
  function changeBgImage(_cur){
    var _images = options.images, _$img;

    _cur = _cur > _images.path.length -1 ? 0:  _cur;
    _$img = imgs[_cur].appendTo($background).hide();
    _images.current = ++_cur;

    setTimeout(function(){
      adjustImage(_$img)
    }, 100);
    setTimeout(function(){
      changeBgImage(_cur)
    }, options.images.duration || 1000);
  }
  //画像が中央に表示されるようにする
  function adjustImage(_obj){
    var ww = $window.width(),
    wh = $window.height(),
    iw = _obj.width(),
    ih = _obj.height(),
    scale = Math.max(ww / iw, wh / ih),
    sw = Math.floor(iw * scale),
    sh = Math.floor(ih * scale),
    moveX = Math.floor((ww - sw)/2),
    moveY = Math.floor((ww - sh)/2);

    _obj.css({
      width: sw,
      height: sh,
      left: moveX,
      top: moveY
    });
    _obj.fadeIn(1000);
  }

  function resize(){
    var ww = $window.width(),
    wh = $window.height(),
    _opw = options.minWidth,
    _oph = options.minheight,
    _res = {
      w: _opw > ww ? _opw : ww,
      h: _oph > wh ? _oph : wh
    };
    $background.css({
      width: _res.w,
      height: _res.h
    });
    $contents.css({
      width: _res.w,
      height: _res.h
    });
    $background.find('img').each(function(){
      adjustImage($(this));
    });
  }
  $window.on('resize', resize);
  $window.on('load', function(){
    init();
  });
}());


