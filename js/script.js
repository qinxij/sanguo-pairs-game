$(function() {

  var img_urls = ["img/caocao.png",
                  "img/guanyu.png",
                  "img/liubei.png",
                  "img/sunjian.png",
                  "img/caifuren.png",
                  "img/tianlaoshouwei.png",
                  "img/tiejiang.png",
                  "img/xichengshangren.png",
                  "img/yuanshao.png",
                  "img/yuanshu.png",
                  "img/zhangfei.png",
                  "img/zhengbingguan.png",
                  "img/caocao.png",
                  "img/guanyu.png",
                  "img/liubei.png",
                  "img/sunjian.png",
                  "img/caifuren.png",
                  "img/tianlaoshouwei.png",
                  "img/tiejiang.png",
                  "img/xichengshangren.png",
                  "img/yuanshao.png",
                  "img/yuanshu.png",
                  "img/zhangfei.png",
                  "img/zhengbingguan.png"];
  var img_names = { "caocao": '曹操',
                    "guanyu": '关羽',
                    "liubei": '刘备',
                    "sunjian": '孙坚',
                    "caifuren": '蔡夫人',
                    "tianlaoshouwei": '天牢守卫',
                    "tiejiang": '铁匠',
                    "xichengshangren": '西域商人',
                    "yuanshao": '袁绍',
                    "yuanshu": '袁术',
                    "zhangfei": '张飞',
                    "zhengbingguan": '征兵官' };

  // Shuffle js array > http://stackoverflow.com/a/2450976/4991434
  function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  var arr = img_urls;
  arr = shuffle(arr);

  for (i = 0; i < img_urls.length; i++) {
    $(".items").append(
      "<div class='container'><div class='front'>" +
        img_urls[i] + "</div><div class='back'><img class='image' src=' " +
        img_urls[i] + "'/><div class='image-name'>" +
        img_names[img_urls[i].substring(4).replace('.png', '')] +
        "</div></div></div>"
    );
  }

  var first;
  var second;

  var total_clicks = 0;
  var count = 0;

  function check_level() {
    if (total_clicks === 8) {
      $(".third-level").removeClass("level");
    } else if (total_clicks === 14) {
      $(".second-level").removeClass("level");
    } else if (total_clicks === 22) {
      $(".first-level").removeClass("level");
    }
  }

  function check_if_game_over() {
    if ($(".matched").length === 48) {

      setTimeout(function() {
        alert("Game over");
      }, 1200);

      setTimeout(function() {
        location.reload();
      }, 1800);

    }
  }

  $(".front").click(function(e) {

    count++;

    // 避免两次快速点击
    if ($(e.target).data('oneclicked') != 'yes') {
      $(e.target).css("pointer-events", "none");
      setTimeout(function() {
        $(e.target).css("pointer-events", "auto");
      }, 400);
    }

    if (count === 1) {

      $(this, ".front").addClass("showBack-front").addClass("clicked");
      $(this).next('.back').addClass("showBack-back").addClass("clicked");

      first = $(this, ".front").text();

    } else {

      $(this, ".front").addClass("showBack-front").addClass("clicked");;
      $(this).next('.back').addClass("showBack-back").addClass("clicked");;

      second = $(this, ".front").text();
      count = 0;

      $(".front").css("pointer-events", "none");

      setTimeout(function() {

        if (first === second) {

          total_clicks = total_clicks - 1;

          $('.clicked').addClass('animated tada matched no-pointer-events');

          // 检查游戏是否结束
          check_if_game_over();

        } else {

          $(".front").removeClass("showBack-front");
          $(".back").removeClass("showBack-back");

          $('.clicked').addClass('animated shake');

          setTimeout(function() {
            $(".clicked").removeClass("clicked shake");
          }, 500);

        }

        $(".front").css("pointer-events", "auto");


        total_clicks++;
        $(".total_clicks .js-click-count").text(total_clicks);
        check_level();

      }, 600);

    }

    return false;
  });
});
