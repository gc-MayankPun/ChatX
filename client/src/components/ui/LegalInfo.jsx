import { NavLink } from "react-router-dom";

const LegalInfo = () => {
  return (
    <div className="legal-info-container">
      <p>
        By clicking Login, you agree to our{" "}
        <NavLink to={"/legal/terms"}>Terms of Service</NavLink> and{" "}
        <NavLink to={"/legal/privacy"}>Privacy Policy</NavLink>.
      </p>
    </div>
  );
};

export default LegalInfo;
