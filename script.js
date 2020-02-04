<script type="text/javascript">
  // properties
  var count = 0;
  var counter = null;

  window.onload = function() {
    initCounter();
  };

  function initCounter() {
    // get count from localStorage, or set to initial value of 1000
    count = getLocalStorage('count') || 1000;
    counter = setInterval(timer, 1000); //1000 will  run it every 1 second
  }

  function setLocalStorage(key, val) {
    if (window.localStorage) {
      window.localStorage.setItem(key, val);
    }

    return val;
  }

  function getLocalStorage(key) {
    return window.localStorage ? window.localStorage.getItem(key) : '';
  }

  function timer() {
    count = setLocalStorage('count', count - 1);
    if (count == -1) {
      clearInterval(counter);
      return;
    }

    var seconds = count % 60;
    var minutes = Math.floor(count / 60);
    var hours = Math.floor(minutes / 60);
    minutes %= 60;
    hours %= 60;

    document.getElementById("timer").innerHTML = hours +  "hours "  + minutes +  "minutes and "   + seconds +  "  seconds left to complete this transaction"; // watch for spelling
  }
 </script>
 <div id="timer"></div>