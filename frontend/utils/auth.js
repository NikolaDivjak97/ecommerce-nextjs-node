export async function getUser() {
    const token = sessionStorage.getItem("token");

    if(!token) return null;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Not authenticated");
  
      return await res.json();
      
    } catch (error) {
      return null;
    }
  }
  
  