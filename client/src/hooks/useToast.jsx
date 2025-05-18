import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { CiCircleAlert } from "react-icons/ci";
import "../stylesheets/custom-toast.css";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import ShareComponent from "../components/ui/ShareComponent";

gsap.registerPlugin(CSSRulePlugin);

const useToast = () => {
  const toastAnimation = (isToastCalled) => {
    const rule = CSSRulePlugin.getRule(".app-wrapper::before");
    gsap.to(rule, {
      cssRule: {
        opacity: isToastCalled ? 0.4 : 0,
        zIndex: isToastCalled ? 102 : -1,
      },
      ease: "power3.out",
      duration: 0.3,
    });
  };

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
          resolved = true;
          closeToast();
          toastAnimation(false);
          resolve({ action, inputValue });
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
                {/* <span>
                </span>{" "} */}
                <RiErrorWarningLine /> {error}
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
        closeOnClick: false,
        ...config,
      });

      toastAnimation(true);
    });
  };

  const shareToast = ({ payload, config = {} }) => {
    const { shareURL } = payload;

    const toastContent = ({ closeToast }) => {
      return <ShareComponent shareURL={shareURL} closeToast={closeToast} />;
    };

    toast(toastContent, {
      autoClose: false,
      closeButton: true,
      closeOnClick: false,
      onClose: () => {
        toastAnimation(false);
      },
      ...config,
    });

    toastAnimation(true);
  };

  return { showToast, inputDecisionToast, confirmToast, shareToast };
};

export default useToast;
