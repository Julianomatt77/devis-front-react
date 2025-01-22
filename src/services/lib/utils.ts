import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retourne 0-11, donc on ajoute 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function transformDateTimeToDate(dateTime: string) {
  const date = new Date(dateTime);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retourne 0-11, donc on ajoute 1
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

export function transformPriceToEuro(price: number) {
  return (price / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

export function stringAdresse(adresse: { cp: string, ville: string, pays: string, rue?: string, complementaire?: string, numero?: number }){
  const {complementaire, cp, numero,  pays, rue, ville} = adresse;
  const adresseParts = [];

  if (numero) adresseParts.push(numero + ',');
  if (rue) adresseParts.push(rue + ',');
  if (complementaire) adresseParts.push(complementaire + ',');
  if (cp) adresseParts.push(cp + ',');
  if (ville) adresseParts.push(ville + ',');
  if (pays) adresseParts.push(pays);

  return adresseParts.join(' ');
}

export function stringAdresseRue(adresse: { rue?: string, complementaire?: string, numero?: number }){
  const {rue, complementaire,  numero} = adresse;
  const adresseParts = [];

  if (numero) adresseParts.push(numero + ',');
  if (rue) adresseParts.push(rue + ',');
  if (complementaire) adresseParts.push(complementaire + ',');

  return adresseParts.join(' ');
}

export function stringAdresseVille(adresse: { cp: string, ville: string, pays: string }){
  const {cp,  pays, ville} = adresse;
  const adresseParts = [];

  if (cp) adresseParts.push(cp + ',');
  if (ville) adresseParts.push(ville + ',');
  if (pays) adresseParts.push(pays);

  return adresseParts.join(' ');
}

export function getCookies(): { [key: string]: string } {
  const cookies = document.cookie.split('; ').reduce<{ [key: string]: string }>((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = value;
    return acc;
  }, {});

  return cookies;
}


export function getTokenFromCookie(): string{
  const cookies: { [key: string]: string } = getCookies();
  return cookies['devis_token'];
}