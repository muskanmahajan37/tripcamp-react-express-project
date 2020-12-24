'use strict';
module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship',
    {
      user1Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: 'id'
        }
      },
      user2Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: 'id'
        }
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      lastActionUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: 'id'
        }
      },
      followingship: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      uniqueKeys: {
        Items_unique: {
          fields: ['user1Id', 'user2Id']
        }
      }
    }
  );
  Relationship.associate = function (models) {
    // associations can be defined here
  };
  return Relationship;
};