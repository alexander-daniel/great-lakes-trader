import { connect } from 'react-redux';

const TravellingMessages = (props) => {
  const {
    travelMessage,
    travelChoices,
    onSelect
  } = props;

  return (
    <div style={{ padding: '10px', width: '320px' }}>
      <div style={{ marginBottom: '10px', whiteSpace: 'pre' }}>{travelMessage}</div>
      {
        travelChoices ?
        travelChoices.map(c => <button key={c} onClick={onSelect.bind(null, c)}>{c}</button>)
        : null
      }
    </div>
  );
};

export default connect((state) => ({ ...state }))(TravellingMessages);
