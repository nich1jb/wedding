export const formFields = {
  manualAddressFormFields: [
    {
      name: 'address',
      label: 'Address',
    },
    {
      name: 'city',
      label: 'City',
    },
    {
      name: 'postCode',
      label: 'Post Code',
    },
    {
      name: 'country',
      label: 'Country',
    },
  ],

  registerFormFields: [
    {
      name: 'email',
      label: 'What is your email address?',
    },
    {
      name: 'address',
      label: 'What is your physical address?',
    },
    {
      name: 'guests',
      label:
        'How many guests will you be registering for the wedding? (Not including children)',
    },
    {
      name: 'children',
      label: 'How many children will you be registering?',
    },
    {
      name: 'nameGuest0',
      label: '',
    },
  ],
};

const anyLetters = /[A-Za-z]/;
const anyCharacters = /(.*)/;

export const formValidators = {
  registerFormFields: {
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    address: anyLetters,
    guests: anyCharacters,
    children: anyCharacters,
    nameGuest0: anyLetters,
  },
  manualAddressFormFields: {
    address: anyLetters,
    city: anyLetters,
    postCode: anyCharacters,
    country: anyLetters,
  },
};
