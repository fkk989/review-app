declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      RAZORPAY_API_KEY: string;
      RAZORPAY_SECRET_KEY: string;
      JWT_SECRET: string;
    }
  }
}

export {};
