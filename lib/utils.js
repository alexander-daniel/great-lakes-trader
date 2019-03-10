export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getMarketPrices = () => ({
  general: randomIntFromInterval(2, 18),
  pelts: randomIntFromInterval(50, 250),
  armaments: randomIntFromInterval(350, 1000),
  opium: randomIntFromInterval(1000, 70000)
});

export const getNextSeason = (currentSeason) => {
  switch (currentSeason) {
    case 'spring':
      return 'summer';
    case 'summer':
      return 'autumn';
    case 'autumn':
      return 'winter';
    case 'winter':
      return 'spring';
    default:
      throw new Error(`no next season for ${currentSeason}`);
  }
};
