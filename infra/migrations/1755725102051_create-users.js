exports.up = (pgm) => {

  pgm.createTable("users", {
  
    id:{
      type:'uuid',
      primaryKey:true,
      default: pgm.func("gen_random_uuid()")
    },

    username:{
      type:'varchar(30)',
      notNull: true,
      unique:true
    },

    email:{
      type: "varchar(220)",
      notNull: true,
      unique: true
    },

    password:{
      type:"varchar(70)",
      notNull: true
    },

    create_at:{
      type: "timestamptz",
      default: pgm.func("now()")
    },

    uptade_at: {
      type:"timestamptz",
      default: pgm.func("now()")
    }
    
  });

};

  


exports.down = false;
