;(function(d, $){
  var jQ_flexGrid;
  jQ_flexGrid = function(){
    //初期設定
    var param = {
			masonryTargetContainer: $('.photoGalleryContainer'),
			itemSelector: '.column',
			loaderSymbolSelector: '.loaderSymbol' //ローダー用cssセレクタ
    };

    //タイル状にレイアウトする複数要素を格納した、masonryプラグインを適用するコンテナ要素。扱いやすいよう初期設定の変数から$containerに代入する
    var $container = param.masonryTargetContainer;
    //masonryの基本設定を引数として、masonry関数に渡し実行。
    $container.masonry({
      // columnWidth: 270, //基本カラムの幅（px)
      columnWidth: '.grid_sizer', //基本カラムの幅（%で処理）
      itemSelector: param.itemSelector //カラムのCSSセレクタ
    });

    //load中に表示するアニメーションの処理
    var LoaderSymbol = {
			init: function(){
				var _sel = param.loaderSymbolSelector;
				if( $(_sel).length == 0 ) {
					$('<div>').prependTo('body').addClass(replaceString(_sel, '\\.')).hide().fadeIn(50);
				}
			},
			destroy: function(){
				$(param.loaderSymbolSelector).fadeOut(100,
					function(){
						$(this).remove();
						revealItems();
					});
			}
		};

		// 画像を全て読み込んだ後にmasonryを実行する
		LoaderSymbol.init();
		$container.imagesLoaded().done(function(){
			// 画像読み込み完了
			LoaderSymbol.destroy();
		});

    //読み込んだ画像を表示する
    function revealItems(){
			var _elmes, _items;
			_elems = $container.masonry('getItemElements'),
			_items = $container.masonry( 'getItems', _elems );

			$container.children().css({
				visibility: 'visible'
				});
			$container.fadeIn().masonry('reveal', _items).masonry();
      colorBoxSetting(param.itemSelector);
		}

    function colorBoxSetting(_t){
      $(_t).find('a').colorbox();
    }
    //文字列の置換
    function replaceString(_str, _bf, _af, _flg){
      var _reg = new RegExp(_bf, _flg || '');
      return _str.replace(_reg, _af || '');
    }

  }
  jQ_flexGrid();
})(document, jQuery);
