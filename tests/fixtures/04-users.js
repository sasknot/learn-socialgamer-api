exports.seed = function(knex) {
  return knex('user').del()
  .then(function () {
    return knex('user').insert([
      {
        id: 1,
        avatar: null,
        name: "John Doe",
        email: "john.doe@email.com",
        password: "123",
        birthday: "1990-01-01",
        location: "California",
        description: "Hi, I'm John Doe! Nice to meet you"
      },
      {
        id: 2,
        avatar: null,
        name: "Monty Python",
        email: "monty.python@email.com",
        password: "456",
        birthday: "1994-01-01",
        location: "Texas",
        description: "Hello there"
      },
      {
        id: 3,
        avatar: null,
        name: "Karen Eliot",
        email: "karen.eliot@email.com",
        password: "789",
        birthday: "1996-01-01",
        location: "NY",
        description: null
      }
    ]);
  });
};
