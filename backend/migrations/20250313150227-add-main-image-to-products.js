"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "main_image", {
      type: Sequelize.STRING,
      allowNull: false,
      after: "slug",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "main_image");
  },
};
