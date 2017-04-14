import React from 'react';

import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksList from './LinksList';

export default () => {
  return(
    <div>
      <PrivateHeader title="short lnk" />
      <div className="wrapper">
        <AddLink />
        <LinksList />
      </div>
    </div>
  );
}
