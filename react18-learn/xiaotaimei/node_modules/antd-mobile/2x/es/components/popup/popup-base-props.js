export const defaultPopupBaseProps = {
  closeOnMaskClick: false,
  destroyOnClose: false,
  disableBodyScroll: true,
  forceRender: false,
  getContainer: () => document.body,
  mask: true,
  showCloseButton: false,
  stopPropagation: ['click'],
  visible: false
};