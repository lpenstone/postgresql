
exports.up = function(knex, Promise) {
  return knex.schema.table('milestones', function(t) {
    t.integer('famous_person_id').unsigned().index();
    t.foreign('famous_person_id').references('famous_people.id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('milestones', function(t) {
    t.dropColumn('famous_person_id');
  });
};