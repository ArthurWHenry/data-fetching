export async function mockFetchUserFavorites(userId: number) {
  if (userId === 2) {
    return {
      favorites: {
        pokemon: "Rayquaza",
        movie: "The Imitation Game",
      },
    };
  }

  return {
    favorites: {
      pokemon: "Pikachu",
      movie: "Edward Scissor Hands",
    },
  };
}
