import React from "react";
import ReactModal from "react-modal";
//안씀

function AdminUserUpdateModal({ isOpen, closeModal, dataToUpdate }) {
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        closeModal={closeModal}
        appElement={document.getElementById("root")}
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000088",
            zIndex: "10",
          },
          content: {
            display: "flex",
            position: "static",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            height: "50vh",
          },
        }}
      ></ReactModal>
    </div>
  );
}

export default AdminUserUpdateModal;
