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
        const roomIDPattern = /^[^\s::]+::[^\s]+$/;
        const [error, setError] = useState("");

        const handleClick = (action) => {
          if (inputValue.trim() === "") {
            setError("Your input is as empty as my fridge at 3AM 🧊🍽️");
            return;
          }
          if (!roomIDPattern.test(inputValue)) {
            setError("Invalid room ID.");
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

  const shareToast = ({ payload, config = {} }) => {
    const { shareURL } = payload;

    const ShareComponent = () => {
      const [copied, setCopied] = useState(false);

      const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Join my room!",
              text: `Here's the room ID: ${shareURL}`,
              // url: shareURL,
            });
            showToast({ type: "success", payload: "Shared successfully" });
          } catch (error) {
            showToast({ type: "error", payload: "Failed to share" });
          }
        } else {
          showToast({
            type: "info",
            payload: "Sharing is not supported on this device.",
          });
        }
      };

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(shareURL);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          showToast({
            type: "success",
            payload: "Room ID copied to clipboard!",
          });
        } catch (error) {
          showToast({ type: "error", payload: "Failed to copy room ID." });
        }
      };

      return (
        <div className="share-toast">
          <div className="share-toast__buttons-container">
            <button
              onClick={handleShare}
              className="share-toast__buttons share-toast__share"
            >
              <span className="share-toast__span center-icon">📤</span> Share
            </button>
            <button
              onClick={handleCopy}
              className="share-toast__buttons share-toast__copy"
            >
              <span className="share-toast__span center-icon">📋</span> Copy
            </button>
          </div>
          {copied && <span className="share-toast__copied">Copied!</span>}
        </div>
      );
    };

    toast(ShareComponent, {
      autoClose: false,
      closeButton: true,
      closeOnClick: false,
      ...config,
    });
  };

  return { showToast, inputDecisionToast, confirmToast, shareToast };
};

export default useToast;
