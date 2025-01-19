export const generateProfileLink = (locale: string, userId: string) => {
  return `${window.location.origin}/${locale}/app/profile/${userId}`;
};
