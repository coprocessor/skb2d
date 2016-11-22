import express from "express";
import cors from "cors";
import canonizeAnyColor from "./canonizeAnyColor";

const appExpress = express();
const openPort = 3000;
appExpress.use(cors());

appExpress.get("/task2d", (req, res) => {
	res.send(canonizeAnyColor(req.query.color || req.query.colour));
});

appExpress.listen(openPort, () => {
	console.log(`------------- port on ${openPort} ----------------`);
});


// array.forEach( url => {
// 	const thisColor = canonizeAnyColor(url);
// 	console.log(thisColor);
// 	// console.log(thisColor);
// });

// const array = [
// 	"http://localhost:3000/task2d?color=xfiles",
// 	"http://localhost:3000/task2d?color=123abcetrt",
// 	"http://localhost:3000/task2d?color=123abc",
// 	"http://localhost:3000/task2d?color=123abadcc",
// 	"http://localhost:3000/task2d?color=123ABC",
// 	"http://localhost:3000/task2d?color=ab2",
// 	"http://localhost:3000/task2d?color=#ab2",
// 	"http://localhost:3000/task2d?color=hsl(10, 35%, 80%)",
// 	"http://localhost:3000/task2d?color=hsl(0, 0%, 0%)",
// 	"http://localhost:3000/task2d?color=rgb(10, 255, 64)",
// ];
