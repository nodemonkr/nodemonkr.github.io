$(function() {
  // Mobile navbar
  $(".hyde.nav-toggle-btn").click(function() {
    $(".hyde.mobile-nav-wrapper").slideDown();
  });

  $(".hyde.mobile-nav-item.close-btn").click(function() {
    $(".hyde.mobile-nav-wrapper").slideUp();
  });

  // Dynamic navbar background(except main)
  $(window).scroll(function() {
    if ($(".hyde.navbar-parent").hasClass("main")) return;
    if ($(this).scrollTop() > 10) {
      $(".hyde.navbar-parent").addClass("navbar-bg");
    } else {
      $(".hyde.navbar-parent").removeClass("navbar-bg");
    }
  });

  // Auto-append '_blank' attribute to external link
  // https://stackoverflow.com/questions/12041935/how-to-automatically-add-target-blank-to-external-links-only
  $.expr[":"].external = function(obj) {
    return !obj.href.match(/^mailto\:/) && obj.hostname != location.hostname && !obj.href.match(/^javascript\:/) && !obj.href.match(/^$/);
  };
  $("a:external").attr("target", "_blank");

  // Clipboard
  var clipboard = new ClipboardJS(".hyde.share-item.copy");

  clipboard.on("success", function() {
    alert("클립보드에 복사되었습니다.");
  });

  clipboard.on("error", function(e) {
    console.log(e);
  });

  // Auto-add responsive Youtube iframe
  $(".hyde.youtube").each(function() {
    return $(this).append('<iframe src="https://www.youtube.com/embed/' + this.id + '" frameborder="0" allowfullscreen></iframe>');
  });
});

$(function () {
  var posts = [];
  $.get(lang + '/api/jekyll/posts.json', function (data) {
    posts = data;
  });
  $('#search').on('keyup', function () {
    var keyword = this.value.toLowerCase();
    var searchResult = [];

    if (keyword.length > 0) {
      $('#search-result').show();
    } else {
      $('#search-result').hide();
    }
    $('.result-item').remove();

    for (var i = 0; i < posts.length; i++) {
      var post = posts[i];
      if (
        post.title.toLowerCase().indexOf(keyword) >= 0 ||
        post.description.toLowerCase().indexOf(keyword) >= 0
      ) {
        searchResult.push(post);
      }
    }
    if (searchResult.length === 0) {
      $('#search-result').append(
        '<div class="result-item"><div class="description">There is no search result.</div></div>'
      );
    } else {
      for (var i = 0; i < searchResult.length; i++) {
        $('#search-result').append(
          '<a class="result-item" href="' +
            searchResult[i].url +
            '"><div class="title">【' + searchResult[i].category + '】' +
            searchResult[i].title +
            '</div><div class="description">' +
            searchResult[i].description +
            '</div></a>'
        );
      }
    }
  });
});