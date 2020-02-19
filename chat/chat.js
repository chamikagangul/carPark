var express = require('express');
var router = express.Router();
var db = require('../model/db');

exports.chat = function (io) {
  io.on('connection', function (socket) {

    console.log("User connected");
    socket.on('io-join', function (id) {
      socket.join(String(id));
    });


    socket.on('io-reserve', function (msg) {
      socket.join(String(msg.data.id));
      console.log(msg);
      ds = {
        Name: msg.data.Name,
        status: msg.data.status,
        pin: msg.data.pin
      }

      db.update(msg.data.id, ds);
      console.log("updated");
      io.emit('io-update-page', "update the page");
      socket.emit('io-redirect', "slot");
    });

    socket.on('io-carPark-park', function (data) {
      console.log("slot : " + data);
      io.to(data).emit('io-park', data);
      db.read({ slotNo: data }, (slotdata) => {
        console.log(slotdata[0].status);
        ds = {}
        if (slotdata[0].status == "free") {
          ds = {
            status: "danger",
          }
        } else if (slotdata[0].status == "waiting") {
          ds = {
            status: "reserved",
          }
        }
        db.update(data, ds);
        console.log("updated");
        io.emit('io-update-page', "update the page");
      });


    });

    socket.on('io-carPark-remove', function (data) {
      console.log("slot : " + data);
      io.to(data).emit('io-remove', data);
      db.read({ slotNo: data }, (slotdata) => {
        console.log(slotdata[0].status);
        ds = {}
        if (slotdata[0].status == "free") {
          ds = {
            status: "danger",
          }
        } else if (slotdata[0].status == "waiting") {
          ds = {
            status: "reserved",
          }
        }
        db.update(data, ds);
        console.log("updated");
        io.emit('io-update-page', "update the page");
      });
    });

    socket.on('io-login', function (data) {
      console.log(data);
      db.read(data, (slot) => {
        if (slot[0]) {
          socket.join(String(slot[0].slotNo));
          console.log("slot : " + slot[0].slotNo);
        } socket.emit('io-card', slot);

      });
      //io.to(data).emit('io-test', data);
    });


    socket.on('io-remove', function (data) {
      console.log(data);
      ds = {
        Name: "",
        status: "free",
        pin: ""
      }

      db.update(data.id, ds);
      io.emit('io-update-page', "update the page");
    });


  });
}
