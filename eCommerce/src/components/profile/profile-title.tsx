import { ReactElement } from 'react';
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
  inputAttributes: IFieldObj;
};
export const ProfileTitleEditMode = ({
  switchVieweMode,
  inputAttributes,
}: profileEditProps): ReactElement => {
  return (
    <div className="profile-title__edit-mode">
      <h2 className="title">{inputAttributes.title}</h2>
      <input
        className="profile-title-input"
        type={inputAttributes.inputType}
        placeholder="Enter first name"
      />
      <input
        className="profile-title-input"
        type={inputAttributes.inputType}
        placeholder="Enter last name"
      />
      <div className="profile-title-name-btns__wrapper">
        <div className="profile-title__btn--submit">
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
