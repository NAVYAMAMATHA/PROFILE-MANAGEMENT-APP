/*export interface Profile {
  id?: number;
  firstName?: string;
  lastName?: string;
  name: string; // full name for display (we'll split)
  email: string;
  age?: number | null;
}
*/
export interface Profile{
  id?:number;
  firstName?:string;
  lastName?:string;
  name:string;
  email:string;
  age?:number|null;
}