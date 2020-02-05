$('#button').click(function (){
    event.preventDefault()
    var token = $("#placeholder").val()
    // console.log(token)
    if (token == ""){
        $('#notValid').text("Please enter valid key");
    }
    else{
        event.preventDefault()
        $("#button")
        sessionStorage.setItem("key",token)
        window.location.href="lyrics.html"
    }
})


  // properties
  var count = 0;
  var counter = null;
  var minutes = 60;

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
    seconds %= 60;
    if (seconds == 0) {
      minutes--
    }

    //minutes %= 60;//
    $("#time").text(seconds + minutes)
    document.getElementById("time").innerHTML =   + minutes + " minutes left"; // watch for spelling
  }