"use strict";


var socket = io();
   
$("#room1-send").click(function () {
  socket.emit("room1-send",$("#input1").val());
  document.getElementById("input1").value = null;
});
$(".room1").click(function (name) {
  console.log(this.dataset.id);
  var name = $('#room-name').data('id');
  socket.emit("joinroom",this.dataset.id);
  socket.emit("room1",name);
  console.log(name);
});

socket.on("broadcast", function (datalist) {
  console.log(datalist);
  console.log(datalist.name + " datalist.name");  

    $(".content").append("<div>" + datalist.name+ ":" + datalist.contensts + "</div>");
    });