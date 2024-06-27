import { lucia } from "../../../lib/auth";
import { generateId } from "lucia";
import { db, User } from "astro:db";

export async function POST(context) {
	const formData = await context.request.formData();
	const username = formData.get("username");



	
    
	const password = formData.get("password");
    
	console.log(password);

	const userId = generateId(10);

	try {
		await db.insert(User).values({
			id: userId,
			username: username,
			password: password,
		});
	} catch (error) {
		return new Response(JSON.stringify({
			error: `Error creating user: ${error.message}`,
		}), {
			status: 500
		});
	}

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return context.redirect("/");
}