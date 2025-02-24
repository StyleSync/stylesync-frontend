export const getPrismaErrorMessage = (
  error: any,
  field: string,
  errorCode: string
): boolean => {
  return (
    Array.isArray(error.data?.prisma?.fields) &&
    error.data?.prisma?.fields?.includes(field) &&
    error.data?.prisma?.code === errorCode
  );
};
