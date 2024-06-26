import { lucia } from "../../../lib/auth";


export async function POST(context) {
	if (!context.locals.session) {
		return new Response(JSON.stringify({ error: "No session found" }), {
			status: 401
		});
	}

	await lucia.invalidateSession(context.locals.session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return context.redirect("/");
}