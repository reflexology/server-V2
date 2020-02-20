export enum Errors {
  NoToken = 'err_no_token_authorization_denied',
  InvalidToken = 'err_invalid_token',
  InvalidValue = 'err_invalid_value_for_',

  //routes:
  FieldRequired = '{0}_required',
  MissingFields = 'err_missing_fields',
  AllFieldsRequired = 'err_all_fields_are_required',
  UserNotExist = 'err_user_does_not_exist',
  UserAlreadyRegistered = 'err_user_already_registered',
  InvalidPassword = 'err_invalid_password',
  TitleRequired = 'err_title_required',
  PatientNotExist = 'err_patient_does_not_exist',

  //models:
  UserNameRequired = 'err_username_required',
  PasswordRequired = 'err_password_required',
  FirstNameRequired = 'err_first_name_required',
  LastNameRequired = 'err_first_name_required',
  CreatedByRequired = 'err_created_by_required',

  // treatment
  TreatmentNumberRequired = 'err_treatment_number_required'
}

String.prototype.format = function(...values) {
  let str = this.toString();
  console.log(values);

  if (values?.length > 0)
    for (const key in values) str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), values[key]);

  return str;
};
