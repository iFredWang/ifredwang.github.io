$(function() {
  let run = 0,
      heading = $("h1"),
      timer,
      food_list = [];

  $.ajax({
      type: "GET",
      url: "foods.csv",
      dataType: "text",
      success: function(response) {
          let data = $.csv.toArrays(response);
          init_food_list(data);
      },
      error: function(ajaxContext) {
          food_list = ["馄饨", "拉面", "烩面", "热干面", "刀削面", "油泼面", "炸酱面", "炒面", "重庆小面", "米线", "酸辣粉", "土豆粉", "螺狮粉", "凉皮儿", "麻辣烫", "肉夹馍", "羊肉汤", "炒饭", "盖浇饭", "卤肉饭", "烤肉饭", "黄焖鸡米饭", "驴肉火烧", "川菜", "麻辣香锅", "火锅", "酸菜鱼", "烤串", "披萨", "烤鸭", "汉堡", "炸鸡", "寿司", "蟹黄包", "煎饼果子", "生煎", "炒年糕"];
      }
  });

  function init_food_list(data) {
      if (typeof(data[0]) === 'undefined') {
          return
      }

      food_list = [];
      $.each(data, function(index, row) {
          $.each(row, function(index, colData) {
              food_list.push(colData);
              return;
          });
      });
  }

  $("#start").click(function() {
      if (food_list.length == 0) {
          alert('正在初始化用餐列表，请稍等。')
          return
      }
      if (!run) {
          heading.html(heading.html().replace("吃这个！", "吃什么？"));
          $(this).val("停止");
          timer = setInterval(function() {
              var r = Math.ceil(Math.random() * food_list.length),
                  food = food_list[r - 1];
              $("#what").html(food);
              var rTop = Math.ceil(Math.random() * $(document).height()),
                  rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
                  rSize = Math.ceil(Math.random() * (37 - 14) + 14);
              $("<span class='temp'></span>").html(food).hide().css({
                  "top": rTop,
                  "left": rLeft,
                  "color": "rgba(0,0,0,." + Math.random() + ")",
                  "fontSize": rSize + "px"
              }).appendTo("body").fadeIn("slow", function() {
                  $(this).fadeOut("slow", function() {
                      $(this).remove();
                  });
              });
          }, 50);
          run = 1;
      } else {
          heading.html(heading.html().replace("吃什么？", "吃这个！"));
          $(this).val("不行，换一个");
          clearInterval(timer);
          run = 0;
      };
  });

  document.onkeydown = function enter(e) {
      var e = e || event;
      if (e.keyCode == 13) $("#start").trigger("click");
  };
});

// max run times
$clickTimes = 0;
$('#start').click(function() {
    $clickTimes++;
    if ($clickTimes >= 6) {
        $('#start').hide();
        $('#stop').show();
    }
})
$('#stop').click(function() {
    alert('这么作？今天别吃了！')
    $(this).hide();
})
