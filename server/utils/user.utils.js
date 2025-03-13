const computeMockUsersData = () => {
  return [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 555-1234",
      address: {
        street: "123 Main St",
        city: "New York",
        zip: "10001",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 555-5678",
      address: {
        street: "456 Oak Ave",
        city: "Los Angeles",
        zip: "90001",
      },
    },
  ];
};

module.exports = computeMockUsersData;
