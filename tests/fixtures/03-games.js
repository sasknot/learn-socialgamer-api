exports.seed = function(knex) {
  return knex('game').del()
  .then(function () {
    return knex('game').insert([
      {
        id: 1,
        cover: 1,
        name: "Gran Theft Auto V",
        release_date: "2013-09-17",
        description: "Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the first main entry in the Grand Theft Auto series since 2008's Grand Theft Auto IV."
      },
      {
        id: 2,
        cover: 2,
        name: "Minecraft",
        release_date: "2009-05-17",
        description: "Minecraft is a sandbox video game developed by Mojang. Minecraft was created by Markus \"Notch\" Persson in the Java programming language and was released as a public alpha for personal computers in 2009 before officially releasing in November 2011, with Jens Bergensten taking over development around then."
      },
      {
        id: 3,
        cover: 3,
        name: "The Last of Us",
        release_date: "2013-06-14",
        description: "The Last of Us is a 2013 action-adventure game developed by Naughty Dog and published by Sony Computer Entertainment. Players control Joel, a smuggler tasked with escorting a teenage girl, Ellie, across a post-apocalyptic United States. The Last of Us is played from a third-person perspective."
      }
    ]);
  });
};
