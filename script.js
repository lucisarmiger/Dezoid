function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
setInterval(function () {
	showTime();
}, 1000);




import express from "express";
import WebSocket from "ws";
import cors from "cors";

const app = express();
app.use(cors());

let latestHR = 0;

// Pulsoid connection (PRIVATE, server-side only)
const socket = new WebSocket(
  "wss://dev.pulsoid.net/api/v1/data/real_time?access_token=YOUR_TOKEN"
);

socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    latestHR = data?.data?.heart_rate || latestHR;
};

// Public endpoint for ALL users
app.get("/heartrate", (req, res) => {
    res.json({ heart_rate: latestHR });
});

app.listen(3000, () => {
    console.log("Server running on :3000");
});