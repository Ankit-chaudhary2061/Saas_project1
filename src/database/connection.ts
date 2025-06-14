import { Sequelize } from 'sequelize-typescript';

// console.log({ xxx: process.env.DB_NAME });
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: Number(process.env.DB_PORT),
  models: [__dirname + '/models'] //current location  + '/models"
});
sequelize
  .authenticate()
  .then(() => {
    console.log('authenticated connect vayo');
  })
  .catch((error) => {
    console.log(error);
  });

sequelize.sync({alter:false}).then(()=>{
  console.log('migrated sucessfully vayo ');
})
export default sequelize;
