import React, { ReactElement } from 'react';
import { countries, shippingFields, authUserData } from './data-list';
import { IWarnRefObj } from './type/auth-types';
import { inputHandler } from './form-handler';

interface ShippingAddressComponentProps {
  warnRefShiping: IWarnRefObj;
}

const ShippingAddressComponent = ({
  warnRefShiping,
}: ShippingAddressComponentProps): ReactElement => {
  console.log(warnRefShiping);
  return (
    <>
      <h2 className="create-account__title address-title">Shipping Address</h2>
      <ul className="create-account__input-list">
        {shippingFields.map((fieldObj) => (
          <li className={fieldObj.classNameItem} key={fieldObj.inputId}>
            {fieldObj.inputType === 'select' ? (
              <>
                <select
                  className={fieldObj.classNameInput}
                  id={fieldObj.inputId}
                  name={fieldObj.type}
                  onChange={(e) => {
                    const ref = warnRefShiping[fieldObj.type];
                    if (ref) {
                      inputHandler(
                        e,
                        fieldObj.type,
                        authUserData.newUser,
                        ref.current
                      );
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
              </>
            ) : (
              <>
                <input
                  className={fieldObj.classNameInput}
                  id={fieldObj.inputId}
                  type={fieldObj.inputType}
                  placeholder={fieldObj.placeholder}
                  onInput={(e) => {
                    const ref = warnRefShiping[fieldObj.type];
                    if (ref) {
                      inputHandler(
                        e,
                        fieldObj.type,
                        authUserData.newUser,
                        ref.current
                      );
                    }
                  }}
                />
              </>
            )}

            <h2
              className={fieldObj.classNameWarning}
              ref={warnRefShiping[fieldObj.type]}
            ></h2>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ShippingAddressComponent;
