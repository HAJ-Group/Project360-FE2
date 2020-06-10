export class AnnoncerModel {
  public id: string;

  constructor(
    public lastName: string,
    public firstName: string,
    public birthday: string,
    public phone: string,
    public address: string,
    public city: string,
    public email: string,
    public picture: string,
    public dateOfBirth: string,
  ) {
  }
}
