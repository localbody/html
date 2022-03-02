function handler(ev) {
    var checkbox = document.getElementById('show_' + ev.type);
    if (!checkbox.checked) {
      return;
    }
    var show_repeat = document.getElementById('show_repeat');
    if (ev.repeat && !show_repeat.checked) {
      return;
    }

    var table = document.getElementById('results');
    var tr = table.tBodies[0].insertRow(0);
    var attributes = [
        'type',
        'key',
        'code',
        'charCode',
        'keyCode',
        'which',
        'ctrlKey',
        'shiftKey',
        'altKey',
        'metaKey',
        'repeat',
        'isComposing',
    ];
    for (var i=0; i<attributes.length; i++) {
      var td = tr.insertCell();
      var value = ev[attributes[i]];
      if (typeof value === 'string') {
        value = '"' + value + '"';
      }
      td.textContent = value;
    }
  }
  document.getElementById('demo').addEventListener('input', handler);
  document.getElementById('demo').addEventListener('keypress', handler);
  document.getElementById('demo').addEventListener('keydown', handler);
  document.getElementById('demo').addEventListener('keyup', handler);
