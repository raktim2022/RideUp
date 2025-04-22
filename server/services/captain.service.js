const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstName,
    lastName,
    email,
    password,
    color,
    plateNumber,
    capacity,
    vehicleType,
  }) => {
    if (!firstName || !lastName || !email || !password || !color || !plateNumber || !capacity || !vehicleType) {
      throw new Error('Missing required fields');
    }
    const captain = await captainModel.create({
      fullName:{
        firstName,
        lastName,
      },
      email,
      password,
      vehicle:{
        color,
        plateNumber,
        capacity,
        vehicleType,
      }
    });
    return captain;
  }