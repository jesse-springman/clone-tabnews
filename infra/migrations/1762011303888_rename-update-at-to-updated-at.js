exports.up = (pgm) => {
  pgm.renameColumn("users", "update_at", "updated_at");
};

exports.down = false;
