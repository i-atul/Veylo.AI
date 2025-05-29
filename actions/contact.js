import { db } from "@/lib/prisma";

export async function submitContactRequest({ name, email, subject, message }) {
  if (!name || !email || !subject || !message) {
    throw new Error("All fields are required.");
  }

  const contact = await db.contactRequest.create({
    data: { name, email, subject, message },
  });

  return contact;
}
