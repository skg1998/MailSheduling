const { env } = process;

export const enum Env{
  Development="dev",
  Test="test",
  Production="production"
}

export default {
  applicationName: env.APPLICATION_NAME ?? 'APP',
  environment: env.NODE_ENV,
  port: Number(env.PORT),
  mongoConnectionString: env.MONGO_CONNECTION_STRING,
  jwt: {
    secret: env.JWT_SECRET,
    expiry: env.JWT_EXPIRY
  },
  isTestEnvironment: Env.Test === env.NODE_ENV,
  isDevEnvironment: Env.Development === env.NODE_ENV,
  isProductionEnvironment: Env.Production === env.NODE_ENV
};