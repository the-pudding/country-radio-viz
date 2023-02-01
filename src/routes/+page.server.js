import fs from "fs";

export async function load() {
	const files = fs.readdirSync("./src/data").filter(d => d.includes('withB2B'));;

	const data = files;
	return { data };
}