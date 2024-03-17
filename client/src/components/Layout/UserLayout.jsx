import React from 'react';
import CenterLayout from './SubLayout/CenterLayout';
import DistanceUniversityLayout from './SubLayout/DistanceUniversityLayout';
import RegularUniversityLayout from './SubLayout/RegularUniversityLayout';
import OnlineUniversityLayout from './SubLayout/OnlineUniversityLayout';
import { useSelector } from 'react-redux';

export default function UserLayout({ children }) {
  const selectedUniversity = useSelector(state => state.user.selectedUniversity);

  let layoutComponent;

  // Check if a university is selected
  if (selectedUniversity) {
    // If a university is selected, determine the appropriate layout component
    switch (selectedUniversity?.university?.vertical) {
      case "DISTANCE":
        layoutComponent = <DistanceUniversityLayout selectedUniversity={selectedUniversity} />;
        break;
      case "REGULAR":
        layoutComponent = <RegularUniversityLayout selectedUniversity={selectedUniversity} />;
        break;
      case "ONLINE":
        layoutComponent = <OnlineUniversityLayout selectedUniversity={selectedUniversity} />;
        break;
      default:
        // If the selected university's vertical is not recognized, render the default layout
        layoutComponent = <CenterLayout />;
    }
  } else {
    // If no university is selected, render the default layout
    layoutComponent = <CenterLayout />;
  }

  return (
    <div>
      {layoutComponent}
    </div>
  );
}
