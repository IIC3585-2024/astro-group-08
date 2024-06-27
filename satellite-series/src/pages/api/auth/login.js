import { lucia } from "../../../lib/auth";
import { and, db, eq, User } from "astro:db";

export async function POST(context) {
	const formData = await context.request.formData();
	const username = formData.get("username");


	const password = formData.get("password");


	let existingUser;
	try {
		existingUser = await db.select().from(User).where(
			and(eq(User.username, username), eq(User.password, password)
		)).limit(1);
		if (existingUser.length === 0) {
			return new Response(JSON.stringify({ error: "Incorrect username or password" }), {
				status: 400
			});
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: `Error logging in: ${error.message}` }), {
			status: 500
		});
	}

	const session = await lucia.createSession(existingUser[0].id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);


    return context.redirect("/");
}