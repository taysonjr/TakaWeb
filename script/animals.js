;(function(d,$){

  var jQtab_default = {
    tabContentsContainer: '.tabContentsContainer',
    tabEventAction: 'click',
    current: 0,
    currentSelector: 'current',
  };

$.fn.jQtab = function(options){
  //jQの定型記述
  var defaults = jQtab_default;
  var setting = $.extend( defaults, options);

  var _$obj = $(this.get(0)),
  _s = $.data($(this), setting),
  _p = {
    //タブとコンテンツを変数に入れる
    tabs : _$obj.find('li'),
    tabCn : _$obj.find(_s.tabContentsContainer),
    //タブエリアの高さを設定(コンテンツの中で一番縦幅が大きいものに合わせる)
    tabCnHeight: function(){
      var _$cns = _p.tabCn.children(),
      _len = _$cns.length,
      _hi = 0;
      while(_len > 0){
        _hi = Math.max(_hi, _$cns.eq(--_len).height());
      }
      return _hi + 40;
    },
    current: _s.current,
    isAnimate: false //アニメーションちゅうかどうかの判断フラグ変数
  };
  tabChangeCurrent(_p.current);
  _p.tabCn.children().not(':eq(' + _p.current +')').css({
    display : 'none',
    opacity: 0,
  });
  _p.tabCn.css({
    position : 'relative',
    overflow: 'hidden',
    background : '#f0f0f0',
    height : _p.tabCnHeight()
  });

  //イベントの設定
  _p.tabs.on(_s.tabEventAction, function(e){
    if(typeof e.preventDefault === 'function'){
      e.preventDefault();
    }
    //クリックしたタブを現在のタブに設定
    var _$t = $(this),
    _index = _$t.index();
    _current = _p.current;

    //選択されたコンテンツに切り替え
    if(_index != _current && !_p.isAnimate){
      hideTabContent(_current);
      _p.current = _index;
      showTabContent(_index);
    }
  });
  //フェードアウトしながら
  function hideTabContent(_current){
    var _$target = _p.tabCn.children().eq(_current);
    _p.isAnimate = true;
    tabChangeCurrent(_current);
    _$target.css({
      position : 'absolute'
    }).animate({
      apacity: 0
    },{
      duration : 500,
      complete : function () {
        hideComplete(_$target);
      }
    });

    function hideComplete(_$target){
      _p.isAnimate = false;
      _$target.css({
        left : 0,
        opacity : 0,
        display : 'none',
        position : 'relative'
      });
    }
  }

  function showTabContent(_t){
    var _$target = _p.tabCn.children().eq(_t);
    _p.isAnimate = true;
    tabChangeCurrent(_t);

    _$target.css({
      display : 'block'
    }).animate({
      opacity : 1
    },{
      duration : 500,
      complete : function (){
        showComplete(_$target);
      }
    });

    function showComplete(_$target){
      _p.isAnimate = false;
      _$target.css({
        display : 'block',
        position : 'relative',
        opacity : 1
      });
    }
  }
  //タブコンテンツの非表示設定　　単純に隠す・現れる
  // function hideTabContent(_current){
  //   var _$target = _p.tabCn.children().eq(_current);
  //   tabChangeCurrent(_current);
  //   _$target.css({
  //     left : 0,
  //     opacity : 0,
  //     display : 'none',
  //     position : 'relative'
  //   });
  // }
  // function showTabContent(_t){
  //   var _$target = _p.tabCn.children().eq(_t);
  //   tabChangeCurrent(_t);
  //   _$target.css({
  //     display : 'block',
  //     position : 'relative',
  //     opacity : 1
  //   });
  // }
    //クリックしたタブをカレントタブに変更
    function tabChangeCurrent(_t){
      _p.tabs.eq(_t).toggleClass(_s.currentSelector);
    }
  }
  $('.tabContainer').jQtab({
    tabEventAction: 'mouseover, mousemove'
  });
  $('.monkeys').jQtab();

}(document, jQuery));
