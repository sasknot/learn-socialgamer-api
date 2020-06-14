exports.up = function(knex) {
  return knex.schema.createTable('media', function(table) {
    table.increments('id');
    table.string('filename', 250).notNullable();
    table.text('url').notNullable();
    table.text('mimetype');
    table.integer('kb_size');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .then(function() {
    return knex.schema.createTable('console', function(table) {
      table.increments('id');
      table.string('name', 50).notNullable();
      table.date('release_date').notNullable();
      table.text('description');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  })
  .then(function() {
    return knex.schema.createTable('game', function(table) {
      table.increments('id');
      table.integer('cover').references('id').inTable('media').notNullable();
      table.string('name', 150).notNullable();
      table.date('release_date');
      table.text('description');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  })
  .then(function() {
    return knex.schema.createTable('game_consoles', function(table) {
      table.increments('id');
      table.integer('game').references('id').inTable('game').notNullable();
      table.integer('console').references('id').inTable('console').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  })
  .then(function() {
    return knex.schema.createTable('game_rating', function(table) {
      table.increments('id');
      table.integer('user').references('id').inTable('user').notNullable();
      table.integer('game').references('id').inTable('game').notNullable();
      table.integer('number').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  })
  .then(function() {
    return knex.schema.createTable('game_comment', function(table) {
      table.increments('id');
      table.integer('user').references('id').inTable('users').notNullable();
      table.integer('game').references('id').inTable('games').notNullable();
      table.text('message').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  })
  .then(function() {
    return knex.schema.createTable('user', function(table) {
      table.increments('id');
      table.integer('avatar').references('id').inTable('media');
      table.string('name', 150).notNullable();
      table.string('email', 150).notNullable();
      table.string('password', 100).notNullable();
      table.date('birthday').notNullable();
      table.string('location', 200);
      table.text('description');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  })
  .then(function() {
    return knex.schema.createTable('user_friends', function(table) {
      table.increments('id');
      table.integer('user').references('id').inTable('user').notNullable();
      table.integer('friend').references('id').inTable('user').notNullable();
      table.string('status', 10).notNullable().defaultTo('pending');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  })
  .then(function() {
    return knex.schema.createTable('user_games', function(table) {
      table.increments('id');
      table.integer('user').references('id').inTable('user').notNullable();
      table.integer('game').references('id').inTable('game').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  })
  .then(function() {
    return knex.schema.createTable('user_consoles', function(table) {
      table.increments('id');
      table.integer('user').references('id').inTable('user').notNullable();
      table.integer('console').references('id').inTable('console').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_consoles')
  .then(function() {
    return knex.schema.dropTable('user_games');
  })
  .then(function() {
    return knex.schema.dropTable('user_friends');
  })
  .then(function() {
    return knex.schema.dropTable('user');
  })
  .then(function() {
    return knex.schema.dropTable('game_comment');
  })
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
    return knex.schema.dropTable('media');
  });
};
