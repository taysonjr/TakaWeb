;(function(d,$){

  var JQdmtips;

  JQdmtips = function(){

    // tips用の共通設定を定義
    var param = {
      tipsContentContainer: '.tipsContentContainer',
      tipsContentGenerateContainer: 'body',
      tipsSelector: '*[title], *[data-tips-image], *[data-tips-movie]',
      tipsAttrTitle: 'title',
      tipsAttrBasic: 'data-tips',
      tipsAttrImage: 'data-tips-image',
      tipsPositionAttr: 'data-tips-pos',
      dataPossessor: d.body,

      imageMagnificationRate: 2, // 画像の拡大率

    };

    // tips対象要素にマウスオンしたら表示処理
    $(param.tipsSelector).on('mouseover', function(e){
      showTipsContent($(this));
    });

    // tips対象要素からマウスが離れたら非表示処理
    $(param.tipsSelector).on('mouseout', function(e){
      hideTipsContent($(param.tipsContentContainer));
    });

    /* tipsバルーンを表示 */
    function showTipsContent(_$t){

      // 処理で使用する変数を定義
      var _$tcn = $(param.tipsContentContainer),
      _$tcgn = $(param.tipsContentGenerateContainer),
      _p = {
        tipsWidth: 0,
        tipsHeight: 0,
        triggerWidth: 0,
        triggerHeight: 0,
        contentAttr: (function(){
          return _$t.attr(param.tipsAttrImage) ? param.tipsAttrImage :
          _$t.attr(param.tipsAttrBasic) ? param.tipsAttrBasic :
          _$t.attr(param.tipsAttrTitle) ? param.tipsAttrTitle : null;
        })()
      },
      _attr = _p.contentAttr,
      _pos = _$t.attr(param.tipsPositionAttr),
      _$cnt;

      // tipsコンテンツを載せる土台（コンテナ）を作成
      if(isElem(_$tcn)) {
        hideTipsContent(_$tcn);
      }
      _$tcn = $('<div>').prependTo(_$tcgn).addClass(replaceString(param.tipsContentContainer, '\\.'));


      // 属性からtipsコンテンツ内容を決める
      switch(_attr){

        // 画像簡易拡大機能の処理
        case 'data-tips-image':
          var _base = {
            w: _$t.width(),
            h: _$t.height()
            // w: _$t.parent().width(),
            // h: _$t.parent().height()
          },
          _rate = _base.h / _base.w,
          _magW = _base.w * param.imageMagnificationRate,
          _magH = _magW * _rate;
          console.log("w==" + _magW);
          _$cnt = $('<img>').appendTo(_$tcn).attr({
            src: _$t.attr(_attr)
          });
          _$tcn.css({
            width: _magW,
            height: _magH,
            overflow: 'hidden'
          });
          _p.triggerWidth = _base.w;
          _p.triggerHeight = _base.h;
          _pos = _pos || 'tc';
          break;

        // 通常のtips
        default:
          _$cnt = $('<p>').appendTo(_$tcn).html(_$t.attr(_attr));
          // tilte属性の内容をdata-tips属性に複製する
          _$t.attr(param.tipsAttrBasic, _$t.attr(_attr));
          _$t.removeAttr('title');
      }


      // data-tips-dir属性からtipsコンテナの位置を決める
      _pos = _pos || 'bc';
      $.data(param.dataPossessor, 'tipsWidth', _p.tipsWidth || _$tcn.width());
      $.data(param.dataPossessor, 'tipsHeight', _p.tipsHeight || _$tcn.height());
      $.data(param.dataPossessor, 'triggerWidth', _p.triggerWidth || _$t.width());
      $.data(param.dataPossessor, 'triggerHeight', _p.triggerHeight || _$t.height());
      _$tcn.css({
        top: 200,
        left: 300,
        // width: 600,
        // height: 400,
        // top: _$t.offset().top + cordinatePosition(_pos.charAt(0)), //ツールチップの表示位置の計算
        // left: _$t.offset().left + cordinatePosition(_pos.charAt(1)),
        opacity: 1
      });
    }

    /* tipsバルーンを非表示 */
    function hideTipsContent(_$t){
      if(isElem(_$t)){
        _$t.animate({
          opacity: 0
        }, 500, function(){
          _$t.remove();
        });
      }
    }

    // tipsバルーンの位置を調整する
    function cordinatePosition(_pos){
      return _pos == 't' ? -detectScale('tipsHeight') - 48:
      _pos == 'm' ? -detectScale('tipsHeight') / 2 :
      _pos == 'b' ? +detectScale('triggerHeight') + 24 :
      _pos == 'l' ? - detectScale('tipsWidth') :
      _pos == 'c' ? - detectScale('tipsWidth') / 2 + detectScale('triggerWidth') / 2 :
      _pos == 'r' ? + detectScale('triggerWidth') + 32 : 0;
    }

    // 要素の数を調べる
    function isElem(_$t){
      return _$t.length;
    }

    // 一時的に保持している値を取得する
    function detectScale(_param){
      return $.data(param.dataPossessor, _param) || 0;
    }

    // 文字列置換処理
    function replaceString(_str, _bf, _af, _flg){
      var _reg = new RegExp(_bf, _flg || '');
      return _str.replace(_reg, _af || '');
    }

  };

  // オリジナルtipsを実行する
  JQdmtips();

})(document, jQuery);
