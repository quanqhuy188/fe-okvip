import React from 'react';

const RecordOption = React.memo(({ record }) => {
  console.log(`Rendering record ${record.id}`);
  return (
    <option key={record.id} value={record.id}>
      {record.randomText}
    </option>
  );
});

export default RecordOption;
