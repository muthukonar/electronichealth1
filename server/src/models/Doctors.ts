import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Define the attributes for the Doctor model
interface DrAttr {
  dr_id: number;
  dr_name: string;
  email: string;
  password: string;
  specialization?: string;
  //! adding the image field to the interface just to keep best practice
  image_url?: string;
  //! Hope the red isn't freaking you guys out
}

// Define the optional attributes for creating a new Doctor
interface DrCreationAttributes extends Optional<DrAttr, 'dr_id'> {}

// Define the Doctor class extending Sequelize's Model
export class Dr extends Model<DrAttr, DrCreationAttributes> implements DrAttr {
  public dr_id!: number;
  public dr_name!: string;
  public email!: string;
  public password!: string;
  public specialization?: string;
  //! this is where the image url is going to be stored
  public image_url?: string;
  //!--------------------------

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to hash and set the password for the doctor
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

// Define the DoctorFactory function to initialize the Doctor model
export function DrFactory(sequelize: Sequelize): typeof Dr {
  Dr.init(
    {
      dr_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dr_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      //! Field added for image, i set the allowNull to true to allow doctors to not upload an image
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      //!---------------------
    },
    {
      tableName: 'doctors',
      sequelize,
      hooks: {
        beforeCreate: async (doctor: Dr) => {
          await doctor.setPassword(doctor.password);
        },
        beforeUpdate: async (doctor: Dr) => {
          if (doctor.changed('password')) {
            await doctor.setPassword(doctor.password);
          }
        },
      },
    }
  );

  return Dr;
}
