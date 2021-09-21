import * as e from "express";

export interface buggyProps {
  delayMaxMS?: number;
  delayMinMS?: number;
  chanceOfError?: number;
}

export default (config: buggyProps) => {
  const { delayMinMS = 0, delayMaxMS = 500, chanceOfError = 0.05 } = config;
  const reasonToBail = shouldBail(config);

  if (reasonToBail) {
    console.warn(reasonToBail);
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

export function shouldBail(config: buggyProps) {
  const { delayMinMS = 0, delayMaxMS = 500, chanceOfError = 0.05 } = config;
  // DO NOT introduce bugs into production environments
  if (process.env.NODE_ENV === "production") {
    return "buggy-express will not run in production environment but is being called.";
  }
  if (chanceOfError === 0 && delayMaxMS === 0) {
    return "buggy-express was called but is configured to produce no delay or errors";
  }

  // return falsy string
  return "";
}
