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