import { ReactElement, useRef } from 'react';
import { IFieldObj } from '../auth/type/auth-types';

type profileVieweProps = {
  switchEditMode: (prev: boolean) => void;
  firstName: string | undefined;
  lastName: string | undefined;
};

export const ProfileTitleVieweMode = ({
  switchEditMode,
  firstName,
  lastName,
}: profileVieweProps): ReactElement => {
  return (
    <div className="profile-title__viewe-mode">
      <div className="profile-title-name">
        <h2 className="profile__name first--name">{firstName}</h2>
        <h2 className="profile__name last--name">{lastName}</h2>
      </div>
      <h2
        className="profile-title__edit-btn"
        onClick={() => switchEditMode(true)}
      >
        Edit
      </h2>
    </div>
  );
};

type profileEditProps = {
  switchVieweMode: (prev: boolean) => void;
  firstNameAttributes: IFieldObj;
  lastNameAttributes: IFieldObj;
  createInputObj: (
    value: string,
    inputType: string,
    ref: HTMLHeadingElement
  ) => void;
  updateCustomer: () => void;
  updateData: () => void;
};

export const ProfileTitleEditMode = ({
  switchVieweMode,
  firstNameAttributes,
  lastNameAttributes,
  createInputObj,
  updateCustomer,
  updateData,
}: profileEditProps): ReactElement => {
  const errRefTitleFirstName = useRef<HTMLHeadingElement>(null);
  const errRefTitleLastName = useRef<HTMLHeadingElement>(null);
  return (
    <div className="profile-title__edit-mode">
      <h2 className="title">{firstNameAttributes.title}</h2>
      <input
        className="profile-title-input"
        type={firstNameAttributes.inputType}
        placeholder="Enter first name"
        onChange={(e) => {
          const val = e.target.value;
          if (val && errRefTitleFirstName.current) {
            createInputObj(
              val,
              firstNameAttributes.type,
              errRefTitleFirstName.current
            );
          }
        }}
      />
      <h2 className="error__message" ref={errRefTitleFirstName}></h2>
      <input
        className="profile-title-input"
        type={lastNameAttributes.inputType}
        placeholder="Enter last name"
        onChange={(e) => {
          const val = e.target.value;
          if (val && errRefTitleLastName.current) {
            createInputObj(
              val,
              lastNameAttributes.type,
              errRefTitleLastName.current
            );
          }
        }}
      />
      <h2 className="error__message" ref={errRefTitleLastName}></h2>
      <div className="profile-title-name-btns__wrapper">
        <div
          className="profile-title__btn--submit"
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
          <h2 className="profile-title__btn--submit-title">Submit</h2>
        </div>
        <h2
          className="profile-title__cancel-btn"
          onClick={() => switchVieweMode(false)}
        >
          Cancel
        </h2>
      </div>
    </div>
  );
};
