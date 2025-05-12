import { useState } from "react";
import "../stylesheets/custom-toast.css";
import { toast } from "react-toastify";
import { RiErrorWarningLine } from "react-icons/ri";
import { CiCircleAlert } from "react-icons/ci";

const useToast = () => {
  const showToast = ({ type, payload, messages, config = {} }) => {
    if (type === "promise" && payload instanceof Promise) {
      toast[type](payload, messages, config);
    } else if (toast[type]) {
      toast[type](payload, config);
    } else {
      toast(payload, config);
    }
  };

  const inputDecisionToast = ({ payload = {}, config = {} }) => {
    const { title, inputField, placeholder, choicePrimary, choiceSecondary } =
      payload;

    return new Promise((resolve) => {
      let resolved = false;

      const InputToast = ({ closeToast }) => {
        const [inputValue, setInputValue] = useState("");
        const [error, setError] = useState("");

        const handleClick = (action) => {
          if (inputValue.trim() === "") {
            setError("Input cannot be only spaces 🥲");
            return;
          }
          resolved = true;
          closeToast();
          resolve({ action, value: inputValue });
        };

        return (
          <div className="decision-toast">
            <h2 className="decision-toast__title">{title}</h2>
            <input
              type="text"
              name={inputField}
              id="decision-toast__input"
              placeholder={placeholder || title}
              autoComplete="off"
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              value={inputValue}
            />
            {error && (
              <p className="input-toast__error">
                <span>
                  <RiErrorWarningLine />
                </span>{" "}
                {error}
              </p>
            )}
            <div className="custom-toast__actions">
              <button
                type="button"
                onClick={() => handleClick(choicePrimary)}
                className="custom-toast__button decision-toast__button--primary"
              >
                {choicePrimary}
              </button>
              <button
                type="button"
                onClick={() => handleClick(choiceSecondary)}
                className="custom-toast__button decision-toast__button--secondary"
              >
                {choiceSecondary}
              </button>
            </div>
          </div>
        );
      };

      toast(<InputToast />, {
        autoClose: false,
        closeButton: true,
        closeOnClick: false,
        onClose: () => {
          if (!resolved) {
            resolved = true;
            resolve({ action: null, value: null });
          }
        },
        ...config,
      });
    });
  };

  const confirmToast = ({ payload, config = {} }) => {
    return new Promise((resolve) => {
      const toastContent = ({ closeToast }) => (
        <div className="confirm-toast">
          <span className="confirm-toast__icon center-icon">
            <CiCircleAlert />
          </span>
          <p className="confirm-toast__title">Are you sure?</p>
          <p className="confirm-toast__description">{payload}</p>
          <div className="custom-toast__actions">
            <button
              onClick={() => {
                resolve(true);
                closeToast();
              }}
              className="custom-toast__button confirm-toast__button--ok"
            >
              OK
            </button>
            <button
              onClick={() => {
                resolve(false);
                closeToast();
              }}
              className="custom-toast__button confirm-toast__button--cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      );

      toast(toastContent, {
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        ...config,
      });
    });
  };

  return { showToast, inputDecisionToast, confirmToast };
};

export default useToast;
