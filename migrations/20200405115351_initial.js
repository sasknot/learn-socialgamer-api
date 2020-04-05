
exports.up = function(knex) {
  return knex.schema.createTable('media', function(table) {
    table.increments('id');
    table.string('filename', 250).notNullable();
    table.text('url').notNullable();
    table.text('mimetype');
    table.integer('kb_size');
    table.timestamps();
  })
  .then(function() {
    return knex.schema.createTable('user', function(table) {
      table.increments('id');
      table.integer('avatar').references('id').inTable('medias').notNullable();
      table.string('name', 150).notNullable();
      table.string('email', 150).notNullable();
      table.string('password', 100).notNullable();
      table.date('birthday').notNullable();
      table.string('location', 200);
      table.text('description');
      table.timestamps();
    });
  })
  .then(function() {
    return knex.schema.createTable('user_friends', function(table) {
      table.increments('id');
      table.integer('user').references('id').inTable('users').notNullable();
      table.integer('friend').references('id').inTable('users').notNullable();
      table.string('status', 10).notNullable().defaultTo('pending');
      table.timestamps();
    });
  })
  .then(function() {
    return knex.schema.createTable('console', function(table) {
      table.increments('id');
      table.string('name', 50).notNullable();
      table.date('release_date').notNullable();
      table.text('description');
      table.timestamps();
    });
  })
  .then(function() {
    return knex.schema.createTable('game', function(table) {
      table.increments('id');
      table.integer('cover').references('id').inTable('medias').notNullable();
      table.string('name', 150).notNullable();
      table.date('release_date');
      table.text('description');
      table.timestamps();
    });
  })
  .then(function() {
    return knex.schema.createTable('game_consoles', function(table) {
      table.increments('id');
      table.integer('game').references('id').inTable('games').notNullable();
      table.integer('console').references('id').inTable('consoles').notNullable();
      table.timestamps();
    });
  })
  .then(function() {
    return knex.schema.createTable('game_rating', function(table) {
      table.increments('id');
      table.integer('user').references('id').inTable('users').notNullable();
      table.integer('game').references('id').inTable('games').notNullable();
      table.integer('number').notNullable();
      table.timestamps();
    });
  })
  .then(function() {
    return knex.schema.createTable('game_comments', function(table) {
      table.increments('id');
      table.integer('user').references('id').inTable('users').notNullable();
      table.integer('game').references('id').inTable('games').notNullable();
      table.text('message').notNullable();
      table.timestamps();
    });
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('game_comments')
  .then(function() {
    return knex.schema.dropTable('game_rating');
  })
  .then(function() {
    return knex.schema.dropTable('game_consoles');
  })
  .then(function() {
    return knex.schema.dropTable('game');
  })
  .then(function() {
    return knex.schema.dropTable('console');
  })
  .then(function() {
    return knex.schema.dropTable('user_friends');
  })
  .then(function() {
    return knex.schema.dropTable('user');
  })
  .then(function() {
    return knex.schema.dropTable('media');
  });
};
