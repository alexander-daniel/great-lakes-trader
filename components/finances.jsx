import { connect } from 'react-redux';

const Finances = ({ cash, bank, loan }) => {
  return (
    <div className="panel">
      <h3>{'Finances'}</h3>
      {[
        { title: 'Cash', value: cash },
        { title: 'Bank', value: bank },
        { title: 'Loan', value: loan }
      ].map((i) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{`${i.title} :`}</div>
          <div>{`${i.value.toFixed(0)} $`}</div>
        </div>
      ))}
    </div>
  );
};

export default connect((state) => ({ ...state }))(Finances);
