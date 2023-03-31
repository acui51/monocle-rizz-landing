// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(500).json({ message: "Wrong request method" });
  }

  try {
    const { body } = req;
    const { email } = JSON.parse(body);

    const { error } = await supabase.from("waitlist").upsert(
      {
        email: email,
      },
      { onConflict: "email" }
    );

    if (error) {
      throw new Error("There was an error joining the waitlist");
    }

    res.status(200).json({ message: "Successfuly signed up" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
