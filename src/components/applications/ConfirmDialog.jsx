import Modal from "./Modal";
import "./ConfirmDialog.css";

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <Modal onClose={onCancel}>
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="confirm-actions">
          <button onClick={onCancel}>Cancel</button>
          <button className="danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;