import { ReactElement, useRef } from 'react';
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
  switchVieweMode: (prev: boolean) => void;
  inputAttributes: IFieldObj;
  createInputObj: (
    value: string,
    inputType: string,
    ref: HTMLHeadingElement
  ) => void;
  updateCustomer: () => void;
  updateData: () => void;
};

export const DataEditMode = ({
  switchVieweMode,
  inputAttributes,
  createInputObj,
  updateCustomer,
  updateData,
}: propsDataEditMode): ReactElement => {
  const errRefTitle = useRef<HTMLHeadingElement | null>(null);

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
        <select
          className="data-item__input"
          onChange={(e) => {
            const val = e.target.value;
            if (val && errRefTitle.current) {
              // УБРАЛИ errRefTitle.current!
              createInputObj(val, inputAttributes.type, errRefTitle.current);
            }
          }}
        >
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
          onChange={(e) => {
            const val = e.target.value;
            if (val && errRefTitle.current) {
              // УБРАЛИ errRefTitle.current!
              createInputObj(val, inputAttributes.type, errRefTitle.current);
            }
          }}
        />
      )}
      <div className="data-item__edit-mode--btn-wrapper">
        <div
          className="data-item__btn--submit"
          onClick={async () => {
            try {
              await updateCustomer();
              await updateData();
              switchVieweMode(false);
            } catch (error) {
              void error;
            }
            switchVieweMode(false);
          }}
        >
          <h2
            className="data-item__btn--submit-title"
            onClick={async () => {
              await updateCustomer();
              await updateData();
            }}
          >
            Submit
          </h2>
        </div>
        <h2
          className="data-item__btn data-item__btn--cancel"
          onClick={async () => {
            switchVieweMode(false);
          }}
        >
          Cancel
        </h2>
      </div>
      <h2 className="error__message" ref={errRefTitle}></h2>
    </div>
  );
};
