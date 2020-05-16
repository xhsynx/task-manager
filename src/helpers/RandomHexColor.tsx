/**Function that generate random hex color and return hex color */
export const hexcolor = () => {
  return "#" + ((Math.random() * (1 << 24)) | 0).toString(16);
};
