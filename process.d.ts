declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    POSTGRES_URL: string;
    POSTGRES_PRISMA_URL: string;
    POSTGRES_URL_NON_POOLING: string;
    POSTGRES_USER: string;
    POSTGRES_HOST: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DATABASE: string;
  }
}
