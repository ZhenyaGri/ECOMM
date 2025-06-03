import './style/profile.scss';
import { ProfileTitleVieweMode, ProfileTitleEditMode } from './profile-title';
import { DataVieweMode, DataEditMode } from './profile-data';
import { ReactElement, useEffect, useState } from 'react';
import {
  accountFields,
  addressFields,
  shippingFields,
} from '../auth/data-list';
import { getUserProfileData } from './core/get-data';
import { IUserProfileDataValues } from './types/types';

export const ProfileComponent = (): ReactElement => {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [editUserDetailsIndex, setEditUserDetailsIndex] = useState<
    number | null
  >(null);
  const [editBillingIndex, setEditBillingIndex] = useState<number | null>(null);
  const [editShippingIndex, setEditShippingIndex] = useState<number | null>(
    null
  );

  const [userProfileDataValues, setUserProfileDataValues] = useState<
    IUserProfileDataValues | undefined
  >();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const profileData = await getUserProfileData();
      console.log(profileData);
      setUserProfileDataValues(profileData);
    };
    fetchData();
  }, []);

  return (
    <div className="profile">
      <div className="profile-title__wrapper">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-title__style"></div>
      </div>
      <div className="profile-title-wrapper">
        {!isEditMode ? (
          <ProfileTitleVieweMode
            switchEditMode={setEditMode}
            firstName={userProfileDataValues?.userDetalesValue[0]}
            lastName={userProfileDataValues?.userDetalesValue[1]}
          />
        ) : (
          <ProfileTitleEditMode
            switchVieweMode={setEditMode}
            inputAttributes={accountFields[0]}
          />
        )}
      </div>

      <div className="profile-data__wrapper">
        <div className="profile-data-list-title__wrapper">
          <h2 className="profile-data-list-title">User details</h2>
          <div className="profile-title__style"></div>
        </div>

        <ul className="profile__data-list user--detales">
          {accountFields.map(
            (objAttributes, index) =>
              index !== 0 &&
              index !== 1 && (
                <li key={index} className="profile__data-item">
                  {editUserDetailsIndex !== index ? (
                    <DataVieweMode
                      switchEditMode={() => setEditUserDetailsIndex(index)}
                      inputAttributes={objAttributes}
                      title={userProfileDataValues?.userDetalesValue[index]}
                    />
                  ) : (
                    <DataEditMode
                      switchVieweMode={() => setEditUserDetailsIndex(null)}
                      inputAttributes={objAttributes}
                    />
                  )}
                </li>
              )
          )}
        </ul>

        <div className="profile-data-list-title__wrapper">
          <h2 className="profile-data-list-title">Billing addreas</h2>
          <div className="profile-title__style"></div>
        </div>

        <ul className="profile__data-list user--billing-address">
          {addressFields.map((objAttributes, index) => (
            <li key={index} className="profile__data-item">
              {editBillingIndex !== index ? (
                <DataVieweMode
                  switchEditMode={() => setEditBillingIndex(index)}
                  title={userProfileDataValues?.userBillingAddressValue[index]}
                />
              ) : (
                <DataEditMode
                  switchVieweMode={() => setEditBillingIndex(null)}
                  inputAttributes={objAttributes}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="profile-data-list-title__wrapper">
          <h2 className="profile-data-list-title">Shipping addreas</h2>
          <div className="profile-title__style"></div>
        </div>

        <ul className="profile__data-list user--shipping-address">
          {shippingFields.map((objAttributes, index) => (
            <li key={index} className="profile__data-item">
              {editShippingIndex !== index ? (
                <DataVieweMode
                  switchEditMode={() => setEditShippingIndex(index)}
                  title={userProfileDataValues?.userBillingAddressValue[index]}
                />
              ) : (
                <DataEditMode
                  switchVieweMode={() => setEditShippingIndex(null)}
                  inputAttributes={objAttributes}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
