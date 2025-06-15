import {
  Table,
  Column,
  DataType,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'users', // The table name in your database
  modelName: 'User', // Internal Sequelize model name
  timestamps: true, // Adds createdAt and updatedAt columns
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.ENUM('Teacher', 'institute', 'super-admin', 'student'),
    allowNull: false,
    defaultValue: 'student', // 👈 this sets the default if role is not provided
  })
  declare role: string;
}

export default User;
