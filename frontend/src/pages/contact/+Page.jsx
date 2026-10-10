import { redirect } from 'vike/abort';

export function data() {
  throw redirect('/', 301); 
}