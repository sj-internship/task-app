const config = {
    db:{
        PORT:3000,
        DATABASE_URL:"mongodb://localhost:27017/myDb"
    },
    bcrypt:{
        saltRounds:10
    }
};
exports.config = config;
