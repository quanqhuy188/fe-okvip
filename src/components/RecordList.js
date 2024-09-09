import React from 'react';
import RecordOption from './RecordOption';

const RecordList = ({ records }) => {

  return (
    <select>
      {records.map(record => (
        <RecordOption key={record.id} record={record} />
      ))}
    </select>
  );
};

export default React.memo(RecordList);
