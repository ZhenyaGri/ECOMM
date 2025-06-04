import { ReactElement } from 'react';
import { IFieldObj } from '../auth/type/auth-types';
import { countries } from '../auth/data-list';
type propsDataVieweMode = {
  switchEditMode: () => void;
  inputAttributes?: IFieldObj;
  title: string | undefined;
};
export const DataVieweMode = ({
  switchEditMode,
  inputAttributes,
  title,
}: propsDataVieweMode): ReactElement => {
  return (
    <div className="data-item__view-mode">
      {inputAttributes?.inputType === 'password' ? (
        <h2 className="data-item__title">Password</h2>
      ) : inputAttributes?.inputType === 'date' ? (
        <h2 className="data-item__title">{`Birth date ${title}`}</h2>
      ) : (
        <h2 className="data-item__title">{title}</h2>
      )}
      <h2
        className="data-item__btn data-item__btn--edit"
        onClick={switchEditMode}
      >
        Edit
      </h2>
    </div>
  );
};

type propsDataEditMode = {
  switchVieweMode: () => void;
  inputAttributes: IFieldObj;
};

export const DataEditMode = ({
  switchVieweMode,
  inputAttributes,
}: propsDataEditMode): ReactElement => {
  return (
    <div className="data-item__edit-mode">

      <h2 className="title">{inputAttributes.title}</h2>

      {inputAttributes.inputType === 'data' ? (
        <input
          className="profile-title-input"
          type={inputAttributes.inputType}
          placeholder={inputAttributes.placeholder}
          defaultValue={'2000-12-01'}
        />
      ) : inputAttributes.inputType === 'select' ? (
        <select className="data-item__input">
          <option className="create-account-option-title" value="">
            Choose your country
          </option>
          {countries.map((country) => (
            <option
              className="create-account-option"
              key={country.code}
              value={country.code}
            >
              {country.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="data-item__input"
          type={inputAttributes.inputType}
          placeholder={inputAttributes.placeholder}
        />
      )}
      <div className="data-item__edit-mode--btn-wrapper">
        <div className="data-item__btn--submit">
          <h2 className="data-item__btn--submit-title">Submit</h2>
        </div>
        <h2 className="data-item__btn data-item__btn--cancel"
            onClick={switchVieweMode}>
          Cancel
        </h2>
      </div>
    </div>
  );
};
