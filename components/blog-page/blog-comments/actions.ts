"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath, revalidateTag } from "next/cache";

export async function hasCommentsTable() {
  try {
    // Check if the table already exists
    const tableCheck = await sql`
   SELECT EXISTS (
     SELECT FROM information_schema.tables 
     WHERE table_schema = 'public' 
     AND table_name = 'comments'
   );
 `;

    const tableExists = tableCheck.rows[0].exists;

    return tableExists;
  } catch (err) {
    throw err;
  }
}

export async function createCommentsDb() {
  try {
    const result = await sql`CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    postId VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    comment TEXT NOT NULL,
    createdTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parentId INTEGER,
    FOREIGN KEY (parentId) REFERENCES comments (id) ON DELETE CASCADE
);`;

    return result;
  } catch (err) {
    throw err;
  }
}

export async function createComment(
  entryId: string,
  parentId: number | null | undefined,
  pathname: string,
  formData: FormData,

) {
  const rawFormData = {
    comment: formData.get("comment")?.toString(),
    name: formData.get("name")?.toString(),
    email: formData.get("email")?.toString(),
    postid: entryId,
    parentId: parentId || null,
  };

  try {
    if (rawFormData.parentId) {
      const result = await sql`
        INSERT INTO comments (postId, name, email, comment, createdTime, parentId)
        VALUES (${rawFormData.postid}, ${rawFormData.name}, ${rawFormData.email}, ${rawFormData.comment}, CURRENT_TIMESTAMP, ${rawFormData.parentId})
        RETURNING *;
      `;
      console.log("Inserted comment with parentId:", result);
    } else {
      const result = await sql`
        INSERT INTO comments (postId, name, email, comment, createdTime)
        VALUES (${rawFormData.postid}, ${rawFormData.name}, ${rawFormData.email}, ${rawFormData.comment}, CURRENT_TIMESTAMP)
        RETURNING *;
      `;
      console.log("Inserted comment without parentId:", result);
    }
  } catch (err) {
    console.error("Error posting comment:", err);
    throw err;
  }

  revalidatePath(pathname);
  revalidateTag(pathname)
}

// Fetch comments with no-cache policy
export async function fetchComments(entryId: string) {
  // const { rows } = await sql`SELECT * FROM comments WHERE postid = ${entryId}`;
  
  const { rows } = await sql`
  SELECT * FROM comments 
  WHERE postid = ${entryId}
  ORDER BY createdTime DESC
`;

  return rows;
}
