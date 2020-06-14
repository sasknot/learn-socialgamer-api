exports.seed = function(knex) {
  return knex('game_rating').del()
  .then(function () {
    return knex('game_rating').insert([
      {
        id: 1,
        user: 1,
        game: 1,
        number: 4
      },
      {
        id: 2,
        user: 2,
        game: 1,
        number: 3
      },
      {
        id: 3,
        user: 1,
        game: 2,
        number: 5
      }
    ]);
  });
};
