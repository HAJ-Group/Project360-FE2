export class AnnoncerModel {
  public id: string;
  public user_id: string;

  constructor(
    public last_name: string,
    public first_name: string,
    public phone: string,
    public address: string,
    public city: string,
    public email: string,
    public picture: string,
    public premium: boolean,
    public date_of_birth: string,
  ) {
  }
}
