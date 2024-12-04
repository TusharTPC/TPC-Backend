// Define basic schema structures that can be used with any validator
export const userSchemaRules = {
  name: {
    type: 'string',
    required: true,
    min: 2,
  },
  email: {
    type: 'email',
    required: true,
  },
  phone: {
    type: 'phone',
    required: true,
    pattern: /^\+?[\d\s-]{10,}$/,
  },
};

export const vehicleSchemaRules = {
  ownerId: {
    type: 'string',
    required: true,
  },
  make: {
    type: 'string',
    required: true,
  },
  model: {
    type: 'string',
    required: true,
  },
  year: {
    type: 'number',
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1,
  },
  // ... other vehicle rules
};

export const locationSchemaRules = {
  address: {
    type: 'string',
    required: true,
  },
  city: {
    type: 'string',
    required: true,
  },
};