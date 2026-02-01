export async function middlewareAPI(credentials: {
  email: string;
  password: string;
}) {
  const apiType = process.env.API_TYPE as "REST" | "GRAPHQL";
  const apiUrl = process.env.API_URL as string;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;

  let response;

  if (apiType === "REST") {
    response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log("users---",response)

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const users = await response.json();
    const user = users.find(
      (user: any) =>
        user.user_email === credentials.email &&
        user.password === credentials.password
    );
    console.log("user---", user)

    if (user) {
      return sessionData(user, apiType);
    }
    return null;
  }

  if (apiType === "GRAPHQL") {
    const query = `
        query {
          allUserCatalogs {
            nodes {
              userEmail
              password
              userCatalogId
              userName
              userMobile
              businessNumber
              businessName
              firstName
              lastName
            }
          }
        }
      `;

    response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query: query,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data from GraphQL API");
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return null;
    }

    const users = result.data?.allUserCatalogs?.nodes;
    if (!users) {
      return null;
    }

    const user = users.find(
      (u: any) =>
        u.userEmail === credentials.email && u.password === credentials.password
    );

    if (user) {
      return sessionData(user, apiType);
    }

    return null;
  }

  function sessionData(user: any, apiType: "REST" | "GRAPHQL") {
    if (apiType === "REST") {
      return {
        id: user.user_catalog_id,
        name: user.user_name,
        email: user.user_email,
        mobile: user.user_mobile,
        business_number: user.business_number,
        business_name: user.business_name,
        first_name: user.first_name,
        last_name: user.last_name,
        business_postcode: user.business_postcode,
        business_phone_no: user.business_phone_no,
        roles: user.roles,
        roles_json: user.roles_json,
      };
    }
    if (apiType === "GRAPHQL") {
      return {
        id: user.userCatalogId,
        name: user.userName,
        email: user.userEmail,
        mobile: user.userMobile,
        business_number: user.businessNumber,
        business_name: user.businessName,
        first_name: user.firstName,
        last_name: user.lastName,
        business_postcode: user.business_postcode,
        business_phone_no: user.business_phone_no,
        roles: user.roles,
        roles_json: user.roles_json,
      };
    }
    
    // Fallback return - this was missing
    return null;
  }
}
