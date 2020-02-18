export enum Errors {
  NoToken = 'err_no_token_authorization_denied',
  InvalidToken = 'err_invalid_token',
  InvalidValue = 'err_invalid_value_for_',

  //routes:
  MissingFields = 'err_missing_fields',
  AllFieldsRequired = 'err_all_fields_are_required',
  UserNotExist = 'err_user_does_not_exist',
  UserAlreadyRegistered = 'err_user_already_registered',
  InvalidPassword = 'err_invalid_password',
  TitleRequired = 'err_title_required',

  //models:
  UserNameRequired = 'err_username_required',
  PasswordRequired = 'err_password_required',
  FirstNameRequired = 'err_first_name_required',
  LastNameRequired = 'err_first_name_required',
  CreatedByRequired = 'err_created_by_required'
}
