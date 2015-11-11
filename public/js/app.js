/**
 * Created by yan on 15-11-5.
 */

$(function () {

  var totalSize = 0;

  /**
   * draw specified tree with index number
   *
   * @throttled 80ms
   * @param id {number}
   */
  var draw = _.throttle(function (index) {
    $.getJSON('/tree/' + index, function (t) {

      if (index === 'latest') {
        $('#index').text(totalSize);
      } else {
        $('#index').text(index + 1);
      }

      $('#tree').text(JSON.stringify(t, null, 2));
    });
  }, 80);

  $("#preview").on('mousemove', function (e) {
    var index = Math.floor(totalSize * e.offsetX / $(window).width());
    draw(index);
  });

  /**
   * socket onmessage handler
   */
  function onmessage(e) {
    if (e) {
      totalSize = parseInt(e.data);
      $('#totalSize').text(totalSize);
    }
    draw('latest');
  }

  var ws = new WebSocket('ws://' + location.host);
  ws.addEventListener('message', onmessage);

  // initial show latest tree
  onmessage();
});
