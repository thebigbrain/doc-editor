import React, { useEffect } from 'react';


// TODO: Rewrite this using Reakit for proper accessibility handling
// NOTE: Used in UserMenu, can replace with drop-down menu from the prototyping sandbox
//       which can alos be moved to the common lib
export const HoverMenu = ({ onClose, children }) => {
  useEffect(() => {
    const handleDocumentClick = () => {
      onClose();
    };

    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, [onClose]);

  const handleViewClick = (event) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <div role="menu" tabIndex={0} onClick={handleViewClick}>
      {children}
    </div>
  );
};
