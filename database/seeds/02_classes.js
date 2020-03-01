
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {
          name: "yoga",
          type: "meditation",
          duration: "2 hours",
          intensity: "high",
          location: "moms basement",
          start_time: "2:45PM",
          size:"12",
          max_size: "14",
          description: "hello",
          instructor_id: 1
        },
        { 
          name: "chest press",
          type: "body building",
          duration: "1 hour",
          intensity: "medium",
          location: "dads basement",
          start_time: "2:45PM",
          size:"12",
          max_size: "14",
          description: "hello",
          instructor_id: 1
        }
      ]);
    });
};
