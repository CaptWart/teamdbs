$("p").append("<b>jbnkm text</b>");
document.getElementById("button").addEventListener("click", function(){
    event.preventDefault()
    console.log("click")
    var token = $("#placeholder").val()
    console.log(token)
    event.preventDefault()
    document.getElementById("#button")
    localStorage.setItem("key",token)
    window.location.href="index2.html"
})