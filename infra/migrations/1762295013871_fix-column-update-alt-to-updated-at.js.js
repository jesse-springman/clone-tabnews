exports.up = (pgm) => {
  pgm.sql(`
    DO $$
    BEGIN
      -- Verifica se a coluna "update_alt" existe
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'update_alt'
      ) THEN
        ALTER TABLE users RENAME COLUMN update_alt TO updated_at;
      END IF;
    END $$;
  `);
};

exports.down = false;
