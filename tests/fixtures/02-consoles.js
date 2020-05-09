exports.seed = function(knex) {
  return knex('console').del()
  .then(function () {
    return knex('console').insert([
      {
        id: 1,
        name: "Playstation 4",
        release_date: "2013-11-15",
        description: "The PlayStation 4 (officially abbreviated as PS4) is an eighth-generation home video game console developed by Sony Interactive Entertainment. Announced as the successor to the PlayStation 3 in February 2013, it was launched on November 15 in North America, November 29 in Europe, South America and Australia, and on February 22, 2014 in Japan. It's the 4th best-selling console of all time. It competes with Microsoft's Xbox One and Nintendo's Wii U and Switch."
      },
      {
        id: 2,
        name: "Xbox One",
        release_date: "2013-11-22",
        description: "The Xbox One is an eighth-generation home video game console developed by Microsoft. Announced in May 2013, it is the successor to Xbox 360 and the third console in the Xbox series of video game consoles. It was first released in North America, parts of Europe, Australia, and South America in November 2013, and in Japan, China, and other European countries in September 2014. It is the first Xbox game console to be released in China, specifically in the Shanghai Free-Trade Zone. Microsoft marketed the device as an \"all-in-one entertainment system\", hence the name 'Xbox One'. The Xbox One mainly competes against Sony's PlayStation 4 and Nintendo's Wii U and Switch."
      }
    ]);
  });
};
