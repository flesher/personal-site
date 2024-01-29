import { kv } from "@vercel/kv";
import fs from "fs";

const data = fs.readFileSync(process.env["LOCAL_DATA_PATH"]);

console.log(JSON.parse(data));

await kv.set("pages", JSON.parse(data));

