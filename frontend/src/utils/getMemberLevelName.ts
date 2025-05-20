export const getMemberLevelName = (level: string) => {
  switch (level) {
    case 'ADMIN':
      return 'Administrador';
    case 'REGISTER':
      return 'Registrador';
    case 'SELLER':
      return 'Vendedor';
    default:
      return 'Membro';
  }
};
