import { Request, Response } from 'express';
import sequelize from '../../database/connection';
import generateRandomInstituteNumber from '../../service/genertateNumber';

class InstituteController {
  static async createInstitute(req: Request, res: Response) {
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = req.body;

    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanNo = req.body.institutePanVatNo || null;

    // ✅ Validation inside method
    if (
      !instituteName ||
      !instituteEmail ||
      !institutePhoneNumber ||
      !instituteAddress
    ) {
      res.status(400).json({
        message:
          'please provide me full details of institute name address email phone number',
      });
      return;
    }

    // 🧠 Save to database logic here (optional for now)
    // e.g., await Institute.create({...})
    const instituteNumber = generateRandomInstituteNumber();
    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          instituteName VARCHAR(225) NOT NULL,
          instituteEmail VARCHAR(225) NOT NULL,
          institutePhoneNumber VARCHAR(225) NOT NULL,
          instituteAddress VARCHAR(225),
          instituteVatNo VARCHAR(225),
          institutePanNo VARCHAR(225),
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      await sequelize.query(
        `INSERT INTO institute_${instituteNumber}(instituteName,
      instituteEmail,institutePhoneNumber,instituteAddress, institutePanNo, instituteVatNo) VALUES(?,?,?,?,?,?)`,
        {
          replacements: [
            instituteName,
            instituteEmail,
            institutePhoneNumber,
            instituteAddress,
            institutePanNo,
            instituteVatNo,
          ],
        }
      );
    res.status(200).json({
      message: 'institute created sucessgully',
    });
  }
}

export default InstituteController;
