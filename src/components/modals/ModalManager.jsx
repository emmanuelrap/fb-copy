// ModalManager.jsx
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../redux/slices/modalSlice";
import UploadImageModal from "./UploadPostImageModal";
import UploadVideoModal from "./UploadPostVideoModal";

const ModalManager = () => {
	const dispatch = useDispatch();
	const { modalType, modalProps } = useSelector((state) => state.modal);

	const closeModal = () => dispatch(hideModal()); // <- ESTO es clave

	if (!modalType) return null;

	let Component;
	switch (modalType) {
		case "UPLOAD_IMAGE":
			Component = UploadImageModal;
			break;
		case "UPLOAD_VIDEO":
			Component = UploadVideoModal;
			break;
		case "UPLOAD_FEEL":
			Component = UploadImageModal;
			break;
		default:
			return null;
	}

	return (
		<div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center'>
			<Component {...modalProps} onClose={closeModal} />
		</div>
	);
};

export default ModalManager;
