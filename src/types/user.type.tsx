export default interface IUser {
  id?: any | null,
  username?: string | null,
  nome?: string | null,
  sobrenome?: string | null,
  email?: string,
  password?: string,
  roles?: Array<string>
}