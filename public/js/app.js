/**
 * Created by yan on 15-11-5.
 */

$(function () {

  /**
   * draw specified tree with index
   *
   * @param id
   */
  function draw(id) {
    $.getJSON('/tree/' + id, function (t) {
      $('#tree').text(JSON.stringify(t, null, 2));
    });
  }

  /**
   * update preview
   */
  function drawPreview() {
    $.getJSON('/tree/size', function (size) {
      var html = "";
      wi = 100 / size;
      for (var i = 0; i < size; i++) {
        html += "<a class='node' data-index=" + i + " style='width:" + wi + "%'></a>"
      }
      $('#preview').html(html);
    });
  }

  $("#preview").on('mouseover', '.node', function () {
    draw($(this).data('index'));
  });

  /**
   * socket onmessage handler
   */
  function onmessage() {
    draw('latest');
    drawPreview();
  }

  var ws = new WebSocket('ws://' + location.host);
  ws.addEventListener('message', onmessage);

  // initial show latest tree
  onmessage();
});
