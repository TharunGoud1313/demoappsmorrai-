import { BASE_URL } from "@/constants/envConfig";

export async function verifyEmailInDatabase(userId:any) {
  try {
    const url = `${BASE_URL}/user_catalog?user_catalog_id=eq.${userId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      body: JSON.stringify({
        emailverify: true,
      }),
    });

    // Check if the update was successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error updating email verification:', errorData);
      return false; 
    }

    return true;
  } catch (error) {
    console.error('Failed to verify email in database', error);
    throw new Error('Failed to verify email in database');
  }
}
