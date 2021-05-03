/* eslint-disable arrow-body-style */
const convertDate = (date) => {
  const month = [];
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';
  const t = date.split(/[- :]/);

  // Apply each element to the Date function
  const d = new Date(t[0], t[1] - 1, t[2].substr(0, 2));
  return `${d.getDate()}-${month[d.getMonth()]}-${d.getFullYear()}`;
};
export default convertDate;
