const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt')
require('dotenv').config();

//FUNCTION TO CHANGE PASSWORD TO HASHED 
const hashPassword = async (password) => {
  const salt = 10
  password = await bcrypt.hash(password,salt)
  return password
}

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

async function ensureTablesExist() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS \`assessment\` (
      assessment_id int(255) NOT NULL AUTO_INCREMENT,
      assessment_name varchar(999) DEFAULT NULL,
      assessment_start_date date DEFAULT NULL,
      assessment_end_date date DEFAULT NULL,
      assessment_type varchar(999) DEFAULT NULL,
      assessment_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (assessment_id)
    ) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`cluster\` (
      cluster_id int(255) NOT NULL AUTO_INCREMENT,
      cluster_name varchar(999) DEFAULT NULL,
      cluster_description varchar(999) DEFAULT NULL,
      cluster_color varchar(999) DEFAULT NULL,
      cluster_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (cluster_id)
    ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`assessment_cluster\` (
      assessment_cluster_id int(255) NOT NULL AUTO_INCREMENT,
      assessment_id int(255) DEFAULT NULL,
      cluster_id int(255) DEFAULT NULL,
      assessment_cluster_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (assessment_cluster_id),
      KEY assessment_cluster (assessment_id, cluster_id),
      KEY cluster_id (cluster_id),
      CONSTRAINT assessment_cluster_ibfk_1 FOREIGN KEY (assessment_id) REFERENCES \`assessment\` (assessment_id) ON DELETE SET NULL ON UPDATE SET NULL,
      CONSTRAINT assessment_cluster_ibfk_2 FOREIGN KEY (cluster_id) REFERENCES \`cluster\` (cluster_id) ON DELETE SET NULL ON UPDATE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`assessment_result\` (
      assessment_result_id int(255) NOT NULL AUTO_INCREMENT,
      staff_assessor_id int(255) DEFAULT NULL,
      competency_id int(255) DEFAULT NULL,
      indicator_id int(255) DEFAULT NULL,
      assessment_result_score int(255) DEFAULT NULL,
      assessment_result_gap int(255) DEFAULT NULL,
      assessment_result_message varchar(999) DEFAULT NULL,
      assessment_result_date datetime DEFAULT current_timestamp(),
      assessment_id int(255) DEFAULT NULL,
      PRIMARY KEY (assessment_result_id),
      KEY assessment_id (assessment_id),
      CONSTRAINT assessment_result_ibfk_1 FOREIGN KEY (assessment_id) REFERENCES \`assessment\` (assessment_id) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=1855 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`company\` (
      company_id int(255) NOT NULL AUTO_INCREMENT,
      company_name varchar(999) DEFAULT NULL,
      company_short_name varchar(999) DEFAULT NULL,
      company_logo mediumblob DEFAULT NULL,
      company_admin_name varchar(999) DEFAULT NULL,
      company_admin_username varchar(999) DEFAULT NULL,
      company_admin_password varchar(999) DEFAULT NULL,
      company_admin_role varchar(999) DEFAULT 'admin',
      company_self_weightage int(255) DEFAULT NULL,
      company_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (company_id)
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`competency\` (
      competency_id int(255) NOT NULL AUTO_INCREMENT,
      competency_name varchar(999) DEFAULT NULL,
      competency_description varchar(999) DEFAULT NULL,
      cluster_id int(255) DEFAULT NULL,
      competency_level1 varchar(999) DEFAULT NULL,
      competency_level2 varchar(999) DEFAULT NULL,
      competency_level3 varchar(999) DEFAULT NULL,
      competency_level4 varchar(999) DEFAULT NULL,
      competency_level5 varchar(999) DEFAULT NULL,
      competency_indicator1 varchar(999) DEFAULT NULL,
      competency_indicator2 varchar(999) DEFAULT NULL,
      competency_indicator3 varchar(999) DEFAULT NULL,
      competency_indicator4 varchar(999) DEFAULT NULL,
      competency_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (competency_id),
      KEY cluster (cluster_id),
      CONSTRAINT competency_ibfk_1 FOREIGN KEY (cluster_id) REFERENCES \`cluster\` (cluster_id) ON DELETE SET NULL ON UPDATE SET NULL
    ) ENGINE=InnoDB AUTO_INCREMENT=272 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`department\` (
      department_id int(255) NOT NULL AUTO_INCREMENT,
      department_name varchar(999) DEFAULT NULL,
      department_description varchar(999) DEFAULT NULL,
      department_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (department_id)
    ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`indicator\` (
      indicator_id int(255) NOT NULL AUTO_INCREMENT,
      competency_id int(255) DEFAULT NULL,
      indicator_description varchar(999) DEFAULT NULL,
      indicator_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (indicator_id),
      KEY competency_id (competency_id),
      CONSTRAINT indicator_ibfk_1 FOREIGN KEY (competency_id) REFERENCES \`competency\` (competency_id) ON DELETE CASCADE ON UPDATE NO ACTION
    ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`position\` (
      position_id int(255) NOT NULL AUTO_INCREMENT,
      position_name varchar(999) DEFAULT NULL,
      position_grade varchar(999) DEFAULT NULL,
      position_description varchar(999) DEFAULT NULL,
      position_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (position_id)
    ) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`position_competency\` (
      position_competency_id int(255) NOT NULL AUTO_INCREMENT,
      position_id int(255) DEFAULT NULL,
      competency_id int(255) DEFAULT NULL,
      position_competency_expected_level int(255) DEFAULT NULL,
      position_competency_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (position_competency_id),
      KEY competency_id (competency_id),
      KEY \`position\` (position_id),
      CONSTRAINT position_competency_ibfk_2 FOREIGN KEY (competency_id) REFERENCES \`competency\` (competency_id) ON DELETE SET NULL ON UPDATE SET NULL,
      CONSTRAINT position_competency_ibfk_3 FOREIGN KEY (position_id) REFERENCES \`position\` (position_id) ON DELETE SET NULL ON UPDATE SET NULL
    ) ENGINE=InnoDB AUTO_INCREMENT=659 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`staff\` (
      staff_id int(255) NOT NULL AUTO_INCREMENT,
      staff_name varchar(999) DEFAULT NULL,
      staff_email varchar(999) DEFAULT NULL,
      department_id int(255) DEFAULT NULL,
      position_id int(255) DEFAULT NULL,
      manager_id int(255) DEFAULT 0,
      staff_role varchar(999) DEFAULT 'user',
      staff_password varchar(999) DEFAULT NULL,
      staff_image mediumblob DEFAULT NULL,
      staff_organization_register date DEFAULT NULL,
      staff_id_number varchar(999) DEFAULT NULL,
      staff_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (staff_id),
      KEY department (department_id),
      KEY \`position\` (position_id) USING BTREE,
      CONSTRAINT staff_ibfk_1 FOREIGN KEY (department_id) REFERENCES \`department\` (department_id) ON DELETE SET NULL ON UPDATE SET NULL,
      CONSTRAINT staff_ibfk_4 FOREIGN KEY (position_id) REFERENCES \`position\` (position_id) ON DELETE SET NULL ON UPDATE SET NULL
    ) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`staff_assessor\` (
      staff_assessor_id int(255) NOT NULL AUTO_INCREMENT,
      staff_id int(255) DEFAULT NULL,
      assessor_id int(255) DEFAULT NULL,
      staff_assessor_type varchar(999) DEFAULT NULL,
      staff_assessor_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (staff_assessor_id),
      KEY staff (staff_id, assessor_id),
      KEY assessor_id (assessor_id),
      CONSTRAINT staff_assessor_ibfk_1 FOREIGN KEY (staff_id) REFERENCES \`staff\` (staff_id) ON DELETE SET NULL ON UPDATE SET NULL,
      CONSTRAINT staff_assessor_ibfk_2 FOREIGN KEY (assessor_id) REFERENCES \`staff\` (staff_id) ON DELETE SET NULL ON UPDATE SET NULL
    ) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`training\` (
      training_id int(255) NOT NULL AUTO_INCREMENT,
      training_name varchar(999) DEFAULT NULL,
      training_description varchar(999) DEFAULT NULL,
      cluster_id int(255) DEFAULT NULL,
      training_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (training_id),
      KEY cluster (cluster_id),
      CONSTRAINT training_ibfk_1 FOREIGN KEY (cluster_id) REFERENCES \`cluster\` (cluster_id) ON DELETE SET NULL ON UPDATE SET NULL
    ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS \`training_competency\` (
      training_competency_id int(255) NOT NULL AUTO_INCREMENT,
      training_id int(255) DEFAULT NULL,
      competency_id int(255) DEFAULT NULL,
      training_competency_system_register datetime DEFAULT current_timestamp(),
      PRIMARY KEY (training_competency_id),
      KEY training (training_id),
      KEY competency_id (competency_id),
      CONSTRAINT training_competency_ibfk_1 FOREIGN KEY (training_id) REFERENCES \`training\` (training_id) ON DELETE CASCADE ON UPDATE NO ACTION,
      CONSTRAINT training_competency_ibfk_2 FOREIGN KEY (competency_id) REFERENCES \`competency\` (competency_id) ON DELETE CASCADE ON UPDATE NO ACTION
    ) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;`,
    // Triggers
    `CREATE TRIGGER IF NOT EXISTS after_staff_insert
    AFTER INSERT ON \`staff\`
    FOR EACH ROW
    BEGIN
      INSERT INTO staff_assessor (staff_id, assessor_id, staff_assessor_type) VALUES (NEW.staff_id, NEW.staff_id, 'self');
      IF NEW.manager_id <> 0 THEN  
        INSERT INTO staff_assessor (staff_id, assessor_id, staff_assessor_type) VALUES (NEW.staff_id, NEW.manager_id, 'superior');
      END IF;
    END;`,
  ];

  for (const query of tables) {
    await connection.query(query);
  }
}

async function ensureCompanyAdminExists() {
  const [rows] = await connection.query('SELECT COUNT(*) as count FROM company');
  if (rows[0].count === 0) {
    const hashedPassword = await hashPassword('admin123');
    await connection.query(
      'INSERT INTO company (company_admin_name, company_admin_username, company_admin_password) VALUES (?, ?, ?)',
      ['Admin Name', 'admin', hashedPassword]
    );
    console.log('Admin data inserted into company table.');
  } else {
    console.log('Company table already has data. No insertion needed.');
  }
}

ensureTablesExist()
.then(() => ensureCompanyAdminExists())
.catch(err => {
  console.error('Error ensuring tables exist:', err);
});

module.exports = connection
