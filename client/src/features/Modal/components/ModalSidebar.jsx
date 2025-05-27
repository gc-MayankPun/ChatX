import { memo } from "react";

export const ModalSidebar = memo(({ setActiveTab, activeTab }) => {
  return (
    <aside className="modal-sidebar">
      <ul className="sidebar-nav">
        <li
          className={`sidebar-item ${
            activeTab === "background" ? "active" : ""
          }`}
          onClick={() => setActiveTab("background")}
        >
          Background Image
        </li>
        <li
          className={`sidebar-item ${activeTab === "user" ? "active" : ""}`}
          onClick={() => setActiveTab("user")}
        >
          User
        </li>
      </ul>
    </aside>
  );
});
