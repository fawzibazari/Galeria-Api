import config from "../config/config";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { User } from "../models/user";
import { getRepository } from "typeorm";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload, done) => {
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findByIds(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
