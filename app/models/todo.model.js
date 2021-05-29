module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
      title: {
        type: Sequelize.STRING
      }
    });
  
    return Todo;
  };