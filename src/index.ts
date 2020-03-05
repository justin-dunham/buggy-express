import e from "express";

export interface buggyProps {
  delayMaxMS: number;
  chanceOf500: number;
}

export default ({ delayMinMS = 0, delayMaxMS = 500, chanceOfError = 0.05 }) => {
  // DO NOT introduce bugs into production environments
  if (
    process.env.NODE_ENV === "production" ||
    (chanceOfError === 0 && delayMaxMS === 0)
  ) {
    console.warn(
      "buggy-express will not run in production environment but is being called."
    );
    return (request: e.Request, response: e.Response, next: e.NextFunction) =>
      next();
  }

  return (request: e.Request, response: e.Response, next: e.NextFunction) => {
    const chance = Math.random();

    if (chance < chanceOfError) {
      return response.status(503).json({
        status: false,
        error: true,
        reason: `Error by pure chance. (${chanceOfError * 100}%)`
      });
    } else {
      if (delayMinMS || delayMaxMS) {
        setTimeout(() => next(), getRandom(delayMinMS, delayMaxMS));
      } else {
        next();
      }
    }
  };
};

export function getRandom(min = 0, max = 500) {
  return Math.floor(Math.random() * (max - min)) + min;
}
