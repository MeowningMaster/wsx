import { Wsx } from "@wsx/server"
import { Type } from "@sinclair/typebox"
import { Client } from "@wsx/client"

const port = 3000
export const app = new Wsx()
	.rpc(
		"/hi",
		({ body }) => {
			console.log("hi", body)
			return "hi"
		},
		{
			body: Type.Object({ number: Type.Number() }),
		},
	)
	.rpc("/hi/:id", ({ params }) => params, {
		params: Type.Object({ id: Type.String() }),
	})
	.rpc("/hi/world", () => console.log("hi world"))
	.listen(port)

console.info("Server started", { port })

const client = await Client<typeof app>("localhost:3000")
const r1 = await client.hi.rpc({ number: 5 })
console.info(r1)

const r2 = await client.hi.bruh.rpc()
console.info(r2)

// import readline from "node:readline"
// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// })

// rl.question("Send?", async (name) => {})
