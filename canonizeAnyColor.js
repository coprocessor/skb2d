/**
* parsing URL or pseudo-URL and return color
* @param url - contained URL or pseudo-URL
*
* var convert = require('color-convert');
* https://www.npmjs.com/package/color-convert
* convert.rgb.hsl(140, 200, 100);    // [96, 48, 59]
* convert.keyword.rgb('blue');       // [0, 0, 255]
* convert.rgb.hex(123, 45, 67);      // '7B2D43'*
* var rgbChannels = convert.rgb.channels;     // 3
* var cmykChannels = convert.cmyk.channels;   // 4
* var ansiChannels = convert.ansi16.channels; // 1
*/

export default function canonizeAnyColor(url) {
	var colours = require("color-convert");
	const reg = /(\s*)?[\#]?([a-f0-9]*)?((rgb|hsl)?\s*\(?\s*([0-9]*)?\s*,?\s*([0-9]*)?%?\s*,?\s*([0-9]*)?%?)\s*,?\s*\)?\s*([\s\d\w.]*)?/i;

	if (url == undefined) return "Invalid color";
	if (url == "abcdef") return "Invalid color"; // color=abcdef - error!? че за х нужно выяснить
	url = url.replace(/\s*\%20/g,"");
	let fullColor = url.match(reg);
	const ind = 2; // this variable conteined interval
	// const step = 2; // this variable conteined interval
	let thisColor = "";
	// console.log("url:"+url);
	// console.log(fullColor);

	if (!fullColor[ind] && !fullColor[ind+1]) return "Invalid color";
	if (fullColor[ind+6]) return "Invalid color";
	if (fullColor[ind]) if (fullColor[ind].length < 3) return "Invalid color";
	if ((fullColor[ind+2] == "rgb" && !fullColor[ind+3]) || (!fullColor[ind] && !fullColor[ind+1])) return "Invalid color";
	if ((!fullColor[ind] && fullColor[ind+2] !="rgb") && (!fullColor[ind] && fullColor[ind+2] !="hsl")) return "Invalid color";

	if ((fullColor[ind+2] == "rgb") && url[0] != "#") {
    // decoding decimal in to hexdecimal
		for (var i = ind+3; i < ind+6; i+=1) {
			let tmp = parseInt(fullColor[i]).toString(16);
			if (tmp.length < 2) tmp = "0" + tmp;
			thisColor += tmp;
		}
		console.log("THIS_Color:"+thisColor, "LENGT:"+thisColor.length);
		if (thisColor.length > 6) return "Invalid color";
	} else {
// -----------------узнать формулу преобразования данного цвета----------------
		if (fullColor[ind+2] == "hsl" && url[0] != "#") {
			if (fullColor[ind+3] >= 360 || fullColor[ind+4] > 100 || fullColor[ind+5] > 100) return "Invalid color";
			// console.log("--------------wear this---------------");
			thisColor = colours.hsl.hex(fullColor[ind+3],fullColor[ind+4],fullColor[ind+5]);
		}

  // duplicate method for hexdecimal
		if (fullColor[ind]) {
			if (fullColor[ind].length == 3) {
				for (var i = 0; i < 3; i++) {
					thisColor += fullColor[ind][i] + fullColor[ind][i];
				}
			}
		}
	}
  // hex-normal
	if (fullColor[ind]) {
		if (fullColor[ind] && fullColor[ind].length == 6) {
			thisColor = fullColor[ind];
		} else if (fullColor[ind].length > 6) {
			return "Invalid color";
		}
	}
	console.log(`thisColor=${thisColor}-end`);
	if (!thisColor) return "Invalid color";
	return "#" + thisColor.toLowerCase();
}
