/**
 * Returns your age.
 * @param birthday - It must be a string, like July 10 1998 (Jul 10 1998).
 * @example getAge("Jul 10 1998") //Returns 23
 * @author Gabriel Ramos
 */
function getAge(birthday: string) {
  const currentDate = new Date();
  const birthDate = new Date(birthday);

  const yearsOld = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return yearsOld - 1;
  }

  return yearsOld;
}

export default getAge;
