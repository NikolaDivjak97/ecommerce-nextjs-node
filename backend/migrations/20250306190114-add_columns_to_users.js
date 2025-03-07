"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "address", {
      type: Sequelize.STRING,
      allowNull: true,
      after: "email",
    });

    await queryInterface.addColumn("Users", "phone", {
      type: Sequelize.STRING,
      allowNull: true,
      after: "address",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "address");
    await queryInterface.removeColumn("Users", "phone");
  },
};
