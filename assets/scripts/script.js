document.getElementById("button").addEventListener("click", function(){
    event.preventDefault()
    var token = $("#placeholder").val()
    // console.log(token)
    if (token == ""){
        $('#notValid').text("Please enter valid key");
    }
    else{
        event.preventDefault()
        document.getElementById("#button")
        sessionStorage.setItem("key",token)
        window.location.href="lyrics.html"
    }

})