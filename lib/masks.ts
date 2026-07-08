export const maskPhone = (value: string) => {
  if (!value) return '';
  const num = value.replace(/\D/g, '');
  if (num.length <= 10) {
    return num.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
  }
  return num.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim().slice(0, 15);
};

export const maskCEP = (value: string) => {
  if (!value) return '';
  const num = value.replace(/\D/g, '');
  return num.replace(/(\d{5})(\d{0,3})/, '$1-$2').trim().slice(0, 9);
};

export const maskCPF = (value: string) => {
  if (!value) return '';
  const num = value.replace(/\D/g, '');
  return num
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
};

export const maskCurrency = (value: string | number) => {
  if (!value && value !== 0) return '';
  const num = String(value).replace(/\D/g, '');
  if (num === '') return '';
  
  const parsed = parseInt(num, 10) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parsed);
};

// Removes the "R$ " from the formatted currency and keeping only numbers
// Used if we want to store raw value or parse back to number
export const unmaskCurrency = (value: string) => {
  if (!value) return 0;
  return Number(value.replace(/\D/g, '')) / 100;
};
