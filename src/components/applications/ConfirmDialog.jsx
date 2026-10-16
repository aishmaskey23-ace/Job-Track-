import Modal from "./Modal";
import "./ConfirmDialog.css";

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <Modal
      onClose={onCancel}
      labelledBy="confirm-dialog-message"
      role="alertdialog"
    >
      <div className="confirm-dialog">
        <p id="confirm-dialog-message">{message}</p>
        <div className="confirm-actions">
          {/* Focus starts on the safe choice */}
          <button onClick={onCancel} autoFocus>
            Cancel
          </button>
          <button className="danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;