export interface IMenu {
  id: string;
  title: string;
  route: string;
  children?: IMenu[];
}
