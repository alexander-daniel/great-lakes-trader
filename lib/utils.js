export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getMarketPrices = () => ({
  general: randomIntFromInterval(2, 23),
  pelts: randomIntFromInterval(48, 270),
  armaments: randomIntFromInterval(320, 1400),
  opium: randomIntFromInterval(8000, 90000)
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
