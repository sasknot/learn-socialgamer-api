exports.seed = function(knex) {
  return knex('game_comment').del()
  .then(function () {
    return knex('game_comment').insert([
      {
        id: 1,
        user: 1,
        game: 1,
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quo id quia repellendus animi iste distinctio libero. Alias et, necessitatibus dolor incidunt illo, vel est reiciendis voluptatibus quia explicabo consectetur.'
      },
      {
        id: 2,
        user: 2,
        game: 1,
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quo id quia repellendus animi iste distinctio libero. Alias et, necessitatibus dolor incidunt illo, vel est reiciendis voluptatibus quia explicabo consectetur.'
      },
      {
        id: 3,
        user: 1,
        game: 2,
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quo id quia repellendus animi iste distinctio libero. Alias et, necessitatibus dolor incidunt illo, vel est reiciendis voluptatibus quia explicabo consectetur.'
      }
    ]);
  });
};
