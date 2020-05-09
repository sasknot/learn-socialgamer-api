exports.seed = function(knex) {
  return knex('media').del()
  .then(function () {
    return knex('media').insert([
      {
        id: 1,
        filename: 'gtav-cover.jpg',
        url: 'files/',
        mimetype: 'image/jpeg',
        kb_size: 300
      },
      {
        id: 2,
        filename: 'minecraft-cover.png',
        url: 'files/',
        mimetype: 'image/png',
        kb_size: 400
      },
      {
        id: 3,
        filename: 'the-last-of-us-cover.png',
        url: 'files/',
        mimetype: 'image/jpg',
        kb_size: 350
      }
    ]);
  });
};
