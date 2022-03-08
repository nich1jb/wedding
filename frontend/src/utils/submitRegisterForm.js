const getGuests = regiterFormData => {
  const { guests } = regiterFormData;
  const guestsArray = [];
  for (let i = 0; i < Number(guests); i++) {
    guestsArray.push({
      name: regiterFormData[`nameGuest${i}`],
      dietaries: [regiterFormData[`dietariesGuest${i}`]],
    });
  }

  return guestsArray;
};

const getChildren = regiterFormData => {
  const { children } = regiterFormData;
  const childrenArray = [];
  if (Number(children) > 0) {
    for (let i = 0; i < Number(children); i++) {
      childrenArray.push({
        name: regiterFormData[`nameChild${i}`],
        dietaries: [regiterFormData[`dietariesChild${i}`]],
      });
    }
  }

  return childrenArray;
};

const submitRegisterForm = regiterFormData => {
  const { REACT_APP_API_URL } = process.env;
  const { email, address } = regiterFormData;

  const data = {
    email,
    address,
    guests: getGuests(regiterFormData),
    children: getChildren(regiterFormData),
  };

  const guestApiCall = fetch(`${REACT_APP_API_URL}/guests`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  }).catch(e => console.log(e));

  const emailApiCall = fetch(`${REACT_APP_API_URL}/email`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ recipient: email }),
  }).catch(e => console.log(e));

  Promise.all([guestApiCall, emailApiCall]);
};

export default submitRegisterForm;
