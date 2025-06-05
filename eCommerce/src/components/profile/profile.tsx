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
import { createInputObj, updateCustomer } from './core/validate-datainputs';
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

  const fetchData = async (): Promise<void> => {
    const profileData = await getUserProfileData();
    console.log(profileData);
    setUserProfileDataValues(profileData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async (): Promise<void> => {
    try {
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile">
      <div className="profile-title__wrapper">
        <h2 className="profile-title">My Profile</h2>
      </div>

      <div className="profile-data-detales__wrapper">
        {/*personal detales*/}
        <div className="profile-data-list-personal-detales">
          <div className="profile-data-list-title__wrapper">
            <h2 className="profile-data-list-title">User personal detales</h2>
            <div className="title-style-line"></div>
          </div>

          <ul className="profile__data-list user--detales">
            <li className="profile__data-item">
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
                    firstNameAttributes={accountFields[0]}
                    lastNameAttributes={accountFields[1]}
                    createInputObj={createInputObj}
                    updateCustomer={updateCustomer}
                    updateData={updateData}
                  />
                )}
              </div>
            </li>
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
                        createInputObj={createInputObj}
                        updateCustomer={updateCustomer}
                        updateData={updateData}
                      />
                    )}
                  </li>
                )
            )}
          </ul>
        </div>

        <div className="profile-style-line"></div>

        {/*addresss detales*/}
        <div className="profile-data-address-detales">
          <div className="profile-data-list-title__wrapper">
            <h2 className="profile-data-list-title">Billing address</h2>
            <div className="title-style-line"></div>
          </div>
          <ul className="profile__data-list user--billing-address">
            {addressFields.map((objAttributes, index) => (
              <li key={index} className="profile__data-item">
                {editBillingIndex !== index ? (
                  <DataVieweMode
                    switchEditMode={() => setEditBillingIndex(index)}
                    title={
                      userProfileDataValues?.userBillingAddressValue[index]
                    }
                  />
                ) : (
                  <DataEditMode
                    switchVieweMode={() => setEditBillingIndex(null)}
                    inputAttributes={objAttributes}
                    createInputObj={createInputObj}
                    updateCustomer={updateCustomer}
                    updateData={updateData}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="profile-data-address__input-item-checkbox">
            <input className="checkbox" type="checkbox" />
            <label htmlFor="default-address">
              Set billing address as default
            </label>
          </div>

          <div className="profile-data-list-title__wrapper">
            <h2 className="profile-data-list-title">Shipping address</h2>
            <div className="title-style-line"></div>
          </div>

          <ul className="profile__data-list user--shipping-address">
            {shippingFields.map((objAttributes, index) => (
              <li key={index} className="profile__data-item">
                {editShippingIndex !== index ? (
                  <DataVieweMode
                    switchEditMode={() => setEditShippingIndex(index)}
                    title={userProfileDataValues?.userShippingAddress[index]}
                  />
                ) : (
                  <DataEditMode
                    switchVieweMode={() => setEditShippingIndex(null)}
                    inputAttributes={objAttributes}
                    createInputObj={createInputObj}
                    updateCustomer={updateCustomer}
                    updateData={updateData}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="profile-data-address__input-item-checkbox">
            <input className="checkbox" type="checkbox" />
            <label htmlFor="default-address">
              Set Shipping address as default
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
