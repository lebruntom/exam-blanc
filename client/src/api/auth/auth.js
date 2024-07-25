const baseURI = import.meta.env.VITE_API_BASE_URL;

export const userIsLogged = async (token) => {
  const url = `${baseURI}api/userIsLogged`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token, // Assurez-vous que les en-têtes sont correctement définis
      },
    });

    // Vérifiez si la réponse est correcte
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse la réponse JSON
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    console.error(
      "Erreur lors de la récupération de l'utilisateur connecté:",
      error
    );
    throw error; // Propager l'erreur pour permettre à l'appelant de la gérer
  }
};
