import { submitContactRequest } from "@/actions/contact";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "All fields are required." }), { status: 400 });
    }
    await submitContactRequest({ name, email, subject, message });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Server error." }), { status: 500 });
  }
}
