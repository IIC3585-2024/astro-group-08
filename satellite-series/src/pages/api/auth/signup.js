import { lucia } from "../../lib/auth";
import { generateId } from "lucia";
import { db, User } from "astro:db";

export async function createNewUser(context) {
	const formData = await context.request.formData();
	const username = formData.get("username");

	
    
	const password = formData.get("password");
    
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return new Response(JSON.stringify({
			error: "Invalid password: must be 6-255 characters long",
		}), {
			status: 400
		});
	}

	const userId = generateId(10);

	try {
		await db.insert(User).values({
			id: userId,
			username,
			password,
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