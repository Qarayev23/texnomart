const Spinner = ({ classname }: { classname?: string }) => {
  return (
    <div className={classname ? `spinner ${classname}` : `spinner`}>
      <img src="/img/spinner.gif" alt="spinner" />
    </div>
  );
};

export default Spinner;
