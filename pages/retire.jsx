import { connect } from 'react-redux';
// import Link from 'next/link';
import '../styles/reset.css';
import '../styles/index.css';

export default connect((state) => ({ ...state }))(({ cash, bank, loan }) => {
  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div style={{ width: '600px' }}>
        <h2>{'You have retired.'}</h2>
        <h3>{`Score: ${Math.floor(cash + bank - loan)}`}</h3>
        <a href="/"><button>{'Play Again'}</button></a>
      </div>
    </div>
  );
});

