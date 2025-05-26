import ShareComponent from "../components/ui/ShareComponent";
import CustomizeModal from "../features/Modal/CustomizeModal";
import { toastAnimation } from "../utils/toastAnimation";
import { CiCircleAlert } from "react-icons/ci";
import { isMobile } from "../utils/responsive";
import "../stylesheets/custom-toast.css";
import { toast } from "react-toastify";
import { useState } from "react";

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
        const roomIDPattern = /^[^:]+::[^:]+$/;
        const [error, setError] = useState("");

        const handleClick = (action) => {
          if (inputValue.trim() === "") {
            setError("Your input is as empty as my fridge at 3AM 🧊🍽️");
            return;
          }
          if (!roomIDPattern.test(inputValue) && action === "Join") {
            setError("Invalid room ID.");
            return;
          }
          if (inputValue.length > 50 && action === "Create") {
            setError("😏 Easy there, poet. 50 chars max.");
            return;
          }
          resolved = true;
          closeToast();
          toastAnimation(false);
          resolve({
            action,
            inputValue: inputValue.trim().replace(/\s+/g, " "),
          });
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
            {error && <p className="input-toast__error">{error}</p>}
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
        draggable: false,
        closeOnClick: false,
        onClose: () => {
          if (!resolved) {
            resolved = true;
            toastAnimation(false);
            resolve({ action: null, value: null });
          }
        },
        ...config,
      });

      toastAnimation(true);
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
                toastAnimation(false);
              }}
              className="custom-toast__button confirm-toast__button--ok"
            >
              OK
            </button>
            <button
              onClick={() => {
                resolve(false);
                closeToast();
                toastAnimation(false);
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
        draggable: false,
        closeOnClick: false,
        ...config,
      });

      toastAnimation(true);
    });
  };

  const shareToast = ({ payload, config = {} }) => {
    const { roomID, roomName, leaveRoom } = payload;

    const toastContent = ({ closeToast }) => {
      return (
        <ShareComponent
          roomID={roomID}
          roomName={roomName}
          closeToast={closeToast}
          leaveRoom={leaveRoom}
        />
      );
    };

    toast(toastContent, {
      autoClose: false,
      closeButton: true,
      draggable: false,
      closeOnClick: false,
      onClose: () => {
        toastAnimation(false);
      },
      ...config,
    });

    toastAnimation(true);
  };

  const customizeToast = ({ payload, config = {} }) => {
    const toastContent = ({ closeToast }) => {
      return (
        <CustomizeModal
          toastAnimation={toastAnimation}
          closeToast={closeToast}
          navigate={payload.navigate}
        />
      );
    };

    toast(toastContent, {
      autoClose: false,
      closeButton: true,
      closeOnClick: false,
      draggable: false,
      onClose: () => {
        if (isMobile()) {
          payload.closeSidebar();
        }
        toastAnimation(false);
      },
      ...config,
    });

    toastAnimation(true);
  };

  return {
    showToast,
    inputDecisionToast,
    confirmToast,
    shareToast,
    customizeToast,
  };
};

export default useToast;
