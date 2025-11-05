exports.up = (pgm) => {
  pgm.renameColumn("users", "uptade_at", "update_at");
};

exports.down = false;
