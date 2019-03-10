export const getTotalCargoWeight = (state) => {
  return Object.keys(state.ship.storage.contents).reduce((acc, curr) => {
    return acc + state.ship.storage.contents[curr];
  }, 0);
};
