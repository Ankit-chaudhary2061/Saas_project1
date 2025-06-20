import { Request, Response } from 'express';
import sequelize from '../../database/connection';
import generateRandomInstituteNumber from '../../service/generateRandomInstituteNumber';

class InstituteController {
  static async createInstitute(req: Request, res: Response) {
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = req.body;

    // this is drop down like if vat xaena vanya pan halney  its like options
    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanNo = req.body.institutePanNo || null;
    if (
      !instituteName ||
      !instituteEmail ||
      !institutePhoneNumber ||
      !instituteAddress
    ) {
      res.status(404).json({
        message:
          ' please provide me all the stuffs like instituteName,instituteEmail,institutePhoneNumber, instituteAddress,',
      });
      return;
    }
    // mathi sequealize import gara like conncetionts bata
    // you tala ko query chaib table ko coloum create garya like mathi ko chai request body ma accept garayko bujjam ani varchar vanya chai string ho and int vanya chain intiger ho like yo chai hujr ley capital letter ma ni accept garxa ani small letter ma ni accept garxa hai,  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    // updatedAt TIMESTAMP DEFAULT CURRENT+TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  like ini haru chai kaelay create vako ani update vairxa vanyara bujauxa
    const instituteNumber = generateRandomInstituteNumber();
    await sequelize.query(
      `CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        instituteName VARCHAR(255) NOT NULL,
        instituteEmail VARCHAR(255) NOT NULL,
        institutePhoneNumber VARCHAR(255) NOT NULL,
        instituteAddress VARCHAR(255) NOT NULL,
        institutePanNo VARCHAR(255),
        instituteVatNo VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    );
    await sequelize.query(
      `INSERT INTO institute_${instituteNumber}(
        instituteName,
        instituteEmail,
        institutePhoneNumber,
        instituteAddress,
        instituteVatNo,
        institutePanNo
      ) VALUES(?,?,?,?,?,?)`,
      {
        replacements: [
          instituteName, // ✅ this was missing
          instituteEmail,
          institutePhoneNumber,
          instituteAddress,
          instituteVatNo,
          institutePanNo,
        ],
      }
    );
    res.status(200).json({
      message: ' institute created sucessfully',
    });
  }
}

export default InstituteController;
