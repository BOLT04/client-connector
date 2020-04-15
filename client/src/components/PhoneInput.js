import React from "react";
import "react-phone-number-input/style.css";
import PhoneNumberInput from "react-phone-number-input";

/**
 * @param {object} props
 * @param {string} props.value
 * @param {(newValue: string) => void} props.onChange - Callback called when a valid phone number is inputed by the user
 */
export function PhoneInput({ value, onChange }) {
  return (
    <PhoneNumberInput
      placeholder="Enter phone number"
      value={value}
      onChange={handleChange}
    />
  );

  /**
   * @param {string | undefined} value 
   */
  function handleChange(value) {
    if (value) onChange(value)
  }
}
